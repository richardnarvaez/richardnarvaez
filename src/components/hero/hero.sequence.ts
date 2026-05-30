export type HeroSequenceStepId =
   | 'boot'
   | 'intro'
   | 'intro-hold'
   | 'collapse'
   | 'avatar-in'
   | 'cluster-expand'
   | 'meta-in'
   | 'handoff-to-dev'
   | 'passport'
   | 'footer'

export interface HeroSequenceStep {
   id: HeroSequenceStepId
   label: string
   description: string
}

export const heroSequenceSteps = [
   {
      id: 'boot',
      label: 'Boot',
      description: 'Background image and title fade in on first load.',
   },
   {
      id: 'intro',
      label: 'Intro',
      description: 'Orbit scene and origin bubbles reveal while the title stays visible.',
   },
   {
      id: 'intro-hold',
      label: 'Intro Hold',
      description: 'Keeps the first state readable before the hero collapses.',
   },
   {
      id: 'collapse',
      label: 'Collapse',
      description: 'Main title exits and all bubbles compress into the center with blur.',
   },
   {
      id: 'avatar-in',
      label: 'Avatar In',
      description: 'Avatar appears in the center immediately after the bubbles arrive.',
   },
   {
      id: 'cluster-expand',
      label: 'Cluster Expand',
      description: 'The same bubbles expand from the center into the second cluster layout.',
   },
   {
      id: 'meta-in',
      label: 'Meta In',
      description: 'Name and role appear below the avatar after the cluster settles.',
   },
   {
      id: 'handoff-to-dev',
      label: 'Handoff To Dev',
      description: 'The hero finishes the profile state before entering passport.',
   },
   {
      id: 'passport',
      label: 'Passport',
      description: 'The orbit resolves into a globe-focused travel state.',
   },
   {
      id: 'footer',
      label: 'Footer',
      description: 'The globe hands off into a centered closing signature state.',
   },
] as const satisfies readonly HeroSequenceStep[]

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
      targetNodesCompleteAt: 0.46,
      // Extra scroll distance after the last node appears.
      holdAfterNodesPx: 56,
      maxHoldAfterNodesProgress: 0.1,
      // Local spacing between intro completion and collapse.
      collapseHoldPx: 60,
      // Direct knob for the collapse marker.
      // Negative = earlier, positive = later.
      collapseTriggerOffsetPx: -200,
      // Scroll distance between collapse and expanded profile.
      expandHoldPx: 52,
      // Breathing room after passport trigger calculation.
      tailPx: 110,
   },
   collapse: {
      // Profile handoff:
      // title leaves -> orbit nodes compress -> avatar lands in center.
      titleFadeOutDuration: 0.2,
      nodeCollapseToCenterDuration: 0.2,
      centeredAvatarRevealDuration: 0.22,
   },
   expand: {
      // Profile composition:
      // avatar settles -> second-phase bubbles fan out -> meta fades in.
      avatarSettleDuration: 0.24,
      clusterBubbleRevealDelay: 0.1,
      clusterBubbleRevealDuration: 0.3,
      profileMetaRevealDelay: 0.25,
      profileMetaRevealDuration: 0.2,
   },
   passport: {
      // Scroll distance between profile and passport state.
      startGapPx: 600,
      // Passport entry animation.
      layerInDuration: 0.22,
      globeInDuration: 0.34,
      detailRevealDelay: 0.14,
      detailRevealDuration: 0.22,
   },
   footer: {
      // Scroll distance between passport and the final footer state.
      startGapPx: 460,
      layerInDuration: 0.22,
      contentInDuration: 0.34,
      tailPx: 180,
   },
} as const

export function getHeroSequenceRuntime(introDistance: number, nodeCount: number) {
   const { intro, passport, footer } = heroSequenceMotion
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
   const footerStartPx = passportStartPx + footer.startGapPx
   const introEndDistance = Math.max(
      introDistance,
      footerStartPx + footer.tailPx + intro.tailPx,
   )

   return {
      nodesCompleteAt,
      holdAfterNodes,
      titleOutStart,
      collapseStartPx,
      expandStartPx,
      passportStartPx,
      footerStartPx,
      introEndDistance,
   } as const
}
