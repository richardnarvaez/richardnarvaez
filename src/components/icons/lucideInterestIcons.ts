const createLucideSvg = (inner: string) =>
  [
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">',
    inner,
    "</svg>",
  ].join("")

export const lucideInterestIcons = {
  photography: createLucideSvg(
    '<path d="M4 8.5h3.2l1.7-2.2h6.2l1.7 2.2H20a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.5a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="3.2"/>'
  ),
  illustration: createLucideSvg(
    '<path d="m14.7 4.6 4.7 4.7"/><path d="M5 19c2.2-.2 3.8-.8 5.1-2.2l8.5-8.5a2.3 2.3 0 1 0-3.2-3.2l-8.5 8.5C5.6 14.9 5.2 16.5 5 19Z"/><path d="m10.4 9.6 4 4"/>'
  ),
  experiments: createLucideSvg(
    '<path d="M12 3v4"/><path d="m8.5 5.5 1.3 1.3"/><path d="m15.5 5.5-1.3 1.3"/><path d="M7 11h3l2-3 2 3h3"/><path d="M9 11v4.2a3 3 0 0 0 6 0V11"/>'
  ),
  apps: createLucideSvg(
    '<rect x="4" y="4" width="6" height="6" rx="1.3"/><rect x="14" y="4" width="6" height="6" rx="1.3"/><rect x="4" y="14" width="6" height="6" rx="1.3"/><rect x="14" y="14" width="6" height="6" rx="1.3"/>'
  ),
  travel: createLucideSvg(
    '<path d="m3 11 18-8-8 18-2.8-7.2Z"/><path d="M11 14 21 3"/>'
  ),
  development: createLucideSvg(
    '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 4-4 16"/>'
  ),
  writing: createLucideSvg(
    '<path d="M14 3H6a2 2 0 0 0-2 2v14l4-2 4 2 4-2 4 2V9Z"/><path d="M14 3v6h6"/><path d="M8 11h4"/><path d="M8 15h7"/>'
  ),
  routes: createLucideSvg(
    '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z"/><path d="M9 4v13.5"/><path d="M15 6.5V20"/>'
  ),
  video: createLucideSvg(
    '<rect x="3" y="7" width="13" height="10" rx="2"/><path d="m16 10 5-3v10l-5-3"/>'
  ),
} as const

