"""Crea dos guías nuevas a partir de la plantilla de una guía existente (uso único, 24/11/2026)."""
import json, re, pathlib
from bs4 import BeautifulSoup

R = pathlib.Path(__file__).resolve().parent.parent / 'site'
D = 'https://agenciafocodigital.com'
plantilla = (R / 'blog/te-recomiendan-pero-no-encuentran-tu-negocio/index.html').read_text()

GUIAS = [
    {
        'slug': 'cuanto-cuesta-pagina-web-negocio',
        'title': 'Cuánto cuesta una página web para un negocio en México',
        'desc': 'Cuánto cuesta una página web para un negocio en México en 2026: rangos de precio por tipo de página, qué debe incluir y qué costos vienen después.',
        'cat': 'Web',
        'h1': '¿Cuánto cuesta una página web para un negocio en México?',
        'intro': 'Antes de pedir cotizaciones, conviene saber qué tipo de página necesitas, qué rangos de precio son normales y qué gastos vienen después del primer año.',
        'cuerpo': '''<p>Si preguntas a tres proveedores cuánto cuesta una página web, es probable que recibas tres respuestas muy distintas. No siempre es que alguien cobre de más: muchas veces están cotizando cosas diferentes. Una página de una sola oferta no se parece a un sitio con varias páginas, ni a una tienda en línea.</p>
<p>Esta guía te ayuda a ubicar qué necesitas y qué rangos de precio son normales en México en 2026, para que compares cotizaciones con el mismo criterio.</p>
<h2>Primero define qué tipo de página necesitas</h2>
<p><strong>Página de ventas (también llamada landing page).</strong> Una sola página con una oferta clara y un botón para escribirte. Sirve cuando vendes un servicio principal o quieres que la gente haga una sola cosa, por ejemplo pedir informes por WhatsApp.</p>
<p><strong>Web de una página.</strong> Una página larga dividida en secciones: quién eres, qué ofreces, precios o paquetes, preguntas frecuentes y contacto. Funciona bien para negocios con pocos servicios que quieren explicarlos en un solo recorrido.</p>
<p><strong>Sitio de varias páginas.</strong> Una página por servicio, más inicio, quiénes somos y contacto. Conviene cuando ofreces varios servicios distintos y cada uno necesita su propia explicación, o cuando quieres aparecer en Google con búsquedas diferentes.</p>
<p><strong>Tienda en línea.</strong> Catálogo, carrito y pagos con tarjeta. Es otro tipo de proyecto, con más trabajo y costos mensuales.</p>
<h2>Rangos de precio en México en 2026</h2>
<p>Con base en los precios que publican agencias y proveedores en México, estos son los rangos más comunes, sin contar el IVA en la mayoría de los casos:</p>
<ul class="check-list"><li><strong>Página de ventas:</strong> de unos $1,500 en paquetes muy básicos a $15,000 cuando incluye estrategia, textos y medición.</li><li><strong>Sitio de 3 a 8 páginas:</strong> de $5,000 a $25,000, según si incluye textos, fotos, correo y posicionamiento básico en Google.</li><li><strong>Sitio corporativo completo:</strong> de $15,000 a $50,000.</li><li><strong>Tienda en línea:</strong> desde $10,000 en plataformas sencillas hasta más de $50,000.</li></ul>
<p>Son rangos orientativos y cambian con el tiempo. Lo importante es comparar qué incluye cada precio.</p>
<h2>Qué debe incluir una página para negocio</h2>
<p>Una página barata que nadie entiende sale cara. Antes de comparar precios, revisa que la cotización incluya lo que hace que una página te traiga clientes:</p>
<ul class="check-list"><li>Que se vea bien en celular, porque ahí te van a buscar la mayoría de tus clientes.</li><li>Un botón claro para escribirte por WhatsApp, de preferencia con un mensaje listo.</li><li>Información ordenada: qué haces, para quién, cuánto cuesta o desde cuánto, y cómo pedirlo.</li><li>Lo básico para que Google la entienda: títulos claros y una descripción de cada página.</li><li>Dominio propio (por ejemplo, tunegocio.com) y hospedaje, y quién paga su renovación.</li><li>Cuántas rondas de cambios incluye y cuánto tarda en estar lista.</li></ul>
<h2>Los costos que vienen después</h2>
<p>Muchas cotizaciones incluyen el dominio y el hospedaje solo el primer año. A partir del segundo, el dominio suele costar entre $200 y $800 al año y el hospedaje entre $1,000 y $5,000 al año, según el proveedor. Pregunta también cuánto cuesta un cambio sencillo después de entregada la página, por ejemplo actualizar un precio o un horario.</p>
<h2>Cómo comparar cotizaciones</h2>
<p>Pide que cada proveedor te diga por escrito qué tipo de página entrega, cuántas páginas o secciones incluye, si redacta los textos o los pones tú, si incluye dominio, hospedaje y correo, cuánto tarda y qué pasa con los cambios. Con eso puedes comparar precio contra precio.</p>
<p>En Foco Digital trabajamos con precios publicados: página de ventas desde $4,600, web de una página $5,700 y sitio de hasta 5 páginas $7,200, más IVA, con botones de WhatsApp, dominio y hospedaje del primer año. Si no sabes cuál te conviene, el autodiagnóstico gratuito te ayuda a verlo.</p>''',
        'related': ('importancia-ficha-google-negocio', 'Por qué tu negocio necesita una ficha de Google'),
        'serv': ('/servicios/sitios-web/', 'Conocer Web: páginas web para negocios'),
    },
    {
        'slug': 'importancia-ficha-google-negocio',
        'title': 'Por qué tu negocio necesita una ficha de Google',
        'desc': 'Por qué tu negocio necesita una ficha de Google: qué es, qué ven tus clientes en Google Maps y cómo empezar a tenerla completa y al día, paso a paso.',
        'cat': 'Visibilidad',
        'h1': 'Por qué tu negocio necesita una ficha de Google',
        'intro': 'Cuando alguien busca lo que ofreces cerca de donde está, lo primero que suele ver son fichas de negocios en Google Maps. Si la tuya no está o está incompleta, esa persona elige otra.',
        'cuerpo': '''<p>Piensa en la última vez que buscaste un lugar para comer, un dentista o una tienda cerca de ti. Es probable que no hayas abierto ninguna página web: viste el mapa, revisaste horarios, fotos y reseñas, y elegiste. Ese recuadro con la información del negocio es la ficha de Google, que Google llama Perfil de Negocio.</p>
<h2>Qué es una ficha de Google</h2>
<p>Es la información de tu negocio que aparece en Google y en Google Maps: nombre, categoría, dirección o zona donde atiendes, horario, teléfono, enlace a tu página o a WhatsApp, fotos, reseñas y publicaciones. Crearla y mantenerla no tiene costo.</p>
<h2>Por qué es tan importante</h2>
<ul class="check-list"><li><strong>Te encuentran quienes todavía no te conocen.</strong> Quien busca "taller mecánico cerca de mí" no sabe tu nombre. Sin ficha, no apareces en esa búsqueda.</li><li><strong>Responde las primeras dudas.</strong> Horario, cómo llegar y cómo contactarte, sin que la persona tenga que escribirte para preguntarlo.</li><li><strong>Da confianza.</strong> Las fotos reales y las reseñas de otros clientes ayudan a decidir. Una ficha sin fotos o con horario equivocado genera dudas.</li><li><strong>Lleva a la acción.</strong> Desde la ficha la persona puede llamarte, pedir indicaciones o ir a tu WhatsApp o tu página con un solo toque.</li><li><strong>Complementa la recomendación.</strong> Cuando alguien te recomienda, quien recibe la recomendación casi siempre te busca en Google antes de escribirte.</li></ul>
<h2>Cómo decide Google qué fichas mostrar</h2>
<p>Google explica que considera tres cosas: qué tan bien coincide tu ficha con lo que la persona busca, qué tan cerca estás y qué tan conocido es tu negocio, por ejemplo por sus reseñas. No puedes cambiar la distancia, pero sí puedes tener una ficha completa, con la categoría correcta y la información al día.</p>
<h2>Cómo empezar, paso a paso</h2>
<ol class="steps-list"><li><strong>Búscate en Google Maps.</strong> Tal vez ya existe una ficha de tu negocio creada por alguien más. Si existe, puedes solicitar que sea tuya.</li><li><strong>Crea o reclama tu ficha</strong> desde la página de Perfil de Negocio de Google, con una cuenta de Google a nombre del negocio.</li><li><strong>Verifícala.</strong> Google te pide confirmar que el negocio es tuyo; según el caso puede ser con un video, una llamada o un código.</li><li><strong>Elige bien la categoría principal.</strong> Es de lo que más pesa para aparecer en las búsquedas correctas.</li><li><strong>Completa todo:</strong> horario, zona de atención, teléfono, enlace a WhatsApp o a tu página, servicios y una descripción clara.</li><li><strong>Sube fotos reales</strong> de tu negocio, tus productos o tu trabajo, y agrégalas de vez en cuando.</li><li><strong>Pide reseñas</strong> a tus clientes contentos y respóndelas todas, también las negativas, con calma y respeto.</li><li><strong>Mantenla al día.</strong> Cambia el horario en días festivos y actualiza la información cuando algo cambie.</li></ol>
<h2>Errores comunes</h2>
<p>Usar una categoría que no corresponde, dejar un número que ya no contestas, tener el horario desactualizado o no responder reseñas. Son detalles que hacen que una persona interesada termine con otro negocio.</p>
<p>Si quieres saber cómo está tu ficha y qué le falta, el autodiagnóstico gratuito lo revisa contigo. En Foco Digital la revisamos y mejoramos como parte de Visibilidad y de Web, sin costo adicional.</p>''',
        'related': ('cuanto-cuesta-pagina-web-negocio', 'Cuánto cuesta una página web para un negocio en México'),
        'serv': ('/servicios/redes-sociales-google/', 'Conocer Visibilidad: redes sociales y ficha de Google'),
    },
]

