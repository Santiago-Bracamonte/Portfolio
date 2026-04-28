(function() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var CONTACT_API_URL = 'https://api.web3forms.com/submit';
  var ACCESS_KEY = 'd575a7b2-8c48-46db-8bcb-1a6f6e37a4fe';

  var nameInput = document.getElementById('from_name');
  var emailInput = document.getElementById('from_email');
  var subjectInput = document.getElementById('subject');
  var messageInput = document.getElementById('message');
  var websiteInput = document.getElementById('website');
  var loadingEl = document.getElementById('loading');
  var successEl = document.getElementById('form-success-message');
  var errorEl = document.getElementById('form-error-message');
  var submitBtn = document.getElementById('submitBtn');

  var fieldErrors = {
    from_name: document.getElementById('error-from_name'),
    from_email: document.getElementById('error-from_email'),
    subject: document.getElementById('error-subject'),
    message: document.getElementById('error-message-field')
  };

  function toggleLoading(isLoading) {
    if (loadingEl) loadingEl.style.display = isLoading ? 'inline-block' : 'none';
    if (submitBtn) submitBtn.disabled = isLoading;
  }

  function setStatus(node, text, visible) {
    if (!node) return;
    node.textContent = text || '';
    node.style.display = visible ? 'block' : 'none';
  }

  function clearFieldErrors() {
    Object.keys(fieldErrors).forEach(function(key) {
      setStatus(fieldErrors[key], '', false);
    });
  }

  function setFieldError(fieldName, message) {
    setStatus(fieldErrors[fieldName], message, true);
  }

  function validateField(input, minLength, message) {
    if (!input) return true;
    var value = input.value.trim();
    if (!value) {
      setFieldError(input.id, message);
      return false;
    }
    if (minLength && value.length < minLength) {
      setFieldError(input.id, message);
      return false;
    }
    return true;
  }

  function validateEmail(input) {
    if (!input) return true;
    var value = input.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailPattern.test(value)) {
      setFieldError(input.id, 'Please enter a valid email address.');
      return false;
    }
    return true;
  }

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    clearFieldErrors();
    setStatus(successEl, '', false);
    setStatus(errorEl, '', false);

    var isNameValid = validateField(nameInput, 2, 'Please enter your name.');
    var isEmailValid = validateEmail(emailInput);
    var isSubjectValid = validateField(subjectInput, 2, 'Please enter a subject.');
    var isMessageValid = validateField(messageInput, 10, 'Please write a longer message.');

    if (websiteInput && websiteInput.value.trim()) {
      return;
    }

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      setStatus(errorEl, 'Please review the highlighted fields.', true);
      return;
    }

    toggleLoading(true);

    try {
      var formData = new FormData(form);
      formData.set('access_key', ACCESS_KEY);
      formData.set('name', nameInput.value.trim());
      formData.set('email', emailInput.value.trim());
      formData.set('replyto', emailInput.value.trim());
      formData.set('subject', subjectInput.value.trim());
      formData.set('message', messageInput.value.trim());
      formData.set('from_name', nameInput.value.trim());
      formData.set('from_email', emailInput.value.trim());
      formData.delete('website');

      var response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      var result = await response.json().catch(function() {
        return {};
      });

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to send the message right now.');
      }

      form.reset();
      setStatus(successEl, 'Message sent successfully. I will reply as soon as possible.', true);
    } catch (error) {
      setStatus(errorEl, error.message || 'Unable to send the message right now.', true);
    } finally {
      toggleLoading(false);
    }
  });
})();