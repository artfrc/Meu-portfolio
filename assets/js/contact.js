// Fala com a API de contato (backend/ — Java + Spring Boot), publicada no Render
// (veja backend/README.md e render.yaml). window.PORTFOLIO_API_BASE_URL é setado
// no index.html; em dev local sem esse script, cai no localhost de sempre.
const API_BASE_URL = window.PORTFOLIO_API_BASE_URL || "http://localhost:8080";

const form = document.getElementById("contact-form");
const feedback = document.getElementById("contact-feedback");
const submitButton = document.getElementById("contact-submit");

if (form) {
  form.addEventListener("submit", handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault();

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim(),
  };

  setLoading(true);
  setFeedback(
    "Enviando... o servidor pode estar 'dormindo' (plano free do Render) e demorar até 50s para acordar.",
    "info"
  );

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      form.reset();
      setFeedback("Mensagem enviada! Vou responder em breve.", "success");
      return;
    }

    if (response.status === 400) {
      const body = await response.json();
      const firstError = Object.values(body.fieldErrors ?? {})[0];
      setFeedback(firstError || "Confira os campos preenchidos.", "error");
      return;
    }

    if (response.status === 429) {
      setFeedback("Muitas mensagens em pouco tempo. Tente novamente em instantes.", "error");
      return;
    }

    setFeedback("Não consegui enviar agora. Tente novamente mais tarde.", "error");
  } catch (error) {
    setFeedback(
      "Não consegui falar com o servidor agora (ele pode estar 'acordando' após um tempo ocioso — no plano free do Render isso leva uns 30-50s). Tente de novo em instantes ou me chame pelo WhatsApp/LinkedIn acima.",
      "error"
    );
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.classList.toggle("loading", isLoading);
  submitButton.textContent = isLoading ? "Enviando..." : "Enviar mensagem";
}

function setFeedback(text, type) {
  feedback.textContent = text;
  feedback.classList.remove("success", "error", "info");
  if (type) {
    feedback.classList.add(type);
  }
}
