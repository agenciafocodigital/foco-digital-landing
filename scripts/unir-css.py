"""Une las hojas de css/ (en orden por nombre) en site/assets/estilos.css, sin comentarios ni espacios de más.
Uso: python3 scripts/unir-css.py  (y subir el estilos.css generado)."""
import pathlib,re
raiz=pathlib.Path(__file__).resolve().parent.parent
partes=[p.read_text() for p in sorted((raiz/'css').glob('*.css'))]
css='\n'.join(partes)
css=re.sub(r'/\*.*?\*/','',css,flags=re.S)
css=re.sub(r'\s+',' ',css)
css=re.sub(r'\s*([{};,>])\s*',r'\1',css).replace(';}','}')
(raiz/'site/assets/estilos.css').write_text(css.strip()+'\n')
print(len(css),'bytes')
