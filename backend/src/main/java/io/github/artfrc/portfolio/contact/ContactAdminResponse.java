package io.github.artfrc.portfolio.contact;

import java.time.Instant;

/** Visao completa usada em {@code GET /api/contact}, protegida por API key. */
public record ContactAdminResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        Instant createdAt,
        boolean read
) {

    public static ContactAdminResponse from(ContactMessage entity) {
        return new ContactAdminResponse(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getSubject(),
                entity.getMessage(),
                entity.getCreatedAt(),
                entity.isRead()
        );
    }
}
