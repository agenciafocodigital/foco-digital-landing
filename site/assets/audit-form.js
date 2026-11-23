(() => {
  const mount = document.querySelector('#audit-app');
  if (!mount) return;
  const checks = (name, options) => `<div class="audit-options">${options.map((x,i)=>`<label class="audit-choice"><input type="checkbox" name="${name}" value="${x}"><span>${x}</span></label>`).join('')}</div>`;
  const input = (id,label,type='text',extra='') => `<label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}>`;
  const select = (id,label,options,required=true) => `<label for="${id}">${label}</label><select id="${id}" name="${id}" ${required?'required':' '}><option value="">Selecciona una opción</option>${options.map(x=>`<option>${x}</option>`).join('')}</select>`;
  const sections = [
    {title:'Tu negocio y lo que ofreces', short:'Identidad', html:`<fieldset><legend>1. Conozcamos tu negocio</legend>${input('business','Nombre del negocio','text','required maxlength="120" autocomplete="organization"')}${input('sector','¿A qué se dedica?','text','required maxlength="180" placeholder="Ej. hospedaje, bienestar, comercio, servicios profesionales"')}</fieldset><fieldset><legend>2. Tu oferta principal</legend><label for="offer">¿Qué producto o servicio vendes principalmente?</label><textarea name="offer" id="offer" required maxlength="1500" rows="3"></textarea>${input('ticket','Importe aproximado por venta (MXN), o escribe “No lo sé”','text','required maxlength="80" placeholder="Ej. $1,500 por sesión o paquete"')}${select('customer','¿A quién vendes?',['Personas','Empresas','Personas y empresas'])}${select('model','¿Cómo vendes o atiendes?',['En un local o establecimiento','A domicilio','En línea','De forma mixta'])}</fieldset>`},
    {title:'Dónde estás y cómo te encuentran', short:'Canales', html:`<fieldset><legend>3. Tu mercado</legend>${input('location','¿En qué ciudad, estado o país atiendes hoy?','text','required maxlength="250"')}${select('reach','¿Dónde buscas nuevos clientes?',['En mi localidad o ciudad','En varios estados de México','En todo México','En otros países'])}${input('target','Lugares específicos que te interesan (opcional)','text','maxlength="250"')}</fieldset><fieldset><legend>4. Tus canales y herramientas</legend><p>Marca lo que utilizas. Puedes continuar aunque no tengas presencia digital.</p>${checks('assets',['Sitio web','Perfil de negocio en Google','Redes sociales','Base de datos de clientes','Sistema de seguimiento de clientes (CRM)','Herramientas de medición','Todavía no tengo activos digitales','No lo sé'])}<label for="links">Enlaces que quieres que revisemos (opcional)</label><textarea name="links" id="links" rows="4" maxlength="3000" placeholder="Una dirección por línea: sitio web, perfil de Google o redes sociales"></textarea><small>Prioriza hasta tres activos. No incluyas contraseñas ni datos de tus clientes.</small></fieldset>`},
    {title:'Clientes, competencia y recursos',short:'Contexto',html:`<fieldset><legend>5. Cómo llegan tus clientes</legend>${checks('sources',['Recomendaciones o boca a boca','Búsquedas en Google','Publicidad pagada','Contacto directo o prospección','Redes sociales','Otros canales','No lo sé'])}${input('mainSource','¿Cuál te trae más clientes? Si no lo sabes, indícalo.','text','required maxlength="250"')}</fieldset><fieldset><legend>6. Negocios con los que compites</legend><label for="competitors">Nombres o enlaces de dos competidores (opcional)</label><textarea id="competitors" name="competitors" rows="3" maxlength="1500" placeholder="Negocios con una oferta y un mercado similares"></textarea><label class="audit-choice"><input name="unknownCompetitors" type="checkbox"><span>No los tengo identificados</span></label></fieldset><fieldset><legend>7. Recursos para mejorar</legend>${select('team','¿Quién podría participar?',['Yo, como dueño o responsable','Un equipo interno','Un profesional externo','Una agencia','Aún no tengo apoyo definido'])}${select('budget','¿Qué inversión mensual podrías considerar?',['Menos de $2,000 MXN','$2,000 a $5,000 MXN','$5,001 a $10,000 MXN','Más de $10,000 MXN','Necesito orientación'])}${select('time','¿Cuánto tiempo podrías dedicar por semana? (opcional)',['Menos de 1 hora','De 1 a 3 horas','De 4 a 8 horas','Más de 8 horas','Necesito orientación'],false)}<small>Tu presupuesto ayuda a proponer acciones viables; no determina tu nivel de madurez.</small></fieldset>`},
    {title:'Tu prioridad y datos de contacto',short:'Prioridad',html:`<fieldset><legend>8. ¿Qué frena más tu crecimiento?</legend>${select('bottleneck','Elige la situación principal',['Pocas personas encuentran mi negocio','Nos visitan, pero no nos contactan','Llegan consultas que no encajan con lo que ofrecemos','Se pierden oportunidades por atención o seguimiento manual','No sabemos de dónde vienen las ventas','No estoy seguro; necesito identificarlo'])}<label for="notes">¿Algo más que debamos entender? (opcional)</label><textarea id="notes" name="notes" rows="3" maxlength="2000"></textarea></fieldset><fieldset><legend>¿Con quién conversaremos sobre el negocio?</legend>${input('contact','Tu nombre','text','required maxlength="120" autocomplete="name"')}${input('email','Correo electrónico','email','required maxlength="180" autocomplete="email"')}${input('phone','WhatsApp (opcional)','tel','maxlength="30" autocomplete="tel"')}<div class="audit-local-notice"><strong>Tu solicitud llegará a Foco Digital.</strong><p>El responsable es Agencia Foco Digital. Usaremos tus datos para revisar tu solicitud y contactarte. El cuestionario no realiza por sí solo una auditoría automática. Consulta el <a href="/privacidad/">aviso de privacidad integral</a> antes de continuar. Evita datos sensibles o información de tus clientes.</p></div><label class="audit-choice"><input id="localConsent" name="localConsent" type="checkbox" required><span>He leído el aviso de privacidad y autorizo el envío de mis datos para atender mi solicitud de auditoría.</span></label><label class="audit-choice"><input name="marketingConsent" type="checkbox"><span>Quiero recibir consejos y novedades de Foco Digital (opcional). Esta elección es independiente de mi solicitud.</span></label></fieldset>`}
  ];
  mount.innerHTML = `<div class="audit-shell"><div class="audit-top"><span class="audit-eyebrow">AUDITORÍA DE TU NEGOCIO</span><span class="audit-mode">Solicitud gratuita</span></div><p>Comparte el contexto de tu negocio. La auditoría completa requiere revisar tus activos, contrastar competidores y distinguir los datos comprobados de los pendientes.</p><ol class="audit-steps" aria-label="Pasos del cuestionario">${sections.map((s,i)=>`<li data-step-label="${i}"><span>${i+1}</span> ${s.short}</li>`).join('')}</ol><p id="audit-progress" role="status"></p><form name="auditoria-foco-digital" method="POST" novalidate><input type="hidden" name="form-name" value="auditoria-foco-digital"><p hidden><label>No completar <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>${sections.map((s,i)=>`<section class="audit-step" data-step="${i}" ${i?'hidden':''}><h2 tabindex="-1">${s.title}</h2>${s.html}</section>`).join('')}<p id="audit-error" role="alert" class="audit-error"></p><div class="audit-actions"><button type="button" class="audit-back">Anterior</button><button type="submit" class="audit-next">Continuar</button></div><p class="audit-footnote">Tus respuestas permanecen al retroceder. Se enviarán a Foco Digital únicamente cuando finalices y autorices el envío.</p></form><div class="audit-result" hidden aria-live="polite"></div></div>`;
  const form = mount.querySelector('form'), error=mount.querySelector('#audit-error'), result=mount.querySelector('.audit-result');
  let step=0;
  function clearErrors(){
    error.textContent='';
    form.querySelectorAll('[aria-invalid]').forEach(el=>{el.removeAttribute('aria-invalid');el.removeAttribute('aria-describedby');});
  }
  function fail(field,message){
    error.textContent=message;
    field.setAttribute('aria-invalid','true');
    field.setAttribute('aria-describedby','audit-error');
    field.focus();
  }
  const exclusive = new Set(['Todavía no tengo activos digitales','No lo sé']);
  form.addEventListener('change',e=>{
    clearErrors();
    const field=e.target;
    if(['assets','sources'].includes(field.name) && field.checked){
      form.querySelectorAll(`input[name="${field.name}"]`).forEach(other=>{
        if(other!==field && (exclusive.has(field.value)||exclusive.has(other.value)))other.checked=false;
      });
    }
    if(field.name==='unknownCompetitors' && field.checked)form.elements.competitors.value='';
  });
  form.addEventListener('input',e=>{
    clearErrors();
    if(e.target.name==='competitors' && e.target.value.trim())form.elements.unknownCompetitors.checked=false;
  });
  function show(focus=false){
    mount.querySelectorAll('.audit-step').forEach((s,i)=>s.hidden=i!==step);
    mount.querySelectorAll('[data-step-label]').forEach((s,i)=>{s.classList.toggle('is-current',i===step);if(i===step)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current');});
    mount.querySelector('#audit-progress').textContent=`Paso ${step+1} de 4`;
    mount.querySelector('.audit-back').hidden=step===0;
    mount.querySelector('.audit-next').textContent=step===3?'Enviar mi solicitud de auditoría':'Continuar';
    clearErrors();
    if(focus)mount.querySelector(`[data-step="${step}"] h2`).focus();
  }
  mount.querySelector('.audit-back').addEventListener('click',()=>{if(step>0){step--;show(true);}});
  let sending = false;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(sending) return;
    clearErrors();
    const fields=[...mount.querySelectorAll(`[data-step="${step}"] input, [data-step="${step}"] select, [data-step="${step}"] textarea`)];
    const invalid=fields.find(f=>!f.checkValidity() || (f.required && f.type!=='checkbox' && !f.value.trim()));
    if(invalid){fail(invalid,invalid.type==='checkbox'?'Necesitamos tu autorización para enviar tus datos y atender tu solicitud.':invalid.type==='email'?'Escribe un correo electrónico válido.':'Completa el campo señalado para continuar.');return;}
    const group=step===1?'assets':step===2?'sources':null;
    if(group && !form.querySelector(`input[name="${group}"]:checked`)){
      fail(form.querySelector(`input[name="${group}"]`),group==='assets'?'Selecciona tus activos digitales, o indica que no tienes o no lo sabes.':'Selecciona cómo llegan tus clientes, o indica que no lo sabes.');return;
    }
    if(step===1 && form.elements.links.value.trim()){
      const normalized=[];
      for(const line of form.elements.links.value.trim().split(/\r?\n/).filter(x=>x.trim())){
        try{
          const value=line.trim();
          const url=new URL(/^[a-z][a-z0-9+.-]*:/i.test(value)?value:`https://${value}`);
          if(!['http:','https:'].includes(url.protocol)||!url.hostname.includes('.')||url.username||url.password)throw new Error('invalid');
          normalized.push(url.href);
        }catch{fail(form.elements.links,'Escribe una dirección web por línea, por ejemplo negocio.com o https://negocio.com. Solo se aceptan enlaces http o https.');return;}
      }
      form.elements.links.value=normalized.join('\n');
    }
    if(step<3){step++;show(true);return;}
    const fd=new FormData(form), body=new URLSearchParams(fd);
    body.set('form-name','auditoria-foco-digital');
    for(const name of ['assets','sources']) body.set(name,fd.getAll(name).join(', '));
    const next=mount.querySelector('.audit-next');
    sending=true; next.disabled=true; next.textContent='Enviando…';
    try {
      const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});
      if(!response.ok) throw new Error('Submission rejected');
    } catch {
      error.textContent='No pudimos enviar tu solicitud. Tus respuestas siguen aquí para volver a intentarlo. También puedes escribir a foco.digital.contacto@gmail.com.';
      return;
    } finally {
      sending=false; next.disabled=false; next.textContent='Enviar mi solicitud de auditoría';
    }
    form.hidden=true;result.hidden=false;
    result.innerHTML='<h2 tabindex="-1">Recibimos tu solicitud de auditoría</h2><p>Foco Digital recibió tus respuestas y te contactará por el correo que compartiste. <strong>El envío no genera una auditoría automática.</strong> Revisaremos el contexto y los enlaces de tu negocio para preparar el siguiente paso.</p><a class="button dark" href="/">Volver al inicio</a>';
    result.querySelector('h2').focus();
  });
  show();
})();
