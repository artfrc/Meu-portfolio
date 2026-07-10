package io.github.artfrc.portfolio.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Liga as chaves {@code portfolio.*} do application.yml a um objeto tipado,
 * em vez de espalhar {@code @Value} pelo codigo.
 */
@ConfigurationProperties(prefix = "portfolio")
public record PortfolioProperties(
        List<String> allowedOrigins,
        String adminApiKey,
        RateLimit rateLimit,
        Telegram telegram
) {
    public record RateLimit(int maxRequests, int windowSeconds) {
    }

    public record Telegram(String botToken, String chatId) {
        public boolean isConfigured() {
            return botToken != null && !botToken.isBlank() && chatId != null && !chatId.isBlank();
        }
    }
}
