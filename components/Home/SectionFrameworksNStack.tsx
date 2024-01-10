import Image from "next/image"
import { AWSIcon } from "../Icons/IconsBusiness"

export default function SectionFrameworksNStak() {
  return (
    <section
      id="stack"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Frameworks & Tech
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          These are the tools and frameworks with which I feel more comfortable
          without limiting myself to them because I have worked with Angular,
          MySql, Laravel, C++ and many more... My main stack is:
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Next.js</h3>
              <p className="text-sm text-muted-foreground">
                App dir, Routing, Layouts, Loading UI and API routes.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <AWSIcon />
            <div className="space-y-2">
              <h3 className="font-bold">Servers and Deploy</h3>
              <p className="text-sm text-muted-foreground">
                AWS, GCP, Vercel, RailWay
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg
              version="1.0"
              className="h-12 w-12 fill-current"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g clipPath="url(#clip0_121_3668)">
                <path d="M7.14132 0.190091L6.94971 0.380183L6.97526 4.09964C7.0008 8.19928 6.99442 8.10424 7.44152 9.4729C8.45709 12.5587 11.1333 15.0489 14.3269 15.8726C15.2148 16.1008 15.8407 16.1641 17.5078 16.2085L19.0279 16.2528L19.2259 16.4556C19.392 16.6203 19.4367 16.7154 19.4559 16.9942C19.4878 17.4061 19.3281 17.7039 18.996 17.8433C18.6191 17.9953 15.6619 17.951 14.8954 17.7736C14.7996 17.7546 14.7038 17.7862 14.6144 17.8749C14.4866 18.0017 14.4802 18.0397 14.5058 20.1054C14.5313 22.1393 14.5377 22.2217 14.6846 22.5892C14.889 23.1088 15.4128 23.6284 15.9174 23.8185C16.6647 24.0909 18.3892 24.0529 19.5134 23.7298C21.3976 23.1848 22.9497 21.7401 23.6267 19.9089C24.0163 18.8507 24.0163 18.7937 23.9908 13.5789C23.9716 8.94064 23.9652 8.82658 23.8247 8.20562C23.3393 6.05125 22.3557 4.29607 20.81 2.81969C19.2515 1.33698 17.3609 0.418201 15.2275 0.0950456C14.7166 0.019009 13.8607 -1.99871e-07 10.9609 -1.99871e-07H7.32655L7.14132 0.190091ZM18.5872 10.1446C19.1301 10.3093 19.5325 10.8416 19.5389 11.4118C19.5389 11.811 19.2834 12.2926 18.9513 12.5207C18.715 12.6854 18.6319 12.7045 18.1976 12.7045C17.7633 12.7045 17.6802 12.6854 17.4439 12.5207C16.9138 12.1595 16.7158 11.4182 16.9904 10.8542C17.2842 10.2523 17.9485 9.9608 18.5872 10.1446Z" />
                <path d="M1.29049 1.30541C0.926416 1.43847 0.447375 1.87568 0.217436 2.29389L0.0258192 2.62971L0.00665759 8.64928C-0.012504 15.1504 -0.012504 15.2328 0.326018 16.2846C1.05416 18.5657 2.87452 20.4033 5.15475 21.1636C6.132 21.4868 6.65575 21.5438 8.68688 21.5438C10.9032 21.5438 11.0182 21.5185 11.6633 20.8785C12.2446 20.3019 12.3212 20.0041 12.3212 18.382C12.3212 17.6976 12.2957 17.1084 12.2701 17.0703C12.2446 17.0323 11.8805 16.8232 11.4589 16.6078C11.0374 16.3923 10.4178 16.0248 10.0857 15.7904C9.30005 15.2455 7.88209 13.8388 7.32002 13.0531C6.56633 11.9886 5.85096 10.4425 5.52521 9.15619C5.2314 8.00931 5.21224 7.7305 5.17391 4.65736L5.13559 1.67926L4.8801 1.59688C3.89008 1.26106 1.84617 1.09631 1.29049 1.30541Z" />
              </g>
              <defs>
                <clipPath id="clip0_121_3668">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Database</h3>
              <p className="text-sm text-muted-foreground">
                ORM Prisma and Postgresql
              </p>
            </div>
          </div>
        </div>
        <div className="z-20overflow-hidden  relative z-20 rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Components</h3>
              <p className="text-sm text-muted-foreground">
                UI components built using Radix UI and styled with Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
        <div className="relative z-20  overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-12 w-12 fill-current"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Authentication using NextAuth.js and middlewares.
              </p>
            </div>
          </div>
        </div>
        <div className="relative z-20  overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold">Subscriptions</h3>
              <p className="text-sm text-muted-foreground">
                Free and paid subscriptions using Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex justify-center text-center md:max-w-[58rem]">
        <Image
          width={920}
          height={128}
          className="z-10  md:max-w-lg "
          src={"/images/DockUsedApps.png"}
          alt="Dock Used Apps"
        />
      </div>
      <div className="relative mx-auto flex justify-center text-center md:max-w-[58rem]">
        <Image
          width={667}
          height={295}
          quality={100}
          className="absolute -top-10 -z-10 w-full sm:-top-24 md:-top-32"
          src={"/images/teclado-mac.jpg"}
          alt="Teclado MacBook"
        />
      </div>
    </section>
  )
}
