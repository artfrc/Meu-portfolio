package io.github.artfrc.portfolio.notification;

import io.github.artfrc.portfolio.config.PortfolioProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class NotifierConfig {

    @Bean
    public ContactNotifier contactNotifier(PortfolioProperties properties, RestClient.Builder restClientBuilder) {
        if (properties.telegram() != null && properties.telegram().isConfigured()) {
            return new TelegramContactNotifier(properties, restClientBuilder.build());
        }
        return new LoggingContactNotifier();
    }
}
