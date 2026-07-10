package io.github.artfrc.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * O site do portfolio (GitHub Pages) e o backend rodam em origens diferentes,
 * entao o navegador so deixa o fetch() do frontend chamar a API se ela liberar
 * essas origens explicitamente via CORS.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private final PortfolioProperties properties;

    public CorsConfig(PortfolioProperties properties) {
        this.properties = properties;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(properties.allowedOrigins().toArray(String[]::new))
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("Content-Type", "X-API-KEY")
                .maxAge(3600);
    }
}
