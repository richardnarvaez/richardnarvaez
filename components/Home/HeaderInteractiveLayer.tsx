"use client"

import HeaderOrbitScene from "./HeaderOrbitScene"
import HeaderOrbitToggle from "./HeaderOrbitToggle"
import type { HeaderOrbitTab } from "./HeaderOrbitTabs"

type HeaderInteractiveLayerProps = {
  activeTab: HeaderOrbitTab
  onToggle: () => void
  onTabSelect: (tab: HeaderOrbitTab) => void
  orbitVisible: boolean
  orbitTabsVisible: boolean
}

export default function HeaderInteractiveLayer({
  activeTab,
  onToggle,
  onTabSelect,
  orbitVisible,
  orbitTabsVisible,
}: HeaderInteractiveLayerProps) {
  return (
    <>
      <HeaderOrbitScene activeTab={activeTab} visible={orbitVisible} />
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
