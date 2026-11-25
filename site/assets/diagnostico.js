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
    { title: 'Cómo te encuentran', short: 'Visibilidad', html:
      radios('encuentran', '1. ¿Cómo llegan a ti la mayoría de tus clientes nuevos?', ['Por recomendación', 'Por redes sociales', 'Por Google o Google Maps', 'Pasan por mi local', 'No sé']) +
      radios('google', '2. Si alguien busca tu negocio en Google, ¿qué encuentra?', ['Mi ficha con horario, fotos y reseñas', 'Una ficha incompleta o desactualizada', 'No aparezco', 'No sé']) +
      radios('web', '3. ¿Tienes página web?', ['Sí, y me trae clientes', 'Sí, pero casi no me trae clientes', 'No tengo']) +
      radios('redes', '4. ¿Cada cuánto publicas en tus redes sociales?', ['Cada semana', 'A veces', 'Casi nunca', 'No tengo redes']) },
    { title: 'Cuánto tiempo te lleva atender', short: 'Atención', html:
      radios('canal', '5. ¿Por dónde te escriben más tus clientes?', ['WhatsApp', 'Instagram', 'Facebook', 'Llamada', 'En persona']) +
      radios('mensajes', '6. ¿Cuántos mensajes recibes en un día normal?', ['Menos de 10', '10 a 30', '30 a 60', 'Más de 60']) +
      radios('tiempo', '7. ¿Cuánto tardas normalmente en contestar?', ['Menos de 15 minutos', 'Menos de 1 hora', 'Varias horas', 'Al día siguiente o más']) +
      radios('horas', '8. ¿Cuánto tiempo al día dedicas a contestar mensajes?', ['Menos de 1 hora', '1 a 3 horas', 'Más de 3 horas']) +
      radios('perdidas', '9. En el último mes, ¿cuántas ventas, citas o reservas perdiste por no contestar a tiempo o no dar seguimiento?', ['Ninguna', '1 a 3', '4 a 10', 'Más de 10', 'No sé']) +
      radios('ticket', '10. ¿Cuánto deja en promedio cada venta o servicio?', ['Menos de $500', '$500 a $2,000', '$2,000 a $10,000', 'Más de $10,000']) },
    { title: 'Tus datos', short: 'Tus datos', html:
      radios('giro', '¿A qué se dedica tu negocio?', ['Comida y bebidas', 'Salud y bienestar', 'Servicios profesionales', 'Tienda o productos', 'Otro']) +
      `<fieldset><legend>¿A quién le mandamos tu resultado?</legend>${input('nombre', 'Tu nombre', 'text', 'required maxlength="120" autocomplete="name"')}${input('negocio', 'Nombre de tu negocio', 'text', 'required maxlength="160" autocomplete="organization"')}${input('whatsapp', 'Tu WhatsApp (10 dígitos)', 'tel', 'required inputmode="numeric" maxlength="13" autocomplete="tel" pattern="(?:[0-9] ?){9}[0-9]"')}${input('email', 'Correo electrónico (opcional)', 'email', 'maxlength="180" autocomplete="email"')}
      <div class="audit-local-notice"><strong>Tus datos llegan a Foco Digital.</strong><p>Los usamos solo para darte tu resultado y contactarte sobre tu diagnóstico. Consulta el <a href="/privacidad/">aviso de privacidad</a>. No incluyas datos de tus clientes.</p></div>
      <label class="audit-choice"><input name="privacyConsent" type="checkbox" required><span>Leí el aviso de privacidad y acepto que me contacten para darme mi resultado.</span></label>
      <label class="audit-choice"><input name="marketingConsent" type="checkbox"><span>Quiero recibir consejos y novedades de Foco Digital (opcional).</span></label></fieldset>` }
  ];

  mount.innerHTML = `<div class="audit-shell"><div class="audit-top"><span class="audit-eyebrow">Autodiagnóstico</span><span class="audit-mode">3 minutos · gratuito</span></div><p>Diez preguntas sobre cómo te encuentran tus clientes y cuánto tiempo te lleva atenderlos. Al terminar ves cómo está tu negocio, qué te está costando y cómo resolverlo.</p><ol class="audit-steps" aria-label="Pasos del autodiagnóstico">${steps.map((s, i) => `<li data-step-label="${i}"><span>${i + 1}</span> ${s.short}</li>`).join('')}</ol><p id="audit-progress" role="status"></p><form name="${FORM}" method="POST" novalidate><input type="hidden" name="form-name" value="${FORM}"><p hidden><label>No completar <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>${steps.map((s, i) => `<section class="audit-step" data-step="${i}" ${i ? 'hidden' : ''}><h2 tabindex="-1">${s.title}</h2>${s.html}</section>`).join('')}<p id="audit-error" role="alert" class="audit-error"></p><div class="audit-actions"><button type="button" class="audit-back">Anterior</button><button type="submit" class="audit-next">Continuar</button></div><p class="audit-footnote">Tus respuestas se envían a Foco Digital solo cuando terminas y autorizas el envío.</p></form><div class="audit-result" hidden aria-live="polite"></div></div>`;

  const form = mount.querySelector('form'), error = mount.querySelector('#audit-error'), result = mount.querySelector('.audit-result');
  const last = steps.length - 1;
  let step = 0, sending = false;
  const errorHome = error.parentNode, errorNext = error.nextSibling;

  function clearErrors() {
    error.textContent = '';
    if (error.parentNode !== errorHome) errorHome.insertBefore(error, errorNext);
    form.querySelectorAll('[aria-invalid]').forEach(el => { el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); });
  }
  function fail(field, message) {
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', 'audit-error');
    const fs = field.type === 'radio' ? field.closest('fieldset') : null;
    if (fs) fs.appendChild(error);
    else if (field.type === 'checkbox') field.closest('label').after(error);
    else field.after(error);
    field.focus();
    (fs || field).scrollIntoView({ block: 'center' });
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

  const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  const nivel = (p, urg) => p === 0 ? 'Bien' : p >= urg ? 'Urgente' : 'Mejorable';
  function resultado(d) {
    const g = k => String(d.get(k) || '');
    // Visibilidad
    const huecos = [];
    let pv = 0;
    if (['Por recomendación', 'Pasan por mi local'].includes(g('encuentran'))) { pv += 1; huecos.push('Casi ningún cliente nuevo llega por internet.'); }
    else if (g('encuentran') === 'No sé') { pv += 1; huecos.push('No sabes cómo llegan tus clientes nuevos; conviene medirlo para saber qué funciona.'); }
    if (g('google') === 'No aparezco') { pv += 2; huecos.push('Si te buscan en Google, no te encuentran.'); }
    else if (g('google') === 'No sé') { pv += 1; huecos.push('No sabes qué ve un cliente cuando te busca en Google.'); }
    else if (g('google').startsWith('Una ficha incompleta')) { pv += 1; huecos.push('Tu ficha de Google está incompleta o desactualizada.'); }
    const webHueco = g('web') !== 'Sí, y me trae clientes';
    if (webHueco) { pv += 1; huecos.push(g('web') === 'No tengo' ? 'No tienes página web que explique lo que ofreces.' : 'Tu página web casi no te trae clientes.'); }
    const redesHueco = ['Casi nunca', 'No tengo redes'].includes(g('redes'));
    if (redesHueco) { pv += 1; huecos.push('Publicas poco en tus redes sociales.'); }
    const vis = nivel(pv, 3);
    const visServ = [];
    if (pv && (pv - (webHueco ? 1 : 0)) > 0) visServ.push(['Visibilidad: redes sociales y ficha de Google', '/servicios/redes-sociales-google/']);
    if (webHueco) visServ.push(['Web: una página que lleva a tus clientes a WhatsApp', '/servicios/sitios-web/']);
    // Atención
    const datos = [];
    let pa = 0;
    const t = g('tiempo');
    if (t === 'Al día siguiente o más') pa += 3; else if (t === 'Varias horas') pa += 2;
    else if (t === 'Menos de 1 hora' && g('mensajes') !== 'Menos de 10') pa += 1;
    if (t) datos.push(t === 'Al día siguiente o más' ? 'Contestas al día siguiente o después.' : `Tardas ${t.toLowerCase()} en contestar.`);
    if (g('horas') === '1 a 3 horas') pa += 1; else if (g('horas') === 'Más de 3 horas') pa += 2;
    if (g('horas')) datos.push(`Dedicas ${/^\d/.test(g('horas')) ? 'de ' : ''}${g('horas').toLowerCase()} al día a contestar mensajes.`);
    const perd = { '1 a 3': [1, 3, 1], '4 a 10': [4, 10, 2], 'Más de 10': [10, null, 3], 'No sé': [null, null, 1] }[g('perdidas')];
    if (perd && !perd[0]) datos.push('No sabes cuántas ventas se te escapan por no contestar a tiempo; vale la pena medirlo.');
    if (perd) { pa += perd[2]; if (perd[0]) datos.push(`El mes pasado perdiste ${/^\d/.test(g('perdidas')) ? 'de ' : ''}${g('perdidas').toLowerCase()} ventas, citas o reservas.`); }
    const aten = nivel(pa, 3);
    // Estimación con sus respuestas
    let estimacion = '';
    const tk = { 'Menos de $500': [null, 500], '$500 a $2,000': [500, 2000], '$2,000 a $10,000': [2000, 10000], 'Más de $10,000': [10000, null] }[g('ticket')];
    if (perd && perd[0] && tk) {
      const lo = tk[0] ? perd[0] * tk[0] : null, hi = perd[1] && tk[1] ? perd[1] * tk[1] : null;
      estimacion = lo && hi ? `entre ${money.format(lo)} y ${money.format(hi)} al mes` : lo ? `más de ${money.format(lo)} al mes` : hi ? `hasta ${money.format(hi)} al mes` : '';
    }
    return { vis, aten, huecos, visServ, datos, estimacion, clave: `Visibilidad: ${vis} · Atención: ${aten}` };
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
    body.set('whatsapp', String(fd.get('whatsapp') || '').replace(/\D/g, ''));
    body.set('resultado', r.clave);
    body.set('perdida_estimada', r.estimacion || 'Sin estimación');
    const next = mount.querySelector('.audit-next');
    sending = true; next.disabled = true; next.textContent = 'Enviando…';
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (!response.ok) throw new Error('Submission rejected');
      (window.dataLayer = window.dataLayer || []).push({ event: 'autodiagnostico_envio' });
      if (typeof window.gtag === 'function') window.gtag('event', 'autodiagnostico_envio');
    } catch {
      error.textContent = 'No pudimos enviar tus respuestas. Siguen aquí para volver a intentarlo. También puedes escribirnos por WhatsApp al 56 1876 5291.';
      sending = false; next.disabled = false; next.textContent = 'Ver mi resultado';
      return;
    }
    const negocio = String(fd.get('negocio') || '').trim();
    const texto = encodeURIComponent(`Hola, hice el autodiagnóstico de ${negocio}. Mi resultado: ${r.clave}. Me gustaría agendar mi diagnóstico gratuito.`);
    form.hidden = true; result.hidden = false;
    mount.querySelector('.audit-steps').hidden = true; mount.querySelector('#audit-progress').hidden = true;
    const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
    const h = el('h2', '', 'Así está tu negocio'); h.tabIndex = -1; result.appendChild(h);
    const area = (titulo, estado, intro, puntos, servicios, servTitulo) => {
      const box = el('div', `res-area res-${estado.toLowerCase()}`);
      const head = el('p', 'res-head'); head.append(el('strong', '', titulo), el('span', 'res-badge', estado)); box.appendChild(head);
      box.appendChild(el('p', '', intro));
      if (puntos.length) { const ul = el('ul', 'res-list'); puntos.forEach(x => ul.appendChild(el('li', '', x))); box.appendChild(ul); }
      if (servicios.length) {
        const p = el('p', 'res-serv', servTitulo + ' ');
        servicios.forEach(([n, u], i) => { const a = el('a', '', n); a.href = u; if (i) p.append(' · '); p.appendChild(a); });
        box.appendChild(p);
      }
      result.appendChild(box);
    };
    const introVis = { Bien: 'Tu negocio se ve bien en internet. Mantenerlo al día te ayuda a seguir así.', Mejorable: 'Te pueden encontrar, pero hay huecos. Cada hueco es un cliente que termina con otro negocio:', Urgente: 'Cuando un cliente nuevo te busca en internet, lo más probable es que encuentre primero a otros negocios:' }[r.vis];
    const introAten = { Bien: 'Respondes a tiempo. Si tus mensajes crecen, un asistente con IA te ayuda a mantener ese ritmo.', Mejorable: 'Contestas, pero se te va tiempo o se escapa alguna venta:', Urgente: 'Tardar en contestar te está costando clientes: quien no recibe respuesta pronto suele escribirle a otro negocio.' }[r.aten];
    area('Visibilidad', r.vis, introVis, r.huecos, r.visServ, 'Lo resolvemos con:');
    area('Atención a tus clientes', r.aten, introAten, r.datos, r.aten === 'Bien' ? [] : [['Asistentes de IA: un asistente que responde por ti en WhatsApp', '/servicios/asistente-whatsapp-ia/']], 'Lo resolvemos con:');
    if (r.estimacion) {
      const est = el('div', 'res-estimacion');
      est.append(el('p', '', 'Con tus respuestas, lo que dejas de vender por no contestar a tiempo podría ser'), el('p', 'res-monto', r.estimacion), el('p', 'small-text', 'Estimación con los rangos que elegiste; no es una promesa de resultados.'));
      result.appendChild(est);
    }
    result.appendChild(el('p', '', 'Te escribimos de inmediato por WhatsApp para agendar una llamada gratuita de 30 minutos y revisar juntos qué te conviene. Si prefieres, agenda tú ahora:'));
    const a = el('a', 'button yellow', 'Agendar mi diagnóstico por WhatsApp');
    a.href = `https://wa.me/${WA}?text=${texto}`; a.target = '_blank'; a.rel = 'noopener noreferrer';
    result.appendChild(a);
    h.focus();
  });
  show();
})();
