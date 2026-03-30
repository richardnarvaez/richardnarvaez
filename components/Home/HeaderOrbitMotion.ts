import type { Transition, Variants } from "framer-motion"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

const orbitEase = [0.22, 0.61, 0.2, 1] as const
const orbitExitEase = [0.4, 0, 1, 1] as const
export const orbitNodesDelay = 0.62

export const orbitBackgroundTransition: Transition = {
  duration: 0.95,
  ease: orbitEase,
}

export const orbitBackgroundExitTransition: Transition = {
  duration: 0.45,
  ease: orbitExitEase,
}

export function getOrbitBackgroundRotation(tab: HeaderOrbitTab) {
  switch (tab) {
    case "Art":
      return 0
    case "Passport":
      return 20
    case "Dev":
    default:
      return -20
  }
}

export const orbitBackgroundVariants: Variants = {
  initial: {
    opacity: 0,
    rotate: -45,
    scale: 0.6,
  },
  animate: (rotation: number) => ({
    opacity: 1,
    rotate: rotation,
    scale: 1,
    transition: orbitBackgroundTransition,
  }),
  exit: {
    opacity: 0,
    rotate: -45,
    scale: 0.6,
    transition: orbitBackgroundExitTransition,
  },
}

export const orbitNodesContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: orbitNodesDelay,
      staggerChildren: 0.035,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.018,
      staggerDirection: -1,
    },
  },
}

export const orbitNodeVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 24,
      mass: 0.75,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.18,
      ease: orbitExitEase,
    },
  },
}

export const orbitCenterContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.82,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.32,
      delay: orbitNodesDelay + 0.18,
      ease: orbitEase,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.92,
    filter: "blur(10px)",
    transition: {
      duration: 0.16,
      ease: orbitExitEase,
    },
  },
}

export const orbitCenterContentSwitchVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.96,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.18,
      ease: orbitEase,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    filter: "blur(8px)",
    transition: {
      duration: 0.12,
      ease: orbitExitEase,
    },
  },
}
