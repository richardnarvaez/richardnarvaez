export default function HeaderBottomFade() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[20vh] bg-gradient-to-t from-[hsl(244,31%,10%)] via-[hsl(244,31%,10%)]/50 to-transparent"
    />
  )
}
