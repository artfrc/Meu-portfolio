package io.github.artfrc.portfolio.notification;

import io.github.artfrc.portfolio.config.PortfolioProperties;
import io.github.artfrc.portfolio.contact.ContactMessage;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

/**
 * Manda um push instantaneo pro Telegram do dono do portfolio via Bot API.
 * Uma falha aqui (bot apagado, token invalido, Telegram fora do ar) e so logada:
 * a mensagem ja foi salva no banco antes desse notifier rodar (ver ContactService),
 * entao o visitante do site nunca ve um erro 500 por causa disso.
 */
public class TelegramContactNotifier implements ContactNotifier {

    private static final Logger log = LoggerFactory.getLogger(TelegramContactNotifier.class);

    private final PortfolioProperties properties;
    private final RestClient restClient;

    public TelegramContactNotifier(PortfolioProperties properties, RestClient restClient) {
        this.properties = properties;
        this.restClient = restClient;
    }

    @Override
    public void notifyNewMessage(ContactMessage message) {
        String text = """
                📬 Nova mensagem no portfolio

                De: %s
                E-mail: %s
                Assunto: %s

                %s""".formatted(message.getName(), message.getEmail(), message.getSubject(), message.getMessage());

        // Monta a URL como string pronta (em vez de uriVariables) porque o token do bot
        // contem ":" e o UriComponentsBuilder percent-encodaria esse caractere se ele
        // fosse passado como variavel de template, quebrando a chamada pro Telegram.
        String url = "https://api.telegram.org/bot" + properties.telegram().botToken() + "/sendMessage";

        try {
            restClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "chat_id", properties.telegram().chatId(),
                            "text", text
                    ))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException e) {
            log.error("Falha ao notificar via Telegram a mensagem #{} (ela ja esta salva no banco)",
                    message.getId(), e);
        }
    }
}
