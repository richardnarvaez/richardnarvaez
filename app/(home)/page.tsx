import Link from "next/link"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"
import { ExternalLinkIcon } from "lucide-react"
import ArrowFigma from "@/components/Icons/ArrowFigma"

import { Barlow } from "next/font/google"
import {
  GoogleIcon,
  HackerRankIcon,
  HarvardIcon,
} from "@/components/Icons/IconsBusiness"

// If loading a variable font, you don't need to specify the font weight
const barlow = Barlow({ subsets: ["latin"], weight: ["600"] })

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/shadcn/taxonomy",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const getColorOfStatus = {
    building: "bg-amber-500 text-amber-800",
    live: "bg-green-500 text-green-800",
    dead: "bg-red-500 text-red-800",
    "open source" : "bg-gray-500 text-gray-800",
    proposal: "bg-blue-500 text-blue-800"
  }
  return (
    <>
      <p className="fixed z-50 m-6 rounded-full bg-red-500 px-6 py-2 text-xs font-semibold text-white">
        In Dev
      </p>
      <section className="container flex h-screen max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
        <div className="z-10  w-full max-w-5xl">
          <div className="relative z-20 flex w-full flex-col  items-center justify-center gap-4">
            {/* Profile Photo */}
            {/* <Image
                src="/images/Perfil.jpg"
                alt="Vercel Logo"
                className="aspect-square rounded-3xl border-4 border-white bg-white"
                width={100}
                height={100}
                priority
              /> */}
            <Image
              src="/images/aws_icon.png"
              alt="Blur"
              className="absolute -right-20 bottom-32 z-0 w-24 md:bottom-32 md:right-16 "
              width={120}
              height={120}
            />
            <Image
              src="/images/next_icon.png"
              alt="Blur"
              className="absolute -left-32 bottom-32 z-0 w-32 md:bottom-32 md:left-0 "
              width={120}
              height={120}
            />
            <Image
              src="/images/vercel_icon.png"
              alt="Blur"
              className="absolute -left-8 top-16 z-0 w-16 md:left-32 md:top-16 "
              width={120}
              height={120}
            />
            <Image
              src="/images/figma_icon.png"
              alt="Blur"
              className="absolute -right-20 top-16 z-0 w-24 md:right-0 md:top-16 "
              width={120}
              height={120}
            />
            <h2 className="relative rounded-md bg-gray-50 px-4 py-2 text-center font-semibold text-black">
              <ArrowFigma className="absolute -left-8 -top-6" />
              <span>Richard Vinueza</span>
            </h2>

            <h1
              className={
                barlow.className +
                " z-10 flex max-w-3xl flex-col text-center text-6xl  font-extrabold  md:text-8xl "
              }
            >
              <span>CREATIVE</span> <span>DEVELOPER</span> <span>SINCE</span>
              <span className="text-[#FF512F]">2014</span>
            </h1>
            {/* SOFTWARE ENGINEER */}
            <h3 className="flex flex-col text-center text-lg">
              Over the last 5 years, I&apos;ve empowered 9+ companies
              <span className="hidden max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 md:block">
                Developing user-centric interfaces that captivate and engage
                audiences and make a real impact.
              </span>
            </h3>
            <div className="mt-8 flex gap-4">
              <a
                className="rounded-lg p-2 hover:bg-white/25"
                href="https://www.linkedin.com/in/richardvnarvaez"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-288.985,423.278l0,-225.717l-75.04,0l0,225.717l75.04,0Zm270.539,0l0,-129.439c0,-69.333 -37.018,-101.586 -86.381,-101.586c-39.804,0 -57.634,21.891 -67.617,37.266l0,-31.958l-75.021,0c0.995,21.181 0,225.717 0,225.717l75.02,0l0,-126.056c0,-6.748 0.486,-13.492 2.474,-18.315c5.414,-13.475 17.767,-27.434 38.494,-27.434c27.135,0 38.007,20.707 38.007,51.037l0,120.768l75.024,0Zm-307.552,-334.556c-25.674,0 -42.448,16.879 -42.448,39.002c0,21.658 16.264,39.002 41.455,39.002l0.484,0c26.165,0 42.452,-17.344 42.452,-39.002c-0.485,-22.092 -16.241,-38.954 -41.943,-39.002Z" />
                </svg>
              </a>
              <a
                className="rounded-lg p-2 hover:bg-white/25"
                href="https://twitter.com/richardvnarvaez"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <rect
                    height="400"
                    style={{ fill: "none" }}
                    width="400"
                    x="56"
                    y="56"
                  />
                  <path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" />
                </svg>
              </a>
              <a
                className="rounded-lg p-2 hover:bg-white/25"
                href="https://github.com/richardnarvaez"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  height="24px"
                  width="24px"
                  version="1.1"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <g>
                    <path
                      clip-rule="evenodd"
                      d="M296.133,354.174c49.885-5.891,102.942-24.029,102.942-110.192   c0-24.49-8.624-44.448-22.67-59.869c2.266-5.89,9.515-28.114-2.734-58.947c0,0-18.139-5.898-60.759,22.669   c-18.139-4.983-38.09-8.163-56.682-8.163c-19.053,0-39.011,3.18-56.697,8.163c-43.082-28.567-61.22-22.669-61.22-22.669   c-12.241,30.833-4.983,53.057-2.718,58.947c-14.061,15.42-22.677,35.379-22.677,59.869c0,86.163,53.057,104.301,102.942,110.192   c-6.344,5.452-12.241,15.873-14.507,30.387c-12.702,5.438-45.808,15.873-65.758-18.592c0,0-11.795-21.31-34.012-22.669   c0,0-22.224-0.453-1.813,13.592c0,0,14.96,6.812,24.943,32.653c0,0,13.6,43.089,76.179,29.48v38.543   c0,5.906-4.53,12.702-15.865,10.89C96.139,438.977,32.2,354.626,32.2,255.77c0-123.807,100.216-224.022,224.03-224.022   c123.347,0,224.023,100.216,223.57,224.022c0,98.856-63.946,182.754-152.828,212.688c-11.342,2.266-15.873-4.53-15.873-10.89   V395.45C311.1,374.577,304.288,360.985,296.133,354.174L296.133,354.174z M512,256.23C512,114.73,397.263,0,256.23,0   C114.73,0,0,114.73,0,256.23C0,397.263,114.73,512,256.23,512C397.263,512,512,397.263,512,256.23L512,256.23z"
                      fill-rule="evenodd"
                    />
                  </g>
                </svg>
              </a>
              <a
                className="rounded-lg p-2 hover:bg-white/25"
                href="https://www.figma.com/@richardvnarvaez"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M13 1.625H9.20829C7.11421 1.625 5.41663 3.32259 5.41663 5.41667C5.41663 7.51075 7.11421 9.20833 9.20829 9.20833M13 1.625V9.20833M13 1.625H16.7916C18.8857 1.625 20.5833 3.32259 20.5833 5.41667C20.5833 7.51075 18.8857 9.20833 16.7916 9.20833M13 9.20833H9.20829M13 9.20833V16.7917M13 9.20833H16.7916M9.20829 9.20833C7.11421 9.20833 5.41663 10.9059 5.41663 13C5.41663 15.0941 7.11421 16.7917 9.20829 16.7917M13 16.7917H9.20829M13 16.7917V20.5833C13 22.6774 11.3024 24.375 9.20829 24.375C7.11421 24.375 5.41663 22.6774 5.41663 20.5833C5.41663 18.4893 7.11421 16.7917 9.20829 16.7917M16.7916 9.20833C18.8857 9.20833 20.5833 10.9059 20.5833 13C20.5833 15.0941 18.8857 16.7917 16.7916 16.7917C14.6975 16.7917 13 15.0941 13 13C13 10.9059 14.6975 9.20833 16.7916 9.20833Z"
                    stroke="#fff"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0  z-10 h-[50vh] w-full bg-gradient-to-t from-[#121120] to-transparent object-cover" />
          <Image
            src="/images/bg-header.jpg"
            width={1920}
            height={720}
            alt="Background - Richard Vinueza Profile"
            className="absolute inset-0  h-screen w-full object-cover opacity-25"
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center space-y-6 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32">
        <Link
          href={siteConfig.links.twitter}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Follow along on Twitter
        </Link>
        <h3
          className={
            barlow.className +
            " font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          }
        >
          To teach is to learn twice
          {/* SOFTWARE ENGINEER */}
        </h3>
        <h4 className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          SOFTWARE ENGINEER with several years of experience as a Freelancer.
          Multiple certifications. Passionate about traveling and naturally
          curious. Currently, I am focused on becoming a great leader and
          continuing to share.
        </h4>
        <h3 className="py-1.5 pt-12 text-sm font-medium">CERTIFICATIONS</h3>
        <div className="flex justify-center gap-24 pt-8 text-white">
          {/* TODO: Create a component each SVG */}
          <GoogleIcon width="50" height="50" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.76468 11.5305C6.76468 11.826 6.79468 12.066 6.85168 12.243C6.91468 12.4185 6.99568 12.6105 7.10668 12.819C7.1421 12.8741 7.16133 12.9381 7.16218 13.0035C7.16218 13.083 7.11418 13.164 7.01218 13.2435L6.50818 13.5795C6.44768 13.6232 6.37572 13.6483 6.30118 13.6515C6.22018 13.6515 6.14068 13.6125 6.06118 13.5405C5.95337 13.4245 5.85692 13.2985 5.77318 13.164C5.68445 13.0101 5.60238 12.8525 5.52718 12.6915C4.90318 13.428 4.12168 13.797 3.17968 13.797C2.50918 13.797 1.97368 13.6035 1.58368 13.2195C1.19218 12.8355 0.992676 12.3225 0.992676 11.682C0.992676 11.001 1.23268 10.449 1.71868 10.032C2.20618 9.61505 2.85268 9.40805 3.67468 9.40805C3.94468 9.40805 4.22518 9.43205 4.52068 9.47105C4.81618 9.51155 5.12068 9.57605 5.43868 9.64805V9.06305C5.43868 8.45405 5.31118 8.02955 5.06368 7.78205C4.80868 7.53305 4.37668 7.41305 3.76168 7.41305C3.48268 7.41305 3.19618 7.44605 2.90068 7.51805C2.60709 7.58792 2.31885 7.67865 2.03818 7.78955C1.94756 7.83058 1.85436 7.86565 1.75918 7.89455C1.71793 7.90818 1.67505 7.91625 1.63168 7.91855C1.51918 7.91855 1.46368 7.83755 1.46368 7.66955V7.27655C1.46368 7.14905 1.47868 7.05155 1.51918 6.99755C1.57962 6.92395 1.65676 6.86584 1.74418 6.82805C2.02168 6.68405 2.35768 6.56405 2.74918 6.46805C3.13918 6.36305 3.55468 6.31655 3.99418 6.31655C4.94368 6.31655 5.63818 6.53255 6.08518 6.96455C6.52468 7.39655 6.74818 8.05355 6.74818 8.93555V11.5305H6.76318H6.76468ZM3.52318 12.747C3.78568 12.747 4.05718 12.699 4.34518 12.603C4.63318 12.507 4.88818 12.33 5.10268 12.09C5.2313 11.9427 5.32421 11.7677 5.37418 11.5785C5.42218 11.385 5.45518 11.154 5.45518 10.881V10.545C5.2129 10.4863 4.96751 10.4412 4.72018 10.41C4.47146 10.3779 4.22097 10.3613 3.97018 10.3605C3.43468 10.3605 3.04468 10.4655 2.78068 10.6815C2.51668 10.8975 2.39068 11.202 2.39068 11.6025C2.39068 11.9775 2.48518 12.258 2.68468 12.4515C2.87668 12.651 3.15568 12.747 3.52318 12.747ZM9.93268 13.6125C9.78868 13.6125 9.69268 13.5885 9.62968 13.5315C9.56518 13.4835 9.50968 13.3725 9.46168 13.2195L7.58668 7.02905C7.55021 6.92523 7.52604 6.8175 7.51468 6.70805C7.51468 6.58055 7.57768 6.50855 7.70518 6.50855H8.48818C8.63818 6.50855 8.74318 6.53255 8.79868 6.58805C8.86318 6.63605 8.91118 6.74855 8.95918 6.90005L10.3002 12.2025L11.5452 6.90005C11.5842 6.74105 11.6322 6.63605 11.6967 6.58805C11.7925 6.5294 11.904 6.50164 12.0162 6.50855H12.6552C12.8052 6.50855 12.9102 6.53255 12.9732 6.58805C13.0377 6.63605 13.0932 6.74855 13.1262 6.90005L14.3862 12.267L15.7662 6.90005C15.7918 6.78393 15.8471 6.67644 15.9267 6.58805C16.0197 6.52924 16.1289 6.50141 16.2387 6.50855H16.9812C17.1087 6.50855 17.1807 6.57305 17.1807 6.70805C17.1807 6.74855 17.1717 6.78905 17.1657 6.83705C17.1527 6.90513 17.1336 6.9719 17.1087 7.03655L15.1842 13.227C15.1377 13.3875 15.0807 13.4925 15.0177 13.5405C14.9271 13.5985 14.8205 13.6263 14.7132 13.62H14.0277C13.8762 13.62 13.7727 13.596 13.7082 13.5405C13.6437 13.4835 13.5882 13.38 13.5567 13.2195L12.3192 8.05505L11.0892 13.2135C11.0502 13.374 11.0022 13.4775 10.9392 13.533C10.8747 13.59 10.7622 13.614 10.6197 13.614H9.93268V13.6125ZM20.1897 13.8285C19.7754 13.8291 19.3626 13.7808 18.9597 13.6845C18.5607 13.5885 18.2502 13.4835 18.0417 13.3635C17.9142 13.2915 17.8272 13.212 17.7942 13.1385C17.7638 13.0679 17.7479 12.9919 17.7477 12.915V12.507C17.7477 12.339 17.8107 12.258 17.9307 12.258C17.9797 12.2582 18.0283 12.2663 18.0747 12.282C18.1227 12.2985 18.1947 12.33 18.2742 12.363C18.5442 12.483 18.8412 12.579 19.1517 12.6435C19.4712 12.7065 19.7817 12.7395 20.1012 12.7395C20.6052 12.7395 20.9952 12.651 21.2667 12.4755C21.3971 12.3966 21.5043 12.2845 21.5773 12.1506C21.6502 12.0168 21.6864 11.866 21.6822 11.7135C21.6849 11.6107 21.6672 11.5082 21.6301 11.4122C21.593 11.3162 21.5373 11.2284 21.4662 11.154C21.3237 11.001 21.0522 10.8645 20.6607 10.737L19.5027 10.377C18.9207 10.1925 18.4887 9.91955 18.2262 9.55955C17.9692 9.22691 17.829 8.81888 17.8272 8.39855C17.8272 8.06255 17.8992 7.76555 18.0417 7.50905C18.1857 7.25405 18.3777 7.02905 18.6177 6.85205C18.8577 6.66905 19.1277 6.53255 19.4472 6.43655C19.7667 6.34055 20.1012 6.30005 20.4522 6.30005C20.6292 6.30005 20.8122 6.30755 20.9877 6.33155C21.1707 6.35555 21.3387 6.38855 21.5067 6.42155C21.6657 6.46055 21.8187 6.49955 21.9612 6.54905C22.1052 6.59705 22.2162 6.64505 22.2972 6.69305C22.3913 6.74039 22.4734 6.80863 22.5372 6.89255C22.5885 6.97065 22.6133 7.06325 22.6077 7.15655V7.53305C22.6077 7.70105 22.5447 7.78955 22.4247 7.78955C22.3184 7.77742 22.2155 7.74482 22.1217 7.69355C21.6393 7.47973 21.1162 7.37328 20.5887 7.38155C20.1342 7.38155 19.7742 7.45355 19.5267 7.60655C19.2792 7.75655 19.1517 7.99055 19.1517 8.31905C19.1517 8.54255 19.2312 8.73455 19.3917 8.88755C19.5507 9.03905 19.8462 9.19055 20.2692 9.32705L21.4032 9.68705C21.9777 9.87155 22.3932 10.128 22.6407 10.4565C22.8882 10.785 23.0067 11.1615 23.0067 11.5785C23.0067 11.9235 22.9362 12.234 22.7997 12.507C22.6584 12.781 22.4599 13.0214 22.2177 13.212C21.9702 13.4115 21.6747 13.557 21.3312 13.6605C20.9712 13.773 20.5962 13.8285 20.1897 13.8285Z" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.6974 17.7196C19.0724 19.6651 15.2564 20.6986 11.9759 20.6986C7.3784 20.6986 3.2354 18.9931 0.106395 16.1581C-0.141105 15.9331 0.0823954 15.6286 0.376395 15.8056C3.7619 17.7751 7.93639 18.9691 12.2564 18.9691C15.1679 18.9691 18.3689 18.3601 21.3149 17.1106C21.7544 16.9111 22.1294 17.3986 21.6974 17.7196Z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.7911 16.4701C22.4566 16.0396 20.5726 16.2631 19.7191 16.3666C19.4641 16.3996 19.4236 16.1746 19.6546 16.0066C21.1546 14.9491 23.6221 15.2536 23.9086 15.6061C24.1966 15.9661 23.8291 18.4411 22.4236 19.6261C22.2091 19.8106 22.0021 19.7161 22.0981 19.4761C22.4161 18.6811 23.1271 16.8961 22.7911 16.4716V16.4701Z"
            />
          </svg>
          <HarvardIcon width="50" height="50" />
          <HackerRankIcon width="50" height="50" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M0.75293 10.8076C0.77243 11.0611 0.98318 11.2591 1.23968 11.2591C1.49618 11.2591 1.70693 11.0611 1.72643 10.8091V10.8076V9.72531C1.71443 9.46581 1.50143 9.25956 1.23968 9.25956C0.97793 9.25956 0.76493 9.46581 0.75293 9.72456V9.72531V10.8076ZM3.44843 10.8076C3.47093 11.0588 3.68093 11.2538 3.93593 11.2538C4.19093 11.2538 4.40093 11.0588 4.42343 10.8091V10.8068V8.38056C4.41143 8.12106 4.19843 7.91481 3.93668 7.91481C3.67493 7.91481 3.46193 8.12106 3.44993 8.37981V10.8068L3.44843 10.8076ZM6.13043 11.7856C6.14243 12.0451 6.35543 12.2513 6.61718 12.2513C6.87893 12.2513 7.09193 12.0451 7.10393 11.7863V11.7856V6.53631C7.09193 6.27681 6.87893 6.07056 6.61718 6.07056C6.35543 6.07056 6.14243 6.27681 6.13043 6.53556V6.53631V11.7856ZM8.83568 10.8076C8.84768 11.0671 9.06068 11.2733 9.32243 11.2733C9.58418 11.2733 9.79718 11.0671 9.80918 10.8083V10.8076V8.38131C9.79718 8.12181 9.58418 7.91556 9.32243 7.91556C9.06068 7.91556 8.84768 8.12181 8.83568 8.38056V8.38131V10.8076ZM11.5259 10.8076C11.5514 11.0566 11.7592 11.2486 12.0127 11.2486C12.2662 11.2486 12.4747 11.0558 12.4994 10.8091V10.8068V9.72456C12.4874 9.46506 12.2744 9.25881 12.0127 9.25881C11.7509 9.25881 11.5379 9.46506 11.5259 9.72381V10.8076ZM14.2424 10.8076C14.2589 11.0641 14.4704 11.2658 14.7299 11.2658C14.9894 11.2658 15.2009 11.0641 15.2174 10.8091V10.8076V8.38131C15.2054 8.12181 14.9924 7.91556 14.7307 7.91556C14.4689 7.91556 14.2559 8.12181 14.2439 8.38056V8.38131V10.8076H14.2424ZM16.9027 11.7856C16.9222 12.0391 17.1329 12.2371 17.3894 12.2371C17.6459 12.2371 17.8567 12.0391 17.8762 11.7871V11.7856V6.53631C17.8642 6.27681 17.6512 6.07056 17.3894 6.07056C17.1277 6.07056 16.9147 6.27681 16.9027 6.53556V6.53631V11.7856ZM19.6072 10.8076C19.6274 11.0611 19.8382 11.2598 20.0947 11.2598C20.3512 11.2598 20.5627 11.0618 20.5822 10.8091V10.8076V8.38131C20.5657 8.12481 20.3542 7.92306 20.0947 7.92306C19.8352 7.92306 19.6237 8.12481 19.6072 8.37981V8.38131V10.8076ZM22.2727 10.8076C22.2847 11.0671 22.4977 11.2733 22.7594 11.2733C23.0212 11.2733 23.2342 11.0671 23.2462 10.8083V10.8076V9.72531C23.2342 9.46581 23.0212 9.25956 22.7594 9.25956C22.4977 9.25956 22.2847 9.46581 22.2727 9.72456V9.72531V10.8076ZM17.0819 15.9008C17.0999 17.0221 18.0134 17.9243 19.1369 17.9243C19.2944 17.9243 19.4474 17.9063 19.5944 17.8733L19.5809 17.8756C20.5162 17.6941 21.2129 16.8811 21.2129 15.9061C21.2129 15.1793 20.8259 14.5426 20.2469 14.1908L20.2379 14.1856C19.9289 13.9913 19.5532 13.8766 19.1504 13.8766C18.0239 13.8766 17.1074 14.7773 17.0827 15.8986V15.9008H17.0819ZM18.5107 15.1006C18.6862 14.9566 18.9127 14.8696 19.1594 14.8696C19.7264 14.8696 20.1862 15.3293 20.1862 15.8963C20.1862 16.2166 20.0392 16.5031 19.8097 16.6913L19.8082 16.6928L19.7924 16.7056C19.6214 16.8383 19.4032 16.9178 19.1669 16.9178C18.5999 16.9178 18.1394 16.4581 18.1394 15.8903C18.1394 15.5731 18.2834 15.2896 18.5092 15.1013L18.5107 15.0998V15.1006ZM7.11218 17.8523H8.09618V13.9471H7.11218V17.8523ZM9.43193 16.9193L9.42818 17.8163L9.49343 17.8276C9.66743 17.8621 9.88118 17.8906 10.0972 17.9063L10.1152 17.9071C10.2202 17.9176 10.3424 17.9236 10.4662 17.9236C10.5359 17.9236 10.6057 17.9213 10.6754 17.9176L10.6657 17.9183C10.8554 17.9041 11.0309 17.8688 11.1989 17.8163L11.1824 17.8208C11.3887 17.7616 11.5679 17.6626 11.7194 17.5336L11.7172 17.5351C11.8552 17.4166 11.9617 17.2658 12.0269 17.0948L12.0292 17.0873C12.0809 16.9561 12.1117 16.8046 12.1117 16.6456C12.1117 16.4806 12.0794 16.3231 12.0202 16.1791L12.0232 16.1873C11.9602 16.0328 11.8649 15.9031 11.7449 15.8003L11.7434 15.7988C11.6287 15.6961 11.4914 15.6143 11.3414 15.5626L11.3332 15.5603L10.6567 15.3091C10.5757 15.2738 10.5112 15.2123 10.4729 15.1351L10.4722 15.1328C10.4594 15.1051 10.4519 15.0721 10.4519 15.0376C10.4519 14.9971 10.4624 14.9596 10.4804 14.9266L10.4797 14.9281C10.5149 14.8711 10.5637 14.8261 10.6222 14.7961L10.6244 14.7953C10.6942 14.7608 10.7759 14.7361 10.8614 14.7263H10.8652C10.9252 14.7173 10.9949 14.7121 11.0662 14.7121C11.1479 14.7121 11.2274 14.7188 11.3047 14.7323L11.2964 14.7308C11.4862 14.7518 11.6557 14.7833 11.8207 14.8261L11.7959 14.8208L11.8312 14.8283V14.0003L11.7667 13.9861C11.6279 13.9508 11.4554 13.9186 11.2792 13.8976L11.2574 13.8953C11.1539 13.8811 11.0339 13.8728 10.9117 13.8728C10.7977 13.8728 10.6852 13.8803 10.5749 13.8938L10.5884 13.8923C10.2944 13.9201 10.0304 14.0326 9.81593 14.2036L9.81893 14.2013C9.67193 14.3176 9.55868 14.4713 9.49193 14.6476L9.48968 14.6543C9.44318 14.7796 9.41618 14.9243 9.41618 15.0758C9.41618 15.2273 9.44318 15.3721 9.49268 15.5056L9.48968 15.4966C9.54293 15.6368 9.62318 15.7561 9.72518 15.8536H9.72593C9.81443 15.9391 9.91568 16.0126 10.0252 16.0711L10.0327 16.0748C10.1662 16.1476 10.3207 16.2098 10.4834 16.2541L10.4984 16.2578C10.5517 16.2736 10.6049 16.2908 10.6574 16.3081L10.7369 16.3373L10.7594 16.3463C10.8419 16.3763 10.9124 16.4206 10.9717 16.4776C11.0129 16.5158 11.0452 16.5631 11.0654 16.6163L11.0662 16.6186C11.0722 16.6418 11.0759 16.6681 11.0759 16.6958C11.0759 16.7221 11.0729 16.7476 11.0662 16.7716L11.0669 16.7693C11.0407 16.8503 10.9852 16.9156 10.9132 16.9538L10.9117 16.9546C10.8367 16.9936 10.7497 17.0221 10.6582 17.0348L10.6537 17.0356C10.5659 17.0498 10.4639 17.0581 10.3604 17.0581C10.3229 17.0581 10.2854 17.0573 10.2479 17.0551H10.2532C10.0544 17.0393 9.87593 17.0146 9.70043 16.9808L9.73118 16.9861C9.64118 16.9666 9.55143 16.9456 9.46193 16.9231L9.43193 16.9193ZM5.75393 17.7841V16.7431L5.73368 16.7521C5.51468 16.8608 5.25818 16.9291 4.98743 16.9418H4.98293C4.95743 16.9441 4.92743 16.9448 4.89743 16.9448C4.64468 16.9448 4.41143 16.8601 4.22468 16.7176L4.22768 16.7198C4.07618 16.6021 3.96143 16.4431 3.90068 16.2601L3.89843 16.2533C3.86243 16.1483 3.84218 16.0276 3.84218 15.9016C3.84218 15.8041 3.85418 15.7103 3.87743 15.6203L3.87593 15.6278C3.92618 15.4111 4.04543 15.2273 4.20893 15.0961L4.21043 15.0946C4.35368 14.9738 4.53443 14.8921 4.73243 14.8681L4.73693 14.8673C4.79468 14.8606 4.86218 14.8568 4.92968 14.8568C5.22293 14.8568 5.49893 14.9296 5.74043 15.0578L5.73068 15.0533L5.75318 15.0653V14.0183L5.70518 14.0056C5.46143 13.9253 5.18093 13.8788 4.88993 13.8788C4.84343 13.8788 4.79693 13.8803 4.75118 13.8826H4.75793C4.44968 13.8908 4.16018 13.9606 3.89768 14.0813L3.91118 14.0753C3.63518 14.2036 3.40343 14.3851 3.22043 14.6071L3.21743 14.6101C2.93768 14.9618 2.76818 15.4126 2.76818 15.9031C2.76818 16.3711 2.92268 16.8031 3.18293 17.1511L3.17918 17.1458C3.45143 17.4931 3.83093 17.7451 4.26818 17.8516L4.28168 17.8546C4.46468 17.9011 4.67543 17.9281 4.89218 17.9281C5.17193 17.9281 5.44118 17.8831 5.69393 17.8006L5.67593 17.8058L5.75393 17.7841ZM16.0589 17.7841V16.7431L16.0387 16.7521C15.8197 16.8608 15.5632 16.9291 15.2924 16.9418H15.2879C15.2624 16.9441 15.2332 16.9448 15.2032 16.9448C14.9497 16.9448 14.7164 16.8601 14.5297 16.7176L14.5327 16.7198C14.3812 16.6021 14.2664 16.4431 14.2049 16.2601L14.2027 16.2533C14.1674 16.1491 14.1472 16.0283 14.1472 15.9031C14.1472 15.8056 14.1592 15.7103 14.1824 15.6203L14.1809 15.6278C14.2319 15.4111 14.3512 15.2273 14.5139 15.0961L14.5154 15.0946C14.6587 14.9738 14.8394 14.8921 15.0374 14.8681L15.0419 14.8673C15.0997 14.8606 15.1672 14.8568 15.2347 14.8568C15.5279 14.8568 15.8039 14.9296 16.0454 15.0578L16.0357 15.0533L16.0582 15.0653V14.0183L16.0102 14.0056C15.7664 13.9253 15.4859 13.8788 15.1949 13.8788C15.1484 13.8788 15.1019 13.8803 15.0562 13.8826H15.0629C14.7547 13.8908 14.4652 13.9606 14.2027 14.0813L14.2162 14.0753C13.9402 14.2036 13.7092 14.3843 13.5262 14.6071L13.5232 14.6108C13.2427 14.9626 13.0739 15.4126 13.0739 15.9031C13.0739 16.3718 13.2284 16.8038 13.4902 17.1518L13.4864 17.1466C13.7587 17.4938 14.1382 17.7451 14.5739 17.8523L14.5874 17.8553C14.7704 17.9018 14.9812 17.9288 15.1979 17.9288C15.4777 17.9288 15.7469 17.8838 15.9997 17.8013L15.9817 17.8066L16.0582 17.7848L16.0589 17.7841Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.72 3.99997H5.37C5.19793 3.99191 5.02595 4.01786 4.86392 4.07635C4.70189 4.13484 4.55299 4.22471 4.42573 4.34081C4.29848 4.45692 4.19537 4.59699 4.12232 4.75299C4.04927 4.909 4.0077 5.07788 4 5.24997V18.63C4.01008 18.9901 4.15766 19.3328 4.41243 19.5875C4.6672 19.8423 5.00984 19.9899 5.37 20H18.72C19.0701 19.9844 19.4002 19.8322 19.6395 19.5761C19.8788 19.32 20.0082 18.9804 20 18.63V5.24997C20.0029 5.08247 19.9715 4.91616 19.9078 4.76122C19.8441 4.60629 19.7494 4.466 19.6295 4.34895C19.5097 4.23191 19.3672 4.14059 19.2108 4.08058C19.0544 4.02057 18.8874 3.99314 18.72 3.99997ZM9 17.34H6.67V10.21H9V17.34ZM7.89 9.12997C7.72741 9.13564 7.5654 9.10762 7.41416 9.04768C7.26291 8.98774 7.12569 8.89717 7.01113 8.78166C6.89656 8.66615 6.80711 8.5282 6.74841 8.37647C6.6897 8.22474 6.66301 8.06251 6.67 7.89997C6.66281 7.73567 6.69004 7.57169 6.74995 7.41854C6.80986 7.26538 6.90112 7.12644 7.01787 7.01063C7.13463 6.89481 7.2743 6.80468 7.42793 6.74602C7.58157 6.68735 7.74577 6.66145 7.91 6.66997C8.07259 6.66431 8.2346 6.69232 8.38584 6.75226C8.53709 6.8122 8.67431 6.90277 8.78887 7.01828C8.90344 7.13379 8.99289 7.27174 9.05159 7.42347C9.1103 7.5752 9.13699 7.73743 9.13 7.89997C9.13719 8.06427 9.10996 8.22825 9.05005 8.3814C8.99014 8.53456 8.89888 8.6735 8.78213 8.78931C8.66537 8.90513 8.5257 8.99526 8.37207 9.05392C8.21843 9.11259 8.05423 9.13849 7.89 9.12997ZM17.34 17.34H15V13.44C15 12.51 14.67 11.87 13.84 11.87C13.5822 11.8722 13.3313 11.9541 13.1219 12.1045C12.9124 12.2549 12.7546 12.4664 12.67 12.71C12.605 12.8926 12.5778 13.0865 12.59 13.28V17.34H10.29V10.21H12.59V11.21C12.7945 10.8343 13.0988 10.5225 13.4694 10.3089C13.84 10.0954 14.2624 9.98848 14.69 9.99997C16.2 9.99997 17.34 11 17.34 13.13V17.34Z" />
          </svg>
        </div>
        <div className="space-x-4 pt-8">
          <Link
            href="https://www.linkedin.com/in/richardvnarvaez/details/certifications/"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            See on Linkedin
          </Link>
          {/* <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link> */}
          <Link
            href={"https://github.com/richardnarvaez"}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
          </Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://drive.google.com/file/d/1-6_qXA48htfG1dpM7xDRBNnVHXKSGRi_mw3PMFu7Szc/view"
          className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-xl "
        >
          <Image
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110"
            src={
              "https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
            }
            width={700}
            height={900}
          />
          <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between bg-black/50 transition-all group-hover:bg-black/70">
            <div className="p-4 font-bold">
              <p className="text-md text-gray-300">RESUME</p>
              <p className="text-3xl ">View or Download Resume in PDF</p>
            </div>
            <div className="flex items-center justify-between gap-3  p-2 backdrop-blur-md">
              <div className="flex items-center gap-3 p-2">
                <Image
                  className="h-12 w-12"
                  src={"/images/GDrive-logo.png"}
                  width={150}
                  height={150}
                  alt=""
                />
                <div className="w-full overflow-hidden">
                  <p className="font-bold">PDF Resume </p>
                  <p
                    className="truncate text-sm"
                    title="Google Drive External Link"
                  >
                    Google Drive External Link
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2  text-sm font-semibold">
                Visitar
              </div>
            </div>
          </div>
        </a>
        <div className="w-full rounded-xl border p-4 lg:col-span-2">
          <div className="font-bold">
            <p className="text-md text-white/75">APPS</p>
            <p className="text-3xl ">List of the Latest</p>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {[
              {
                name: "Memory",
                description: "Web Application",
                url: "/blog/memory",
                logo: "/images/memory-logo.png",
              },
              {
                name: "BusinessIT",
                description: "Redesign",
                logo: "/images/businessit-logo.png",
                url: "/blog/businessit",
              },
              {
                name: "Ubrand",
                description: "Web Application",
                logo: "/images/ubrand-logo.png",
                url: "/blog/ubrand",
              },
            ].map((item) => {
              return (
                <div className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <Image
                      className="h-16 w-16"
                      src={item.logo}
                      width={150}
                      height={150}
                      alt=""
                    />
                    <div className="w-full overflow-hidden">
                      <p className="font-bold">{item.name}</p>
                      <p className="truncate text-sm">{item.description}</p>
                    </div>
                  </div>
                  <a
                    href={item.url}
                    className="rounded-full bg-white/10 px-4 py-2  text-sm font-semibold"
                  >
                    Visitar
                  </a>
                </div>
              )
            })}
          </div>

          <div className="mt-3 w-full text-center">
            <Link href="/blog">Ver mas</Link>
          </div>
        </div>
        <div className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-xl bg-[#23293C] ">
          <div
            className="p-4 font-bold"
            style={{
              zIndex: 14,
              position: "absolute",
              background: "linear-gradient(180deg, #23293c, transparent)",
              width: "100%",
            }}
          >
            <p className="text-md text-white/75">TECNOLOGIAS</p>
            <p className="text-3xl ">Herramientas y Frameworks</p>
          </div>
          <Image
            alt=""
            className="absolute -bottom-8 -right-8 w-full  -rotate-12 scale-125 transition-transform ease-out group-hover:scale-150"
            src={"/images/IconsTech.png"}
            width={800}
            height={800}
          />
        </div>
        <div
          // onClick={() => {
          //   alert("Proximamente")
          // }}
          className=" grid w-full cursor-pointer grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2"
        >
          <div className="group relative flex items-center justify-center overflow-hidden rounded-xl border text-center">
            <div className="z-20 m-auto p-4 font-bold">
              <div className="m-4 mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white">
                <Image
                  alt="Logo Richard Vinueza"
                  src={"/images/logo-richard.png"}
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-md text-white/75">TOP</p>
              <p className="text-3xl  text-white">List of Best Tools</p>{" "}
              <p className="">Coming Soon</p>
            </div>
            <div className="absolute top-0 z-10 h-full w-full bg-[rgba(35,41,60,0.3)]"></div>

            <Image
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform ease-out group-hover:scale-110"
              src={
                "https://images.unsplash.com/photo-1664448007527-2c49742dbb24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
              }
              width={700}
              height={900}
            />
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.figma.com/community/file/1270173776891030529/Portfolio---React-NextJS"
            className="flex items-center rounded-xl border  p-4 font-bold hover:bg-white/10"
          >
            <div>
              <p className="flex items-center gap-2 text-lg text-white/75">
                FIGMA <ExternalLinkIcon size={18} />
              </p>
              <p className="text-3xl ">Visit this Portfolio Template</p>
            </div>
          </a>
        </div>
        <div className="col-span-full mx-auto mb-8 mt-32 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <p className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Projects and Products
          </p>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Lista de todos los productos destacados
          </p>
        </div>
        {posts?.length ? (
          <>
            {posts.map((post, index) => (
              <Link
                href={post.slug}
                className={"col-span-full cursor-pointer "}
              >
                <article
                  key={post._id}
                  className={
                    "group relative col-span-full flex cursor-pointer flex-col items-center gap-2 space-y-2 py-12 " +
                    (index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")
                  }
                >
                  <div className=" aspect-video max-w-lg overflow-hidden rounded-xl border  bg-muted ">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={720}
                        height={405}
                        className="transition-transform ease-out group-hover:scale-110"
                        priority={index <= 1}
                      />
                    )}
                  </div>
                  <div className="inset-x-0 bottom-0 w-full bg-gradient-to-t to-transparent p-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 2.99997C18 2.99997 14 3.99997 14 11L14 19C14 20.25 14.756 21.017 16 21L20 21C21.25 21 22 20.25 22 19.028L22 13C22 11.75 21.25 11 20 11C19 11 19 11 19 9.99997L19 8.99997C19 7.99997 20 6.99997 21 6.99997C22 6.99997 22 6.99197 22 5.96897L22 3.99997C22 2.99997 22 2.99997 21 2.99997Z"
                        fill="white"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 2.99997C6 2.99997 2 3.99997 2 11L2 19C2 20.25 2.757 21.017 4 21L8 21C9.25 21 10 20.25 10 19.028L10 13C10 11.75 9.25 11 8 11L7.25 11C7.25 8.74997 7 6.99997 10 6.99997L10 3.99997C10 2.99997 10 2.99997 9 2.99997Z"
                        fill="white"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <h2 className="text-xl font-extrabold text-white md:text-2xl">
                      {post.description}
                    </h2>

                    {post.title && (
                      <p className="mt-2 flex items-center gap-2 truncate">
                        {" "}
                        {post.title}{" "}
                        <span>
                          {post.status && (
                            <p
                              className={
                                " max-w-fit truncate rounded-full px-3 py-1 text-sm font-bold uppercase " +
                                (getColorOfStatus[post.status] || "")
                              }
                            >
                              {post.status}
                            </p>
                          )}
                        </span>
                      </p>
                    )}
                    {/* {post.date && (
                    <p className="text-sm ">
                      {formatDate(post.date)}
                    </p>
                  )} */}
                  </div>
                  {/* <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link> */}
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p>No posts published.</p>
        )}
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Frameworks & Tech
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            These are the tools and frameworks with which I feel more
            comfortable without limiting myself to them because I have worked
            with Angular, MySql, Laravel, C++ and many more... My main stack is:
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
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">React</h3>
                <p className="text-sm text-muted-foreground">
                  Server and Client Components. Use hook.
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
                <g clip-path="url(#clip0_121_3668)">
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
                  UI components built using Radix UI and styled with Tailwind
                  CSS.
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
            className="absolute -top-10 z-0 w-full sm:-top-24 md:-top-32"
            src={"/images/teclado-mac.jpg"}
            alt="Teclado MacBook"
          />
        </div>
      </section>
      <section id="open-source" className="container  py-8 md:py-12 lg:py-24">
        <div className="mx-auto  flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="z-20 font-heading  text-6xl  leading-[1.1]">
            Open Source
          </h2>
          <p className="z-20 max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This Portfolio is open source and powered by open source software.{" "}
            <br /> The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
          {stars && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {stars} stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
