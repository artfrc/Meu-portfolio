package io.github.artfrc.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import io.github.artfrc.portfolio.notification.ContactNotifier;
import java.lang.reflect.Field;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactMessageRepository repository;

    @Mock
    private ContactNotifier contactNotifier;

    private ContactService service;

    @BeforeEach
    void setUp() {
        service = new ContactService(repository, contactNotifier);
    }

    @Test
    void submitSavesMessageAndNotifies() throws Exception {
        ContactRequest request = new ContactRequest("Arthur", "arthur@example.com", "Oportunidade", "Ola!");
        ContactMessage saved = new ContactMessage("Arthur", "arthur@example.com", "Oportunidade", "Ola!");
        setId(saved, 42L);
        when(repository.save(any(ContactMessage.class))).thenReturn(saved);

        ContactResponse response = service.submit(request);

        assertThat(response.id()).isEqualTo(42L);
        assertThat(response.name()).isEqualTo("Arthur");
        verify(contactNotifier).notifyNewMessage(saved);
    }

    @Test
    void submitTrimsWhitespaceBeforePersisting() {
        ContactRequest request = new ContactRequest("  Arthur  ", "  arthur@example.com ", " Oi ", " mensagem ");
        when(repository.save(any(ContactMessage.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service.submit(request);

        var captor = org.mockito.ArgumentCaptor.forClass(ContactMessage.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getName()).isEqualTo("Arthur");
        assertThat(captor.getValue().getEmail()).isEqualTo("arthur@example.com");
    }

    @Test
    void listAllMapsEntitiesToAdminResponses() {
        ContactMessage message = new ContactMessage("Arthur", "arthur@example.com", "Oi", "Mensagem");
        setId(message, 1L);
        when(repository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(message));

        List<ContactAdminResponse> result = service.listAll();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).id()).isEqualTo(1L);
        assertThat(result.get(0).email()).isEqualTo("arthur@example.com");
    }

    private static void setId(ContactMessage message, Long id) {
        try {
            Field field = ContactMessage.class.getDeclaredField("id");
            field.setAccessible(true);
            field.set(message, id);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }
}
