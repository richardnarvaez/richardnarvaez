// Controlador de drawers inferiores (WorkDrawer): apertura y cierre con
// bloqueo de scroll, foco atrapado, Escape, y arrastre del asa para cerrar
// con el velo (solo filtro) despejándose a medias mientras baja el panel.
//
// Lo comparten la sección Work (casos y galería) y la sección Lab. Cada
// sección crea su controlador sobre su propia raíz y pasa callbacks para lo
// que le sea propio (clase en la pantalla del Mac, limpieza del hash).

export interface DrawerController {
  open(drawer: HTMLElement, from?: HTMLElement | null): void
  close(restoreFocus?: boolean): void
  /** Drawer abierto ahora mismo, si lo hay. */
  current(): HTMLElement | null
}

interface Options {
  onOpen?(drawer: HTMLElement): void
  onClose?(drawer: HTMLElement): void
}

const focusables = (el: HTMLElement) =>
  [...el.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((n) => !n.closest("[hidden]"))

export function initDrawers(root: HTMLElement, options: Options = {}): DrawerController {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
  const drawers = [...root.querySelectorAll<HTMLElement>("[data-drawer]")]
  let openDrawer: HTMLElement | null = null
  let opener: HTMLElement | null = null

  const open = (drawer: HTMLElement, from?: HTMLElement | null) => {
    if (openDrawer && openDrawer !== drawer) close(false)
    opener = from ?? (document.activeElement as HTMLElement | null)
    openDrawer = drawer
    drawer.hidden = false
    // Fuerza el layout con el panel abajo antes de animarlo hacia arriba.
    void drawer.offsetHeight
    drawer.classList.add("is-open")
    // La página no se desplaza mientras el drawer está abierto.
    document.documentElement.style.overflow = "hidden"
    drawer.querySelector<HTMLElement>("[data-drawer-body]")?.scrollTo({ top: 0 })
    drawer.querySelector<HTMLElement>("[data-drawer-close]:not(.drawer__scrim)")?.focus()
    options.onOpen?.(drawer)
  }

  const close = (restoreFocus = true) => {
    const drawer = openDrawer
    if (!drawer) return
    openDrawer = null
    drawer.classList.remove("is-open")
    document.documentElement.style.overflow = ""
    const done = () => {
      drawer.hidden = true
      drawer.querySelector<HTMLElement>("[data-drawer-panel]")!.style.translate = ""
      const scrim = drawer.querySelector<HTMLElement>(".drawer__scrim")!
      scrim.style.backdropFilter = ""
      scrim.style.removeProperty("-webkit-backdrop-filter")
    }
    if (reduced) done()
    else setTimeout(done, 480)
    if (restoreFocus) opener?.focus()
    options.onClose?.(drawer)
  }

  for (const drawer of drawers) {
    for (const btn of drawer.querySelectorAll("[data-drawer-close]")) btn.addEventListener("click", () => close())

    // Arrastrar el asa hacia abajo cierra; si no llega, vuelve a su sitio.
    const grip = drawer.querySelector<HTMLElement>("[data-drawer-grip]")!
    const panel = drawer.querySelector<HTMLElement>("[data-drawer-panel]")!
    const scrim = drawer.querySelector<HTMLElement>(".drawer__scrim")!
    let start: number | null = null
    let last = 0
    let lastT = 0
    let v = 0
    grip.addEventListener("pointerdown", (event) => {
      // El botón de cerrar vive dentro del asa: si el gesto empieza ahí, no
      // es un arrastre (capturar el puntero le robaría el clic).
      if ((event.target as HTMLElement).closest("[data-drawer-close]")) return
      start = event.clientY
      last = start
      lastT = performance.now()
      v = 0
      drawer.classList.add("is-dragging")
      try {
        grip.setPointerCapture(event.pointerId)
      } catch {
        /* sin captura seguimos igual */
      }
    })
    grip.addEventListener("pointermove", (event) => {
      if (start === null) return
      const dy = Math.max(0, event.clientY - start)
      const now = performance.now()
      v = (event.clientY - last) / Math.max(1, now - lastT)
      last = event.clientY
      lastT = now
      panel.style.translate = `0 ${dy}px`
      // El velo se despeja a medias en proporción a lo que ha bajado el panel: solo filtro, nunca opacidad.
      const t = Math.min(1, dy / panel.offsetHeight) * 0.5
      const filter = `blur(${(8 * (1 - t)).toFixed(2)}px) brightness(${(0.55 + 0.45 * t).toFixed(3)})`
      scrim.style.backdropFilter = filter
      scrim.style.setProperty("-webkit-backdrop-filter", filter)
    })
    const release = () => {
      if (start === null) return
      const dy = last - start
      start = null
      // Con las transiciones activas de nuevo, panel y scrim van de donde
      // estén a su destino (cerrado o abierto) en un solo movimiento.
      drawer.classList.remove("is-dragging")
      void drawer.offsetHeight
      if (dy > 120 || v > 0.6) close()
      panel.style.translate = ""
      scrim.style.backdropFilter = ""
      scrim.style.removeProperty("-webkit-backdrop-filter")
    }
    grip.addEventListener("pointerup", release)
    grip.addEventListener("pointercancel", release)
  }

  root.addEventListener("keydown", (event) => {
    if (!openDrawer) return
    if (event.key === "Escape") {
      event.preventDefault()
      close()
      return
    }
    if (event.key === "Tab") {
      const nodes = focusables(openDrawer)
      if (!nodes.length) return
      const first = nodes[0]
      const lastNode = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        lastNode.focus()
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault()
        first.focus()
      }
    }
  })

  return { open, close, current: () => openDrawer }
}
