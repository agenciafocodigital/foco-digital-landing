/* Animaciones de servicios (estilo aprobado por Frank el 24/11/2026).
   Cada elemento con data-at="ms" recibe la clase "in" a ese tiempo; con data-out="ms" la pierde.
   Los pasos (li[data-at]) se marcan "on". El ciclo dura data-loop ms y se repite.
   Con "reducir movimiento" se muestra el estado final, quieto. */
(() => {
  const anims = [...document.querySelectorAll('.fd-anim')];
  if (!anims.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  anims.forEach(root => {
    const items = [...root.querySelectorAll('[data-at]')];
    const steps = [...root.querySelectorAll('.fd-steps li')];
    const pause = root.querySelector('.fd-pause');
    const loop = Number(root.dataset.loop || 14000);
    let timers = [], paused = false, started = false;
    const caption = document.createElement('p');
    caption.className = 'fd-caption'; caption.setAttribute('aria-hidden', 'true');
    root.querySelector('.fd-steps').after(caption);
    const say = li => { caption.textContent = li ? li.querySelector('span').textContent : ''; };

    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const reset = () => { clear(); items.forEach(el => el.classList.remove('in', 'on')); };
    const final = () => {
      reset();
      items.forEach(el => { if (!el.dataset.out) el.classList.add('in'); });
      steps.forEach(li => li.classList.add('on'));
      say(steps[steps.length - 1]);
    };
    const run = () => {
      reset();
      if (reduce.matches) { final(); return; }
      items.forEach(el => {
        const at = Number(el.dataset.at);
        timers.push(setTimeout(() => {
          if (el.matches('.fd-steps li')) { steps.forEach(li => li.classList.toggle('on', li === el)); say(el); }
          else el.classList.add('in');
        }, at));
        if (el.dataset.out) timers.push(setTimeout(() => el.classList.remove('in'), Number(el.dataset.out)));
      });
      timers.push(setTimeout(() => { if (!paused) run(); }, loop));
    };

    if (pause) pause.addEventListener('click', () => {
      paused = !paused;
      pause.textContent = paused ? 'Reproducir' : 'Pausar';
      pause.setAttribute('aria-pressed', String(paused));
      if (paused) clear(); else run();
    });
    reduce.addEventListener('change', () => { if (reduce.matches) final(); else if (!paused) run(); });

    if (!('IntersectionObserver' in window)) { final(); return; }
    final();
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started && !paused) { started = true; run(); }
        else if (!entry.isIntersecting && started) { started = false; clear(); final(); }
      });
    }, { threshold: .35 });
    io.observe(root);
  });
})();
