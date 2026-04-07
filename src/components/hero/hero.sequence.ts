export type HeroSequenceStepId =
   | 'boot'
   | 'intro'
   | 'intro-hold'
   | 'collapse'
   | 'avatar-in'
   | 'cluster-expand'
   | 'meta-in'
   | 'handoff-to-dev'

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
      description: 'The hero finishes and yields to the next section.',
   },
] as const satisfies readonly HeroSequenceStep[]

export const heroSequenceMotion = {
   intro: {
      //Orbita
      orbitSceneInAt: 0.0,
      orbitSceneInDuration: 0.12,
      orbitGraphicInAt: 0.0,
      orbitGraphicInDuration: 0.14,

      //Nodos
      nodeInStart: 0.1,
      nodeInDuration: 0.08,
      nodeInStagger: 0.02,

      targetNodesCompleteAt: 0.78,
      holdAfterNodesPx: 100,
      maxHoldAfterNodesProgress: 0.18,
      collapseHoldPx: 200,
      expandHoldPx: 70,
      tailPx: 40,
   },
   collapse: {
      titleOutDuration: 0.2,
      nodesToCenterDuration: 0.2,
      avatarInDuration: 0.22,
   },
   expand: {
      avatarSettleDuration: 0.24,
      bubbleInDelay: 0.1,
      bubbleInDuration: 0.3,
      metaInDelay: 0.25,
      metaInDuration: 0.2,
   },
} as const

export function getHeroSequenceRuntime(introDistance: number, nodeCount: number) {
   const { intro } = heroSequenceMotion
   const nodesCompleteAt =
      intro.nodeInStart + intro.nodeInDuration + Math.max(nodeCount - 1, 0) * intro.nodeInStagger
   const holdAfterNodesCompensation = Math.max(intro.targetNodesCompleteAt - nodesCompleteAt, 0)
   const holdAfterNodes =
      holdAfterNodesCompensation +
      Math.min(intro.holdAfterNodesPx / introDistance, intro.maxHoldAfterNodesProgress)
   const titleOutStart = nodesCompleteAt + holdAfterNodes
   const collapseStartPx = Math.round(introDistance * titleOutStart) + intro.collapseHoldPx
   const expandStartPx = collapseStartPx + intro.expandHoldPx
   const introEndDistance = Math.max(introDistance, collapseStartPx - intro.tailPx)

   return {
      nodesCompleteAt,
      holdAfterNodes,
      titleOutStart,
      collapseStartPx,
      expandStartPx,
      introEndDistance,
   } as const
}