for g in GUIAS:
    s = plantilla
    soup = BeautifulSoup(s, 'html.parser')
    url = f"{D}/blog/{g['slug']}/"
    full_title = f"{g['title']} | Foco Digital" if len(g['title']) <= 47 else g['title']
    soup.title.string = full_title
    soup.find('meta', attrs={'name': 'description'})['content'] = g['desc']
    soup.find('meta', property='og:title')['content'] = full_title
    soup.find('meta', property='og:description')['content'] = g['desc']
    soup.find('meta', property='og:url')['content'] = url
    soup.find('link', rel='canonical')['href'] = url
    hero = soup.select_one('.page-hero .wrap')
    hero.select_one('.breadcrumb').clear()
    hero.select_one('.breadcrumb').append(BeautifulSoup(f'<a href="/">Inicio</a> / <a href="/blog/">Guías prácticas</a> / {g["h1"]}', 'html.parser'))
    hero.select_one('.eyebrow').string = g['cat']
    hero.find('h1').string = g['h1']
    hero.find('p', class_=None).string = g['intro']
    art = soup.select_one('.wrap.article')
    nav = art.select_one('.article-nav')
    # borra el cuerpo anterior (entre la firma y la navegación)
    byline = art.select_one('.byline')
    for el in list(byline.find_next_siblings()):
        if el is nav or el.name == 'hr' or (el.name == 'a' and 'Volver' in el.get_text()):
            break
        el.decompose()
    body = BeautifulSoup(g['cuerpo'] + f'<p class="related">Sigue leyendo: <a href="/blog/{g["related"][0]}/">{g["related"][1]}</a>.</p>', 'html.parser')
    nav.insert_before(body)
    link = nav.find('a', class_='text-link')
    link['href'], link.string = g['serv']
    # datos estructurados
    sc = soup.find('script', type='application/ld+json')
    data = json.loads(sc.string)
    for n in data['@graph']:
        if n['@type'] == 'Article':
            n['headline'] = g['h1']; n['description'] = g['desc']; n['mainEntityOfPage'] = url
        if n['@type'] == 'BreadcrumbList':
            n['itemListElement'][-1]['name'] = g['h1']; n['itemListElement'][-1]['item'] = url
    sc.string = json.dumps(data, ensure_ascii=False)
    out = R / 'blog' / g['slug']
    out.mkdir(parents=True, exist_ok=True)
    (out / 'index.html').write_text(str(soup))
    print('creada', g['slug'], len(full_title), len(g['desc']))

# tarjetas en el índice de guías
p = R / 'blog/index.html'
s = p.read_text()
nuevas = ''.join(
    f'<article class="card blog-card" data-category="{g["cat"]}"><span class="category">{g["cat"]}</span><h3>{g["h1"]}</h3><p>{g["intro"]}</p><a class="text-link" href="/blog/{g["slug"]}/">Leer la guía</a></article>'
    for g in GUIAS)
i = s.index('<div class="cards">') + len('<div class="cards">')
s = s[:i] + nuevas + s[i:]
p.write_text(s)
# sitemap
sm = R / 'sitemap.xml'
t = sm.read_text()
for g in GUIAS:
    loc = f'{D}/blog/{g["slug"]}/'
    if loc not in t:
        t = t.replace('</urlset>', f'  <url><loc>{loc}</loc><lastmod>2026-11-24</lastmod></url>\n</urlset>')
sm.write_text(t)
