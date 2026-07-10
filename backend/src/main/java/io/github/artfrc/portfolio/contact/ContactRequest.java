package io.github.artfrc.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Corpo esperado em {@code POST /api/contact}. Records com Bean Validation
 * direto nos componentes evitam uma classe DTO cheia de getters/setters.
 */
public record ContactRequest(

        @NotBlank(message = "Informe seu nome")
        @Size(max = 120, message = "Nome muito longo")
        String name,

        @NotBlank(message = "Informe um e-mail")
        @Email(message = "E-mail invalido")
        @Size(max = 180, message = "E-mail muito longo")
        String email,

        @NotBlank(message = "Informe um assunto")
        @Size(max = 150, message = "Assunto muito longo")
        String subject,

        @NotBlank(message = "Escreva uma mensagem")
        @Size(max = 4000, message = "Mensagem muito longa")
        String message
) {
}
