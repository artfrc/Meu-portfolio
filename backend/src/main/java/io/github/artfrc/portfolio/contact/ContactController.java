package io.github.artfrc.portfolio.contact;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contato", description = "Recebe mensagens enviadas pelo formulario do portfolio")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "Envia uma nova mensagem de contato",
            description = "Publico. Sujeito a rate limit por IP (ver RateLimitFilter).")
    public ResponseEntity<ContactResponse> submit(@Valid @RequestBody ContactRequest request) {
        ContactResponse response = service.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Lista as mensagens recebidas",
            description = "Protegido: exige o header X-API-KEY (ver ApiKeyFilter).")
    public ResponseEntity<List<ContactAdminResponse>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }
}
