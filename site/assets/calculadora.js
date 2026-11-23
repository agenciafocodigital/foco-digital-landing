/* Calculadora "¿Cuánto pierdes por no responder a tiempo?" · Foco Digital
   Estimación con los números del visitante. Envía el resultado a Netlify Forms solo si la persona
   escribe su WhatsApp y acepta el aviso de privacidad. */
(() => {
  const mount = document.querySelector('#calc-app');
  if (!mount) return;

  const FORM = 'calculadora-foco-digital';
  const WA = '525618765291';
  const SEMANAS_POR_MES = 4.3;
  const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 1 });

  const range = (id, label, min, max, step, value) =>
    `<div class="calc-field"><label for="${id}"><span>${label}</span><output id="${id}-out" for="${id}">${value}</output></label>` +
    `<input id="${id}" name="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;

  mount.innerHTML = `
    <div class="calc-shell">
      <p class="calc-title">Calcula con los números de tu negocio</p>
      ${range('calc-mensajes', 'Mensajes que recibes a la semana', 5, 300, 5, 40)}
      ${range('calc-tarde', 'De cada 10, ¿cuántos respondes tarde o nunca?', 0, 10, 1, 3)}
      ${range('calc-compran', 'De cada 10 que atiendes bien, ¿cuántos te compran?', 1, 10, 1, 3)}
      <div class="calc-field">
        <label for="calc-ticket"><span>¿Cuánto deja en promedio cada venta? (pesos)</span></label>
        <input id="calc-ticket" name="calc-ticket" type="number" inputmode="numeric" min="0" step="50" value="500">
      </div>
      <div class="calc-result" aria-live="polite">
        <p>Podrías estar dejando de vender cada mes</p>
        <p class="calc-amount" id="calc-mes">$0</p>
        <p class="calc-detail" id="calc-detalle"></p>
        <p class="calc-note">Estimación con los números que tú pones; no es una promesa de resultados.</p>
      </div>
      <form class="calc-form" name="${FORM}" method="POST" novalidate>
        <input type="hidden" name="form-name" value="${FORM}">
        <p hidden><label>No completar <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <label for="calc-whatsapp">Recibe este cálculo y un plan para no perder esos mensajes</label>
        <input id="calc-whatsapp" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel" maxlength="14" placeholder="Tu WhatsApp, 10 dígitos">
        <label class="calc-consent"><input id="calc-consent" name="privacyConsent" type="checkbox" value="sí">
          <span>Leí el <a href="/privacidad/">aviso de privacidad</a> y acepto que me envíen mi resultado por WhatsApp.</span></label>
        <p class="calc-error" id="calc-error" role="alert"></p>
        <button class="button yellow" type="submit" disabled>Enviarme mi resultado</button>
      </form>
      <div class="calc-done" hidden tabindex="-1">
        <p class="calc-title">Listo. Te escribimos por WhatsApp.</p>
        <p>Si prefieres no esperar, mándanos tu resultado ahora y lo revisamos contigo.</p>
        <a class="button yellow" id="calc-wa" href="#" rel="noopener noreferrer" target="_blank">Abrir WhatsApp</a>
      </div>
    </div>`;

  const $ = (sel) => mount.querySelector(sel);
  const inputs = { mensajes: $('#calc-mensajes'), tarde: $('#calc-tarde'), compran: $('#calc-compran'), ticket: $('#calc-ticket') };
  const form = $('.calc-form');
  const phone = $('#calc-whatsapp');
  const consent = $('#calc-consent');
  const submit = form.querySelector('button[type="submit"]');
  const error = $('#calc-error');
  let last = null;

  function calcular() {
    const mensajes = Number(inputs.mensajes.value) || 0;
    const tarde = Number(inputs.tarde.value) || 0;
    const compran = Number(inputs.compran.value) || 0;
    const ticket = Math.max(0, Number(inputs.ticket.value) || 0);
    const perdidos = Math.round(mensajes * SEMANAS_POR_MES * tarde / 10);
    const ventas = perdidos * compran / 10;
    const mes = Math.round(ventas * ticket);
    $('#calc-mensajes-out').value = mensajes;
    $('#calc-tarde-out').value = tarde;
    $('#calc-compran-out').value = compran;
    $('#calc-mes').textContent = money.format(mes);
    $('#calc-detalle').textContent =
      `${num.format(perdidos)} mensajes sin respuesta a tiempo al mes · ${num.format(ventas)} ventas que podrían cerrarse · ${money.format(mes * 12)} al año`;
    last = { mensajes, tarde, compran, ticket, perdidos, mes };
  }

  const telefono = () => phone.value.replace(/\D/g, '');
  function validar() {
    submit.disabled = !(consent.checked && telefono().length === 10);
  }

  Object.values(inputs).forEach((el) => el.addEventListener('input', calcular));
  phone.addEventListener('input', () => { error.textContent = ''; validar(); });
  consent.addEventListener('change', validar);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (telefono().length !== 10) {
      error.textContent = 'Escribe tu WhatsApp a 10 dígitos.';
      phone.focus();
      return;
    }
    if (!consent.checked) {
      error.textContent = 'Para enviarte el resultado necesitamos que aceptes el aviso de privacidad.';
      consent.focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = 'Enviando…';
    const body = new URLSearchParams({
      'form-name': FORM,
      'bot-field': form.querySelector('[name="bot-field"]').value,
      mensajes_semana: last.mensajes,
      tarde_de_10: last.tarde,
      compran_de_10: last.compran,
      ticket_promedio: last.ticket,
      mensajes_perdidos_mes: last.perdidos,
      estimacion_mes: last.mes,
      whatsapp: telefono(),
      privacyConsent: 'sí',
    });
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (!res.ok) throw new Error(String(res.status));
      (window.dataLayer = window.dataLayer || []).push({ event: 'calculadora_envio', estimacion_mes: last.mes });
      const texto = `Hola, usé la calculadora de Foco Digital. Recibo ${last.mensajes} mensajes a la semana y calculé ${money.format(last.mes)} al mes en ventas que podría estar perdiendo. Quiero revisar cómo no perderlas.`;
      $('#calc-wa').href = `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;
      form.hidden = true;
      const done = $('.calc-done');
      done.hidden = false;
      done.focus();
    } catch (e) {
      error.textContent = 'No pudimos enviar tu resultado. Inténtalo de nuevo o escríbenos por WhatsApp al 56 1876 5291.';
      submit.textContent = 'Enviarme mi resultado';
      validar();
    }
  });

  calcular();
})();
