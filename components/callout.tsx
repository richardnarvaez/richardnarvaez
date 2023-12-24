import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: "default" | "warning" | "danger" | "white"
}

export function Callout({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 flex items-start rounded-md border border-l-4 ",
        {
          "border-red-900 bg-red-50": type === "danger",
          "border-yellow-900 bg-yellow-50": type === "warning",
          "bg-white p-4 text-black": type === "white",
        }
      )}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
