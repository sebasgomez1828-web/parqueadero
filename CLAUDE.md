# Parqueadero Amazonas (Parqueadero Público)

App de control de parqueadero para Ecuador. Es una PWA de un solo archivo: `index.html` (HTML + CSS + JS, sin frameworks ni build). Se instala en el iPhone desde Safari → Compartir → Agregar a inicio.

## Reglas para trabajar en este proyecto
- NO crear otra app ni cambiar el diseño (azul marino #0a1b3a/#0b2552, amarillo #f6b500, blanco; fondo de asfalto con líneas).
- NO borrar registros: anular marca `anulado:true` y el registro queda en el historial.
- Antes de tocar tarifas, correr `node tests_tarifas.js` y que dé 0 fallas.
- Montos siempre en centavos enteros (`cents()`), mostrados con dos decimales y coma (`usd()`).

## Tarifa definitiva (editable en "Configuración de tarifas")
Modo `hora` para los tres tipos:
| Tiempo | Moto | Auto | Camioneta/camión |
|---|---|---|---|
| 0–30 min | 0,50 | 0,50 | 0,50 |
| 31 min–1 h | 0,75 | 1,00 | 1,25 |
Después de cada hora cumplida, los siguientes 15 min no suben; luego +0,25 por cada bloque de 15 min (3 bloques por hora).
Auto: 1h 1,00 · 1h15 1,00 · 1h16 1,25 · 1h31 1,50 · 1h46 1,75 · 2h 1,75 · 2h15 1,75 · 2h16 2,00.
Minutos completos (los segundos no adelantan el bloque). Función: `calc(v, fin)`.

## Funciones
- Entrada: placa (5–8 letras/números; moto se detecta si empieza con 2 letras), tipo, hora editable, nota.
- Adentro: más nuevos arriba; cada fila "PLACA — TIPO / Ingreso / Tiempo / Total pendiente / COBRAR $X", se actualiza cada 10 s.
- Cobro: ventana de confirmación (placa, tipo, ingreso, salida, tiempo, total, efectivo/transferencia, vuelto). Sin cobros dobles (`yaCobrado`, `cobrados`, botón bloqueado).
- Historial/Caja: filtros desde/hasta, placa, método; totales efectivo/transferencia; exportar CSV (Excel) y PDF (jsPDF desde cdnjs); anular y "sigue adentro" solo para cobros del día.

## Datos
- Fuera de Claude: `localStorage` clave `pqa-v2` (un solo dispositivo).
- Dentro de Claude (claude.ai artifact) usa su base `db`: `config/tarifas`, `activos/{id}`, `dias/{yyyy-mm-dd}` = `{salidas:[...]}`.
- Para varios celulares: conectar Firebase/Supabase en el objeto `api` y en `iniciar()` con las mismas rutas.

## Próximos pasos sugeridos
1. Publicar en GitHub Pages / Netlify y abrir el enlace en Safari del iPhone → Agregar a inicio.
2. Sincronización en la nube (Firebase) con login.
3. App nativa con Capacitor (requiere Xcode y cuenta Apple Developer).
