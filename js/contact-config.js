/**
 * contact-config.js — Form handler
 * Validation, honeypot, error handling, i18n support
 */

var CONTACT_API_URL = "/api/contact";

(function() {
  'use strict';

  var CONFIG = {
    apiUrl: (typeof window !== 'undefined' && window.CONTACT_API_URL && window.CONTACT_API_URL.trim()) || '/api/contact',
    timeoutMs: 15000
  };
  var form, submitBtn, loader, successMsg, errorMsg;

  function cacheElements() {
    form = document.getElementById('contactForm');
    if (!form) return false;
    submitBtn = document.getElementById('submitBtn');
    loader = document.getElementById('loading');
    successMsg = document.getElementById('success-message');
    errorMsg = document.getElementById('error-message');
    return true;
  }

  function showFieldError(fieldId, message) {
    var err = document.getElementById('error-' + fieldId);
    var field = document.getElementById(fieldId);
    if (err) { err.textContent = message; err.style.display = 'block'; }
    if (field) { field.setAttribute('aria-invalid', 'true'); field.classList.add('is-invalid'); }
  }

  function clearFieldErrors() {
    var errors = form.querySelectorAll('.form-error');
    for (var i = 0; i < errors.length; i++) { errors[i].textContent = ''; errors[i].style.display = 'none'; }
    var fields = form.querySelectorAll('.is-invalid');
    for (var j = 0; j < fields.length; j++) { fields[j].removeAttribute('aria-invalid'); fields[j].classList.remove('is-invalid'); }
  }

  function clearMessages() {
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
  }

  function setLoading(isLoading) {
    if (!submitBtn || !loader) return;
    submitBtn.disabled = isLoading;
    submitBtn.style.opacity = isLoading ? '0.6' : '1';
    submitBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    loader.style.display = isLoading ? 'block' : 'none';
  }

  function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  function getI18nText(key) {
    return (typeof window !== 'undefined' && window.i18n && window.i18n[key]) ? window.i18n[key] : null;
  }

  function validateForm() {
    clearFieldErrors();
    var isValid = true;
    var fromName = document.getElementById('from_name');
    var fromEmail = document.getElementById('from_email');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');
    var honeypot = document.getElementById('website');

    // Honeypot
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('[Contact] Honeypot triggered');
      return { valid: false, isBot: true };
    }
    if (!fromName || fromName.value.trim().length < 2) {
      showFieldError('from_name', getI18nText('form.error.name') || 'Please enter your name (min 2 characters).');
      isValid = false;
    }
    if (!fromEmail || !isValidEmail(fromEmail.value.trim())) {
      showFieldError('from_email', getI18nText('form.error.email') || 'Please enter a valid email address.');
      isValid = false;
    }
    if (!subject || subject.value.trim().length < 2) {
      showFieldError('subject', getI18nText('form.error.subject') || 'Please enter a subject (min 2 characters).');
      isValid = false;
    }
    if (!message || message.value.trim().length < 10) {
      showFieldError('message', getI18nText('form.error.message') || 'Please enter a message (min 10 characters).');
      isValid = false;
    }
    return { valid: isValid, isBot: false };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!cacheElements()) return;
    clearMessages();
    var validation = validateForm();
    if (validation.isBot) {
      if (successMsg) { successMsg.textContent = '\u2713 Message sent successfully!'; successMsg.style.display = 'block'; }
      form.reset();
      setTimeout(function() { if (successMsg) successMsg.style.display = 'none'; }, 5000);
      return;
    }
    if (!validation.valid) {
      var firstError = form.querySelector('.is-invalid');
      if (firstError) firstError.focus();
      return;
    }
    setLoading(true);
    var payload = {
      from_name: document.getElementById('from_name').value.trim(),
      from_email: document.getElementById('from_email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    try {
      var controller = new AbortController();
      var timeoutId = setTimeout(function() { controller.abort(); }, CONFIG.timeoutMs);
      var response = await fetch(CONFIG.apiUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        var errorData = null, rawText = '';
        try { errorData = await response.json(); } catch (e) { try { rawText = await response.text(); } catch (e2) {} }
        var msg = errorData && errorData.error ? errorData.error : (rawText ? 'HTTP ' + response.status + ': ' + rawText.slice(0, 120) : 'HTTP ' + response.status);
        throw new Error(msg);
      }
      if (successMsg) { successMsg.textContent = '\u2713 Message sent successfully!'; successMsg.style.display = 'block'; }
      form.reset(); clearFieldErrors();
      setTimeout(function() { if (successMsg) successMsg.style.display = 'none'; }, 5000);
    } catch (error) {
      console.error('[Contact] Error:', error);
      var userMessage;
      if (error.name === 'AbortError') userMessage = '\u2717 Request timed out. Please try again.';
      else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) userMessage = '\u2717 Network error. Check your connection.';
      else userMessage = '\u2717 ' + (error.message || 'Error sending message. Please try again.');
      if (errorMsg) { errorMsg.textContent = userMessage; errorMsg.style.display = 'block'; }
      setTimeout(function() { if (errorMsg) errorMsg.style.display = 'none'; }, 8000);
    } finally {
      setLoading(false);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { if (cacheElements()) form.addEventListener('submit', handleSubmit); });
  } else {
    if (cacheElements()) form.addEventListener('submit', handleSubmit);
  }
})();
