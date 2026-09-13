// Bottom drawer controller (WorkDrawer): open and close with scroll lock,
// focus trap, Escape, and a grip drag that clears the scrim as the panel drops.
// 
// Shared by the Work section (cases and gallery) and the Lab section. Each one
// builds its controller on its own root and passes callbacks for what is theirs.

export interface DrawerController {
  open(drawer: HTMLElement, from?: HTMLElement | null): void
  close(restoreFocus?: boolean): void
  /** The drawer open right now, if any. */
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
    // Forces layout with the panel down before animating it up.
    void drawer.offsetHeight
    drawer.classList.add("is-open")
    // The page does not scroll while a drawer is open.
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

    // Dragging the grip down closes; short of that it snaps back.
    const grip = drawer.querySelector<HTMLElement>("[data-drawer-grip]")!
    const panel = drawer.querySelector<HTMLElement>("[data-drawer-panel]")!
    const scrim = drawer.querySelector<HTMLElement>(".drawer__scrim")!
    let start: number | null = null
    let last = 0
    let lastT = 0
    let v = 0
    grip.addEventListener("pointerdown", (event) => {
      // The close button lives inside the grip: a gesture starting there is not a
      // drag, and capturing the pointer would kill the click.
      if ((event.target as HTMLElement).closest("[data-drawer-close]")) return
      start = event.clientY
      last = start
      lastT = performance.now()
      v = 0
      drawer.classList.add("is-dragging")
      try {
        grip.setPointerCapture(event.pointerId)
      } catch {
        /* fine without capture */
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
      // The scrim clears in proportion to how far the panel dropped: filter only.
      const t = Math.min(1, dy / panel.offsetHeight) * 0.5
      const filter = `blur(${(8 * (1 - t)).toFixed(2)}px) brightness(${(0.55 + 0.45 * t).toFixed(3)})`
      scrim.style.backdropFilter = filter
      scrim.style.setProperty("-webkit-backdrop-filter", filter)
    })
    const release = () => {
      if (start === null) return
      const dy = last - start
      start = null
      // With transitions back on, panel and scrim travel to their destination.
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
