export const heroSequenceMotion = {
   intro: {
      // All timing values below are fractions of the intro timeline,
      // mapped over `revealDistancePx` of scroll.
      // Intro scrub:
      // 1. Orbit scaffold fades in
      // 2. App/logo nodes appear
      // 3. Nodes stay readable for a short beat
      orbitSceneInAt: 0.0,
      orbitSceneInDuration: 0.12,
      orbitGraphicInAt: 0.0,
      orbitGraphicInDuration: 0.14,

      nodeInStart: 0.04,
      nodeInDuration: 0.06,
      nodeInStagger: 0.012,

      // Fraction of the intro scrub where node reveal should feel complete.
      targetNodesCompleteAt: 0.24,

      // Scroll distance (px) the intro reveal occupies. Fixed so the reveal
      // pace is independent of the spacer height: ~720px is roughly one
      // viewport of scrolling (the original pre-bento feel).
      revealDistancePx: 720,
      // Scroll distance between collapse and expanded profile.
      expandHoldPx: 360,
      // Breathing room after the profile hold.
      tailPx: 110,
   },
   passport: {
      // Scroll distance the profile holds before the pin releases into the bento.
      startGapPx: 280,
   },
} as const

export function getHeroSequenceRuntime() {
   const { intro, passport } = heroSequenceMotion
   const collapseStartPx = intro.revealDistancePx
   const expandStartPx = collapseStartPx + intro.expandHoldPx
   const passportStartPx = expandStartPx + passport.startGapPx

   return {
      collapseStartPx,
      expandStartPx,
      passportStartPx,
   } as const
}
