package io.github.artfrc.portfolio.notification;

import io.github.artfrc.portfolio.contact.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** Fallback usado quando nenhum canal de notificacao (ex.: Telegram) esta configurado. */
public class LoggingContactNotifier implements ContactNotifier {

    private static final Logger log = LoggerFactory.getLogger(LoggingContactNotifier.class);

    @Override
    public void notifyNewMessage(ContactMessage message) {
        log.info("Nova mensagem de contato #{} recebida de {} <{}> — assunto: \"{}\" "
                        + "(nenhum canal de notificacao configurado, veja portfolio.telegram no application.yml)",
                message.getId(), message.getName(), message.getEmail(), message.getSubject());
    }
}
