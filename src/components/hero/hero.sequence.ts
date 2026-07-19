export const heroSequenceMotion = {
   intro: {
      // All timing values below are in seconds.
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
      // Extra scroll distance after the last node appears.
      holdAfterNodesPx: 28,
      maxHoldAfterNodesProgress: 0.05,
      // Local spacing between intro completion and collapse.
      collapseHoldPx: 30,
      // Direct knob for the collapse marker.
      // Negative = earlier, positive = later.
      collapseTriggerOffsetPx: -260,
      // Scroll distance between collapse and expanded profile.
      expandHoldPx: 360,
      // Breathing room after passport trigger calculation.
      tailPx: 110,
   },
   passport: {
      // Scroll distance between profile and the footer trigger.
      startGapPx: 600,
   },
   footer: {
      tailPx: 180,
      // Final scroll where the signature stays visible while the orbit keeps rotating.
      orbitTailPx: 350,
      orbitTailRotation: 24,
   },
} as const

export function getHeroSequenceRuntime(introDistance: number, nodeCount: number) {
   const { intro, passport } = heroSequenceMotion
   const nodesCompleteAt =
      intro.nodeInStart + intro.nodeInDuration + Math.max(nodeCount - 1, 0) * intro.nodeInStagger
   const holdAfterNodesCompensation = Math.max(intro.targetNodesCompleteAt - nodesCompleteAt, 0)
   const holdAfterNodes =
      holdAfterNodesCompensation +
      Math.min(intro.holdAfterNodesPx / introDistance, intro.maxHoldAfterNodesProgress)
   const titleOutStart = nodesCompleteAt + holdAfterNodes
   const collapseStartPx =
      Math.round(introDistance * titleOutStart) +
      intro.collapseHoldPx +
      intro.collapseTriggerOffsetPx
   const expandStartPx = collapseStartPx + intro.expandHoldPx
   const passportStartPx = expandStartPx + passport.startGapPx

   return {
      collapseStartPx,
      expandStartPx,
      passportStartPx,
   } as const
}
