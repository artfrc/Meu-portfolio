package io.github.artfrc.portfolio.contact;

import io.github.artfrc.portfolio.notification.ContactNotifier;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactMessageRepository repository;
    private final ContactNotifier contactNotifier;

    public ContactService(ContactMessageRepository repository, ContactNotifier contactNotifier) {
        this.repository = repository;
        this.contactNotifier = contactNotifier;
    }

    @Transactional
    public ContactResponse submit(ContactRequest request) {
        ContactMessage saved = repository.save(new ContactMessage(
                request.name().trim(),
                request.email().trim(),
                request.subject().trim(),
                request.message().trim()
        ));
        contactNotifier.notifyNewMessage(saved);
        return ContactResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public List<ContactAdminResponse> listAll() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ContactAdminResponse::from)
                .toList();
    }
}
