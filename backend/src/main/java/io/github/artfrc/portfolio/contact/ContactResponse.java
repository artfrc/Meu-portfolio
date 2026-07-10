package io.github.artfrc.portfolio.contact;

import java.time.Instant;

/** Retorno enxuto de {@code POST /api/contact} — nao ecoa a mensagem inteira de volta. */
public record ContactResponse(Long id, String name, Instant receivedAt) {

    public static ContactResponse from(ContactMessage entity) {
        return new ContactResponse(entity.getId(), entity.getName(), entity.getCreatedAt());
    }
}
