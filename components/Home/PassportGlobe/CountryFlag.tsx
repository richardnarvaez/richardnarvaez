import { Flag } from "@/components/Icons/flags"
import FlagUnknown from "@/components/Icons/flags/unknown"

export function CountryFlag({ code }: { code: string }) {
  const FlagComponent = Flag[code as keyof typeof Flag] || FlagUnknown

  return <FlagComponent className="size-8" />
}
