package io.github.artfrc.portfolio.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.artfrc.portfolio.common.ApiError;
import io.github.artfrc.portfolio.config.PortfolioProperties;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * So o GET /api/contact (listar mensagens) exige o header X-API-KEY.
 * O POST publico (envio do formulario) passa direto — sem essa distincao,
 * qualquer visitante do site poderia ler as mensagens de todo mundo.
 */
@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private static final String HEADER = "X-API-KEY";

    private final PortfolioProperties properties;
    private final ObjectMapper objectMapper;

    public ApiKeyFilter(PortfolioProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        boolean isProtectedRead = "GET".equalsIgnoreCase(request.getMethod())
                && "/api/contact".equals(request.getRequestURI());

        if (!isProtectedRead) {
            chain.doFilter(request, response);
            return;
        }

        String providedKey = request.getHeader(HEADER);
        if (providedKey == null || !providedKey.equals(properties.adminApiKey())) {
            respondUnauthorized(response);
            return;
        }

        chain.doFilter(request, response);
    }

    private void respondUnauthorized(HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ApiError error = ApiError.of(HttpStatus.UNAUTHORIZED.value(), "X-API-KEY ausente ou invalido");
        response.getWriter().write(objectMapper.writeValueAsString(error));
    }
}
