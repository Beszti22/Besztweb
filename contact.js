// contact.js — Handles Besztweb's quick quote request form submission
(function () {
  var form = document.getElementById('quote-form');
  var statusEl = document.getElementById('quote-status');
  var submitBtn = document.getElementById('quoteSubmitBtn');
  if (!form || !statusEl || !submitBtn) return;

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || '').trim());
  }

  function getDict() {
    if (typeof window.getDict === 'function') {
      return window.getDict();
    }
    var lang = document.documentElement.lang || 'hu';
    return lang === 'en'
      ? {
          formSubmitting: 'Sending...',
          formSuccess: 'Thank you for your inquiry! I\'ll get back to you shortly.',
          formError: 'Failed to send message. Please write directly to szia.besztweb@gmail.com!',
          formValidationError: 'Please fill out the required fields and verify your email address!'
        }
      : {
          formSubmitting: 'Küldés folyamatban...',
          formSuccess: 'Köszönöm az ajánlatkérést! Hamarosan válaszolok az e-mailedre.',
          formError: 'Nem sikerült elküldeni az üzenetet. Kérlek írj közvetlenül a szia.besztweb@gmail.com címre!',
          formValidationError: 'Kérlek töltsd ki a kötelező mezőket és ellenőrizd az e-mail címet!'
        };
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var dict = getDict();

    var nameInput = document.getElementById('quote-name');
    var emailInput = document.getElementById('quote-email');
    var phoneInput = document.getElementById('quote-phone');
    var messageInput = document.getElementById('quote-message');
    var botcheckInput = form.querySelector('[name="botcheck"]');

    var name = (nameInput ? nameInput.value : '').trim();
    var email = (emailInput ? emailInput.value : '').trim();
    var phone = (phoneInput ? phoneInput.value : '').trim();
    var message = (messageInput ? messageInput.value : '').trim();
    var botcheck = botcheckInput ? botcheckInput.value : '';

    var serviceEl = form.querySelector('input[name="service"]:checked');
    var service = serviceEl ? serviceEl.value : 'Új weboldal';
    var activeLang = document.documentElement.lang || 'hu';

    // Reset validation visual cues
    if (nameInput) nameInput.removeAttribute('aria-invalid');
    if (emailInput) emailInput.removeAttribute('aria-invalid');
    if (messageInput) messageInput.removeAttribute('aria-invalid');

    var hasError = false;
    if (!name) {
      if (nameInput) nameInput.setAttribute('aria-invalid', 'true');
      hasError = true;
    }
    if (!email || !isValidEmail(email)) {
      if (emailInput) emailInput.setAttribute('aria-invalid', 'true');
      hasError = true;
    }
    if (!message) {
      if (messageInput) messageInput.setAttribute('aria-invalid', 'true');
      hasError = true;
    }

    if (hasError) {
      statusEl.setAttribute('data-state', 'error');
      statusEl.textContent = dict.formValidationError;
      return;
    }

    // Pending state
    submitBtn.disabled = true;
    var btnTextEl = submitBtn.querySelector('.btn-text');
    var originalBtnText = btnTextEl ? btnTextEl.textContent : submitBtn.textContent;
    if (btnTextEl) {
      btnTextEl.textContent = dict.formSubmitting;
    }
    statusEl.removeAttribute('data-state');
    statusEl.textContent = '';

    try {
      var res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          service: service,
          message: message,
          botcheck: botcheck,
          lang: activeLang
        })
      });

      var data = {};
      try { data = await res.json(); } catch (err) {}

      if (!res.ok || data.ok === false) {
        throw new Error(data.error || 'Request failed');
      }

      // Success
      statusEl.setAttribute('data-state', 'success');
      statusEl.textContent = dict.formSuccess;
      form.reset();

      // Reset checked radio to first option
      var firstRadio = form.querySelector('input[name="service"]');
      if (firstRadio) firstRadio.checked = true;
    } catch (err) {
      console.error('Submission error:', err);
      statusEl.setAttribute('data-state', 'error');
      statusEl.textContent = dict.formError;
    } finally {
      submitBtn.disabled = false;
      if (btnTextEl) {
        btnTextEl.textContent = originalBtnText;
      }
    }
  });
})();
