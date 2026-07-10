package io.github.artfrc.portfolio.notification;

import io.github.artfrc.portfolio.contact.ContactMessage;

/**
 * Abstrai o "avisar alguem que chegou mensagem nova" do resto da aplicacao.
 * Qual implementacao roda de verdade e decidido em tempo de boot por
 * {@link NotifierConfig}, com base em quais credenciais estao configuradas.
 */
public interface ContactNotifier {

    void notifyNewMessage(ContactMessage message);
}
