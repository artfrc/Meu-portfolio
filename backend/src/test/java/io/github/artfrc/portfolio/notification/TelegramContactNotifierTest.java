package io.github.artfrc.portfolio.notification;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import io.github.artfrc.portfolio.config.PortfolioProperties;
import io.github.artfrc.portfolio.contact.ContactMessage;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class TelegramContactNotifierTest {

    private static final PortfolioProperties.Telegram CREDENTIALS =
            new PortfolioProperties.Telegram("123:ABC-token", "999999");

    private static final PortfolioProperties PROPERTIES =
            new PortfolioProperties(null, null, null, CREDENTIALS);

    @Test
    void postsMessageToTelegramBotApi() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        RestClient restClient = builder.build();

        server.expect(requestTo("https://api.telegram.org/bot123:ABC-token/sendMessage"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("\"chat_id\":\"999999\"")))
                .andRespond(withSuccess("{\"ok\":true}", MediaType.APPLICATION_JSON));

        TelegramContactNotifier notifier = new TelegramContactNotifier(PROPERTIES, restClient);
        notifier.notifyNewMessage(new ContactMessage("Arthur", "arthur@example.com", "Oi", "Mensagem de teste"));

        server.verify();
    }

    @Test
    void doesNotThrowWhenTelegramApiFails() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        RestClient restClient = builder.build();

        server.expect(requestTo("https://api.telegram.org/bot123:ABC-token/sendMessage"))
                .andRespond(withServerError());

        TelegramContactNotifier notifier = new TelegramContactNotifier(PROPERTIES, restClient);

        notifier.notifyNewMessage(new ContactMessage("Arthur", "arthur@example.com", "Oi", "Mensagem de teste"));

        server.verify();
    }
}
