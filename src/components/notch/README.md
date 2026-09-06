# Pet del notch (el cocodrilo)

Código **conservado pero no montado**. Ninguna página importa `NotchPet.astro`,
así que no llega al bundle: Astro solo compila lo que se referencia.

## Qué es

Una barra tipo notch de iPhone con una mascota de píxeles animada. Se le puede
dar de comer (3 veces) y reacciona con corazones y tonos retro de 8 bits.

## Archivos

| Archivo | Contenido |
|---|---|
| `NotchPet.astro` | Markup + CSS + el script que lo arranca |
| `notch.motion.ts` | Lógica: máquina de estados, expansión, comida, intro |
| `notch.sprites.ts` | Datos puros: fotogramas de cada animación y geometría |
| `notch.audio.ts` | Tonos retro con WebAudio |

## Cómo revivirlo

```astro
---
import NotchPet from "../components/notch/NotchPet.astro"
---
<NotchPet />
```

El módulo es autocontenido: su única dependencia externa es `gsap`.

## Notas

- Los enlaces sociales que vivían aquí se retiraron. El panel desplegable se
  conserva porque es el mecanismo que revela el rail de comida, pero ahora solo
  muestra la versión. Al revivirlo, ese hueco es el sitio natural para contenido
  nuevo.
- `initNotchPet()` es idempotente y `destroyNotchPet()` libera listeners,
  timers, tweens y el `AudioContext`.
