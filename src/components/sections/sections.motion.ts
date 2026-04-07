import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function initSectionsMotion() {
  const sections = document.querySelectorAll<HTMLElement>("[data-section-motion]")

  for (const section of sections) {
    if (section.dataset.motionBound === "true") continue
    section.dataset.motionBound = "true"
    const overlapsHero = section.dataset.sectionOverlap === "hero"

    const reveals = Array.from(
      section.querySelectorAll<HTMLElement>("[data-section-reveal]")
    )

    if (reveals.length > 0) {
      gsap.set(reveals, {
        autoAlpha: 0,
        y: 72,
        scale: 0.98,
        filter: "blur(18px)",
      })

      const enterTimeline = gsap.timeline({
        defaults: {
          ease: "none",
          overwrite: "auto",
        },
        scrollTrigger: {
          trigger: section,
          start: overlapsHero ? "top bottom" : "top 88%",
          end: overlapsHero ? "top 48%" : "top 42%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      enterTimeline.to(reveals, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 1,
      })

      const exitTimeline = gsap.timeline({
        defaults: {
          ease: "none",
          overwrite: "auto",
        },
        scrollTrigger: {
          trigger: section,
          start: overlapsHero ? "bottom 82%" : "bottom 78%",
          end: overlapsHero ? "bottom 34%" : "bottom 28%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      exitTimeline.to(reveals, {
        autoAlpha: 0.18,
        y: -56,
        scale: 0.985,
        filter: "blur(16px)",
        stagger: 0.05,
        duration: 1,
        immediateRender: false,
      })
    }

    const artTrack = section.querySelector<HTMLElement>("[data-art-track]")
    const artTrackViewport = section.querySelector<HTMLElement>(
      "[data-art-track-viewport]"
    )

    if (artTrack && artTrackViewport) {
      gsap.fromTo(
        artTrack,
        {
          x: 0,
        },
        {
          x: () => {
            const maxTravel = Math.max(
              artTrack.scrollWidth - artTrackViewport.clientWidth,
              0
            )
            return -maxTravel
          },
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    }
  }
}
