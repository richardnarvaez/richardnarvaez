"use client"

import HeaderOrbitScene from "./HeaderOrbitScene"
import HeaderOrbitToggle from "./HeaderOrbitToggle"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

type HeaderInteractiveLayerProps = {
  activeTab: HeaderOrbitTab
  onOrbitExitComplete: () => void
  onToggle: () => void
  onTabSelect: (tab: HeaderOrbitTab) => void
  orbitVisible: boolean
  orbitTabsVisible: boolean
}

export default function HeaderInteractiveLayer({
  activeTab,
  onOrbitExitComplete,
  onToggle,
  onTabSelect,
  orbitVisible,
  orbitTabsVisible,
}: HeaderInteractiveLayerProps) {
  return (
    <>
      <HeaderOrbitScene
        activeTab={activeTab}
        visible={orbitVisible}
        onExitComplete={onOrbitExitComplete}
      />
      <HeaderOrbitToggle
        activeTab={activeTab}
        tabsVisible={orbitTabsVisible}
        visible={orbitVisible}
        onTabSelect={onTabSelect}
        onToggle={onToggle}
      />
    </>
  )
}
