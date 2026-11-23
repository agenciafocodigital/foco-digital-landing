(() => {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = document.querySelector('#contact-result');
  const button = form.querySelector('button[type="submit"]');
  const service = new URLSearchParams(location.search).get('servicio');
  if ([...form.elements.service.options].some(option => option.value === service)) form.elements.service.value = service;
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const invalid = [...form.querySelectorAll('[required]')].find(field => field.type !== 'checkbox' && !field.value.trim());
    if (invalid) { invalid.focus(); status.textContent = 'Completa el campo señalado.'; return; }
    sending = true; button.disabled = true; button.textContent = 'Enviando…';
    status.textContent = 'Estamos enviando tu solicitud.';
    try {
      const body = new URLSearchParams(new FormData(form));
      body.set('form-name', 'contacto-foco-digital');
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (!response.ok) throw new Error('Submission rejected');
      form.reset();
      status.textContent = 'Recibimos tu solicitud. Te escribiremos por WhatsApp.';
    } catch {
      status.textContent = 'No pudimos enviar tu solicitud. Tus datos siguen aquí para volver a intentarlo. También puedes escribirnos por WhatsApp al 56 1876 5291.';
    } finally {
      sending = false; button.disabled = false; button.textContent = 'Enviar mi solicitud';
    }
  });
})();
