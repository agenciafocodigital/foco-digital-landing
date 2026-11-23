(() => {
  const mount = document.querySelector('#audit-app');
  if (!mount) return;
  const FORM = 'diagnostico-foco-digital';
  const WA = '525618765291';
  const radios = (name, legend, options) =>
    `<fieldset><legend>${legend}</legend><div class="audit-options">${options.map(x => `<label class="audit-choice"><input type="radio" name="${name}" value="${x}" required><span>${x}</span></label>`).join('')}</div></fieldset>`;
  const input = (id, label, type = 'text', extra = '') =>
    `<label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}>`;

  const steps = [
    { title: 'Cómo atiendes a tus clientes', short: 'Tus mensajes', html:
      radios('canal', '1. ¿Por dónde te contactan más tus clientes?', ['WhatsApp', 'Instagram', 'Facebook', 'Llamada', 'En persona']) +
      radios('mensajes', '2. ¿Cuántos mensajes recibes en un día normal?', ['Menos de 10', '10 a 30', '30 a 60', 'Más de 60']) +
      radios('tiempo', '3. ¿Cuánto tardas normalmente en contestar?', ['Menos de 15 minutos', 'Menos de 1 hora', 'Varias horas', 'Al día siguiente o más']) +
      radios('quien', '4. ¿Quién contesta los mensajes?', ['Yo', 'Alguien del equipo que también hace otras tareas', 'Una persona solo para eso']) +
      radios('perdidas', '5. En el último mes, ¿perdiste alguna venta, cita o reserva por no contestar a tiempo o no dar seguimiento?', ['Sí, varias', 'Sí, alguna', 'No', 'No sé']) },
    { title: 'Cómo te encuentran y tus datos', short: 'Tus datos', html:
      radios('encuentran', '6. ¿Cómo te encuentran tus clientes nuevos?', ['Recomendación', 'Redes sociales', 'Google', 'Pasan por el local', 'Otro']) +
      radios('presencia', '7. ¿Tu negocio tiene ficha de Google con horario y fotos, y sitio web?', ['Ambos', 'Solo ficha', 'Solo sitio', 'Ninguno', 'No sé']) +
      `<fieldset><legend>¿A quién le mandamos tu resultado?</legend>${input('nombre', 'Tu nombre', 'text', 'required maxlength="120" autocomplete="name"')}${input('negocio', 'Nombre de tu negocio', 'text', 'required maxlength="160" autocomplete="organization"')}${input('whatsapp', 'Tu WhatsApp (10 dígitos)', 'tel', 'required inputmode="numeric" maxlength="14" autocomplete="tel" pattern="[0-9 ]{10,14}"')}${input('email', 'Correo electrónico (opcional)', 'email', 'maxlength="180" autocomplete="email"')}
      <div class="audit-local-notice"><strong>Tus datos llegan a Foco Digital.</strong><p>Los usamos solo para darte tu resultado y contactarte sobre tu diagnóstico. Consulta el <a href="/privacidad/">aviso de privacidad</a>. No incluyas datos de tus clientes.</p></div>
      <label class="audit-choice"><input name="privacyConsent" type="checkbox" required><span>Leí el aviso de privacidad y acepto que me contacten para darme mi resultado.</span></label>
      <label class="audit-choice"><input name="marketingConsent" type="checkbox"><span>Quiero recibir consejos y novedades de Foco Digital (opcional).</span></label></fieldset>` }
  ];

  mount.innerHTML = `<div class="audit-shell"><div class="audit-top"><span class="audit-eyebrow">Autodiagnóstico</span><span class="audit-mode">3 minutos · gratuito</span></div><p>Siete preguntas sobre cómo te encuentran tus clientes y cómo les respondes. Al terminar ves tu resultado y puedes agendar tu diagnóstico.</p><ol class="audit-steps" aria-label="Pasos del autodiagnóstico">${steps.map((s, i) => `<li data-step-label="${i}"><span>${i + 1}</span> ${s.short}</li>`).join('')}</ol><p id="audit-progress" role="status"></p><form name="${FORM}" method="POST" novalidate><input type="hidden" name="form-name" value="${FORM}"><p hidden><label>No completar <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>${steps.map((s, i) => `<section class="audit-step" data-step="${i}" ${i ? 'hidden' : ''}><h2 tabindex="-1">${s.title}</h2>${s.html}</section>`).join('')}<p id="audit-error" role="alert" class="audit-error"></p><div class="audit-actions"><button type="button" class="audit-back">Anterior</button><button type="submit" class="audit-next">Continuar</button></div><p class="audit-footnote">Tus respuestas se envían a Foco Digital solo cuando terminas y autorizas el envío.</p></form><div class="audit-result" hidden aria-live="polite"></div></div>`;

  const form = mount.querySelector('form'), error = mount.querySelector('#audit-error'), result = mount.querySelector('.audit-result');
  const last = steps.length - 1;
  let step = 0, sending = false;

  function clearErrors() {
    error.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach(el => { el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); });
  }
  function fail(field, message) {
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', 'audit-error');
    field.focus();
  }
  function show(focus = false) {
    mount.querySelectorAll('.audit-step').forEach((s, i) => s.hidden = i !== step);
    mount.querySelectorAll('[data-step-label]').forEach((s, i) => { s.classList.toggle('is-current', i === step); if (i === step) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current'); });
    mount.querySelector('#audit-progress').textContent = `Paso ${step + 1} de ${steps.length}`;
    mount.querySelector('.audit-back').hidden = step === 0;
    mount.querySelector('.audit-next').textContent = step === last ? 'Ver mi resultado' : 'Continuar';
    clearErrors();
    if (focus) mount.querySelector(`[data-step="${step}"] h2`).focus();
  }
  form.addEventListener('change', clearErrors);
  form.addEventListener('input', clearErrors);
  mount.querySelector('.audit-back').addEventListener('click', () => { if (step > 0) { step--; show(true); } });

  function resultado(d) {
    const resp = ['Varias horas', 'Al día siguiente o más'].includes(d.get('tiempo')) || String(d.get('perdidas')).startsWith('Sí');
    const vis = ['Recomendación', 'Pasan por el local'].includes(d.get('encuentran')) || ['Ninguno', 'No sé'].includes(d.get('presencia'));
    const mResp = 'Tu negocio podría estar perdiendo clientes por tiempo de respuesta. En el diagnóstico gratuito revisamos cuántos y cómo evitarlo.';
    const mVis = 'A tu negocio le cuesta que lo encuentren clientes nuevos. En el diagnóstico gratuito revisamos dónde te buscan y qué falta.';
    const mOk = 'Tu atención y tu visibilidad van bien. Si quieres, en el diagnóstico gratuito buscamos qué más se puede mejorar.';
    if (resp && vis) return { clave: 'Ambos', textos: [mResp, mVis] };
    if (resp) return { clave: 'Respuesta y seguimiento', textos: [mResp] };
    if (vis) return { clave: 'Visibilidad', textos: [mVis] };
    return { clave: 'Sin dolor evidente', textos: [mOk] };
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending) return;
    clearErrors();
    const box = mount.querySelector(`[data-step="${step}"]`);
    for (const fs of box.querySelectorAll('fieldset')) {
      const group = fs.querySelector('input[type="radio"]');
      if (group && !fs.querySelector('input[type="radio"]:checked')) { fail(group, 'Elige una opción para continuar.'); return; }
    }
    const fields = [...box.querySelectorAll('input:not([type="radio"])')];
    const invalid = fields.find(f => !f.checkValidity() || (f.required && f.type !== 'checkbox' && !f.value.trim()));
    if (invalid) {
      fail(invalid, invalid.type === 'checkbox' ? 'Necesitamos tu autorización para enviarte tu resultado.' : invalid.name === 'whatsapp' ? 'Escribe tu WhatsApp de 10 dígitos, sin signos.' : invalid.type === 'email' ? 'Escribe un correo válido o deja el campo vacío.' : 'Completa el campo señalado para continuar.');
      return;
    }
    if (step < last) { step++; show(true); return; }

    const fd = new FormData(form);
    const r = resultado(fd);
    const body = new URLSearchParams(fd);
    body.set('form-name', FORM);
    body.set('resultado', r.clave);
    const next = mount.querySelector('.audit-next');
    sending = true; next.disabled = true; next.textContent = 'Enviando…';
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (!response.ok) throw new Error('Submission rejected');
      (window.dataLayer = window.dataLayer || []).push({ event: 'autodiagnostico_envio', resultado: r.clave });
      if (typeof window.gtag === 'function') window.gtag('event', 'autodiagnostico_envio', { resultado: r.clave });
    } catch {
      error.textContent = 'No pudimos enviar tus respuestas. Siguen aquí para volver a intentarlo. También puedes escribirnos por WhatsApp al 56 1876 5291.';
      sending = false; next.disabled = false; next.textContent = 'Ver mi resultado';
      return;
    }
    const negocio = String(fd.get('negocio') || '').trim();
    const texto = encodeURIComponent(`Hola, hice el autodiagnóstico de ${negocio}. Me gustaría agendar mi diagnóstico gratuito.`);
    form.hidden = true; result.hidden = false;
    const h = document.createElement('h2'); h.tabIndex = -1; h.textContent = 'Tu resultado';
    result.appendChild(h);
    r.textos.forEach(t => { const p = document.createElement('p'); p.textContent = t; result.appendChild(p); });
    const p2 = document.createElement('p');
    p2.textContent = 'Te escribimos por WhatsApp en menos de un día hábil para agendar. Si prefieres, agenda tú ahora:';
    result.appendChild(p2);
    const a = document.createElement('a');
    a.className = 'button dark'; a.href = `https://wa.me/${WA}?text=${texto}`; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.textContent = 'Agendar mi diagnóstico por WhatsApp';
    result.appendChild(a);
    h.focus();
  });
  show();
})();
