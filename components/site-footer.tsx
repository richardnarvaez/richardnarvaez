import * as React from "react"

import { cn } from "@/lib/utils"
import { LogoDarkPixl, SelloDarkPixl } from "./Footer/SelloDarkpixl"
import { Flag } from "./Icons/flags"
import { FigmaIcon } from "lucide-react"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="flex items-center justify-center">
        <div className="relative flex">
          <SelloDarkPixl className="animate-spin-slow" />
          <LogoDarkPixl />
        </div>
      </div>

      <div className="mb-32 mt-8 flex flex-col items-center justify-center gap-2.5">
        <div className="flex h-9 w-64 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-gradient-to-b from-transparent to-black/20 text-xs font-medium text-neutral-100 text-opacity-80 shadow">
          <p>{"Cooked with love in "}</p>
          <Flag.EC className="w-4" />
          {"with"}
          <FigmaIcon className="h-4" />
          {"&"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            className="h-4"
          >
            <title>NextJS</title>
            <path
              d="M9.33854 0.0048394C9.29987 0.0083546 9.17683 0.0206581 9.0661 0.0294463C6.51225 0.259697 4.1201 1.63769 2.60501 3.75565C1.76135 4.93327 1.22175 6.26907 1.01786 7.68397C0.9458 8.17787 0.937012 8.32376 0.937012 8.99342C0.937012 9.66308 0.9458 9.80896 1.01786 10.3029C1.50649 13.6793 3.90918 16.5161 7.16785 17.5672C7.75139 17.7553 8.36656 17.8836 9.0661 17.9609C9.33854 17.9908 10.5162 17.9908 10.7886 17.9609C11.9961 17.8273 13.0191 17.5285 14.028 17.0135C14.1826 16.9344 14.2125 16.9133 14.1914 16.8958C14.1774 16.8852 13.5182 16.0011 12.7273 14.9325L11.2895 12.9903L9.48794 10.324C8.49663 8.85808 7.68108 7.65937 7.67405 7.65937C7.66702 7.65761 7.65999 8.84226 7.65647 10.2888C7.6512 12.8216 7.64944 12.9235 7.61781 12.9833C7.57211 13.0694 7.53695 13.1045 7.46313 13.1432C7.40689 13.1713 7.35768 13.1766 7.09227 13.1766H6.7882L6.70735 13.1256C6.65462 13.0922 6.61595 13.0483 6.58959 12.9973L6.55268 12.9182L6.55619 9.39416L6.56146 5.86833L6.61595 5.79978C6.64407 5.76287 6.70383 5.71542 6.74602 5.69257C6.81808 5.65741 6.8462 5.6539 7.15027 5.6539C7.50883 5.6539 7.56859 5.66796 7.66175 5.7699C7.68811 5.79802 8.6636 7.26741 9.83068 9.03736C10.9978 10.8073 12.5937 13.2241 13.3776 14.4105L14.8013 16.5671L14.8734 16.5196C15.5114 16.1048 16.1863 15.5143 16.7207 14.8991C17.8579 13.5932 18.5908 12.0007 18.8369 10.3029C18.9089 9.80896 18.9177 9.66308 18.9177 8.99342C18.9177 8.32376 18.9089 8.17787 18.8369 7.68397C18.3482 4.30755 15.9455 1.47071 12.6869 0.419642C12.1121 0.233332 11.5005 0.105025 10.8149 0.0276887C10.6462 0.0101123 9.48442 -0.00922178 9.33854 0.0048394ZM13.0191 5.44298C13.1034 5.48516 13.172 5.56602 13.1966 5.65038C13.2106 5.69608 13.2142 6.67333 13.2106 8.87565L13.2054 12.0359L12.6482 11.1817L12.0893 10.3275V8.03023C12.0893 6.54502 12.0963 5.71014 12.1069 5.66972C12.135 5.57129 12.1965 5.49395 12.2809 5.44825C12.3529 5.41134 12.3793 5.40783 12.6552 5.40783C12.9154 5.40783 12.9611 5.41134 13.0191 5.44298Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="mt-3 text-xs font-medium leading-none text-white text-opacity-30">
          © richard vinueza - 2024
        </div>
      </div>
    </footer>
  )
}
