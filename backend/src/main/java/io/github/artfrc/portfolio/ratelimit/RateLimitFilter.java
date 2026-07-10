package io.github.artfrc.portfolio.ratelimit;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.artfrc.portfolio.common.ApiError;
import io.github.artfrc.portfolio.config.PortfolioProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Limitador simples de janela fixa, em memoria, por IP — o suficiente para um
 * formulario de contato de portfolio (um unico processo, sem cluster). Para
 * varias instancias, isso precisaria migrar para algo compartilhado (ex.: Redis).
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final PortfolioProperties properties;
    private final ObjectMapper objectMapper;
    private final ConcurrentHashMap<String, Window> requestsByIp = new ConcurrentHashMap<>();

    public RateLimitFilter(PortfolioProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        boolean isContactSubmission = "POST".equalsIgnoreCase(request.getMethod())
                && "/api/contact".equals(request.getRequestURI());

        if (!isContactSubmission || withinLimit(clientIp(request))) {
            chain.doFilter(request, response);
            return;
        }

        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiError error = ApiError.of(HttpStatus.TOO_MANY_REQUESTS.value(),
                "Muitas mensagens enviadas. Tente novamente em instantes.");
        response.getWriter().write(objectMapper.writeValueAsString(error));
    }

    private boolean withinLimit(String ip) {
        Duration window = Duration.ofSeconds(properties.rateLimit().windowSeconds());
        Window bucket = requestsByIp.compute(ip, (key, existing) -> {
            Instant now = Instant.now();
            if (existing == null || Duration.between(existing.windowStart(), now).compareTo(window) > 0) {
                return new Window(now, 1);
            }
            return new Window(existing.windowStart(), existing.count() + 1);
        });
        return bucket.count() <= properties.rateLimit().maxRequests();
    }

    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        return (forwarded != null && !forwarded.isBlank()) ? forwarded.split(",")[0].trim() : request.getRemoteAddr();
    }

    private record Window(Instant windowStart, int count) {
    }
}
