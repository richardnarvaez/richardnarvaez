"use client"

/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Image from "next/image"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import GradualBlur from "@/components/ui/gradual-blur"

import LinkedIn from "../Icons/brands/Linkedin"
import ProfileInfoModal from "./ProfileInfoModal"
import CardTopTools from "./SectionBento/TopTools"

export default function SectionBento() {
  return (
    <section
      id="main"
      className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-0"
    >
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://drive.google.com/file/d/1-6_qXA48htfG1dpM7xDRBNnVHXKSGRi_mw3PMFu7Szc/view"
        className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-3xl border-4 border-white"
      >
        <Image
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110 group-hover:blur-sm"
          src={"/images/me.jpg"}
          width={700}
          height={900}
        />
        <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between bg-black/20 transition-all group-hover:bg-black/30">
          <div className="w-fit rounded-br-xl bg-white px-4 py-2">
            <p className="text-xs font-bold text-gray-500">NOW AVALIABLE</p>
          </div>
          <div className="relative">
            <div className="relative z-[1010] bg-gradient-to-t from-black/50 to-transparent p-4 font-bold">
              <p className="text-md text-gray-300">RESUME</p>
              <p className="text-3xl">View or Download Resume in PDF</p>
              <p className="text-sm">{"It's free, so take a look."}</p>
            </div>
            <GradualBlur
              target="parent"
              position="bottom"
              height="10rem"
              strength={1}
              divCount={5}
              curve="bezier"
              exponential={true}
              opacity={1}
            />
          </div>
        </div>
      </a>
      <div className="group relative z-50 flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-0 border-white/20 p-4 font-bold transition-transform lg:col-span-2">
        <Image
          alt="Background Huma Legends"
          src={"/images/blog/huma/huma-bg.jpg"}
          width={960}
          height={540}
          className="absolute top-0 h-full w-full scale-105 opacity-75 blur-sm transition-all group-hover:scale-125"
        />
        <p className="z-10 rounded-full border-4 border-white/30 bg-white/70 px-4 py-1 text-sm text-black/60">
          NEW
        </p>
        <div className="z-10 m-4 mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-white">
          <Image
            alt="Huma Legends App Icon"
            src={"/images/blog/huma/huma-app-icon.jpg"}
            width={100}
            height={100}
          />
        </div>
        <div className="z-10 flex-col items-center justify-center text-center">
          <p className="text-3xl text-white">HUMA LEGENDS</p>
          <p className="mb-4 mt-2">DOWNLOAD IN APPSTORE</p>
          <div className="flex justify-center gap-4">
            <Link
              href={"https://huma.darkpixl.com"}
              target="_blank"
              className="rounded-3xl border border-white/50 bg-black/20 px-4 py-2 text-sm"
            >
              Visit Website
            </Link>
            <Link
              href={"/projects/huma"}
              className="rounded-3xl border border-white/50 bg-black/20 px-4 py-2 text-sm"
            >
              Visit Story
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <Link
        href={"/#stack"}
        className="group relative h-[500px] w-full cursor-pointer overflow-hidden rounded-3xl bg-[#23293C] md:h-full lg:h-auto"
      >
        <div
          className="p-4 font-bold"
          style={{
            zIndex: 14,
            position: "absolute",
            background: "linear-gradient(180deg, #23293c, transparent)",
            width: "100%",
          }}
        >
          <p className="text-md text-white/75">TECHNOLOGIES</p>
          <p className="text-3xl">Tools and Frameworks</p>
        </div>
        <Image
          alt=""
          className="absolute -bottom-8 -right-8 w-full -rotate-12 scale-125 transition-transform ease-out group-hover:scale-150"
          src={"/images/IconsTech.png"}
          width={800}
          height={800}
        />
      </Link>
      <div className="grid w-full cursor-pointer grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-3">
          {/* <button
            onClick={() => alert("Coming soon")}
            className="group relative flex items-center justify-center overflow-hidden rounded-3xl border px-6 py-12 text-center"
          >
            1M$ Ideas
          </button> */}

          {/* <CardTopTools /> */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-slate-800 text-center">
                <Image
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110 group-hover:blur-sm"
                  src={"/images/speech.png"}
                  width={700}
                  height={900}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <p className="text-2xl font-bold">About Me</p>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[100vh] max-w-3xl overflow-y-auto rounded-3xl sm:max-h-[80vh] sm:max-w-4xl">
              <ProfileInfoModal />
            </DialogContent>
          </Dialog>
          <Link
            href="/gallery"
            className="group relative flex h-full items-center overflow-hidden rounded-3xl border-2 border-dashed p-6 font-bold"
          >
            <div>
              <p className="text-3xl">Visit Gallery</p>
              <div className="text-md mt-3 font-normal text-gray-200/50">
                Discover my latest projects and creations
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.figma.com/community/file/1270173776891030529"
            className="group relative flex items-center overflow-hidden rounded-3xl border-2 border-dashed border-[#FF512F]/50 p-6 font-bold"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 26 26"
                fill="none"
                className="absolute right-8 top-0 h-96 w-96 text-gray-200/5 transition-all group-hover:top-8 group-hover:h-20 group-hover:w-20 group-hover:text-gray-200/20"
              >
                <title>Figma</title>
                <path
                  d="M13 1.625H9.20829C7.11421 1.625 5.41663 3.32259 5.41663 5.41667C5.41663 7.51075 7.11421 9.20833 9.20829 9.20833M13 1.625V9.20833M13 1.625H16.7916C18.8857 1.625 20.5833 3.32259 20.5833 5.41667C20.5833 7.51075 18.8857 9.20833 16.7916 9.20833M13 9.20833H9.20829M13 9.20833V16.7917M13 9.20833H16.7916M9.20829 9.20833C7.11421 9.20833 5.41663 10.9059 5.41663 13C5.41663 15.0941 7.11421 16.7917 9.20829 16.7917M13 16.7917H9.20829M13 16.7917V20.5833C13 22.6774 11.3024 24.375 9.20829 24.375C7.11421 24.375 5.41663 22.6774 5.41663 20.5833C5.41663 18.4893 7.11421 16.7917 9.20829 16.7917M16.7916 9.20833C18.8857 9.20833 20.5833 10.9059 20.5833 13C20.5833 15.0941 18.8857 16.7917 16.7916 16.7917C14.6975 16.7917 13 15.0941 13 13C13 10.9059 14.6975 9.20833 16.7916 9.20833Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mb-2 flex items-center gap-2 text-xl text-[#FF512F]">
                FIGMA <ExternalLinkIcon size={24} />
              </p>
              <p className="mt-[100px] text-3xl">
                Visit this Portfolio Template
              </p>
              <div className="text-md mt-3 font-normal text-gray-200/50">
                +1k Users | +40 Likes
              </div>
            </div>
          </Link>
          <div className="flex w-full items-center gap-4 rounded-3xl text-slate-500/40 shadow-lg">
            <a
              title="Github"
              href="https://github.com/richardnarvaez"
              target="_blank"
              rel="noreferrer noopener"
              className="flex w-full justify-center rounded-2xl bg-white p-6 text-black/50 transition-colors hover:text-black/70"
            >
              <svg
                width="32px"
                height="32px"
                version="1.1"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <title>Github</title>
                <g>
                  <path
                    clipRule="evenodd"
                    d="M296.133,354.174c49.885-5.891,102.942-24.029,102.942-110.192   c0-24.49-8.624-44.448-22.67-59.869c2.266-5.89,9.515-28.114-2.734-58.947c0,0-18.139-5.898-60.759,22.669   c-18.139-4.983-38.09-8.163-56.682-8.163c-19.053,0-39.011,3.18-56.697,8.163c-43.082-28.567-61.22-22.669-61.22-22.669   c-12.241,30.833-4.983,53.057-2.718,58.947c-14.061,15.42-22.677,35.379-22.677,59.869c0,86.163,53.057,104.301,102.942,110.192   c-6.344,5.452-12.241,15.873-14.507,30.387c-12.702,5.438-45.808,15.873-65.758-18.592c0,0-11.795-21.31-34.012-22.669   c0,0-22.224-0.453-1.813,13.592c0,0,14.96,6.812,24.943,32.653c0,0,13.6,43.089,76.179,29.48v38.543   c0,5.906-4.53,12.702-15.865,10.89C96.139,438.977,32.2,354.626,32.2,255.77c0-123.807,100.216-224.022,224.03-224.022   c123.347,0,224.023,100.216,223.57,224.022c0,98.856-63.946,182.754-152.828,212.688c-11.342,2.266-15.873-4.53-15.873-10.89   V395.45C311.1,374.577,304.288,360.985,296.133,354.174L296.133,354.174z M512,256.23C512,114.73,397.263,0,256.23,0   C114.73,0,0,114.73,0,256.23C0,397.263,114.73,512,256.23,512C397.263,512,512,397.263,512,256.23L512,256.23z"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </a>
            <a
              title="Linkedin"
              href="https://www.linkedin.com/in/richard-vinueza"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-black/700 flex w-full justify-center rounded-2xl bg-white p-6 text-black/50 transition-colors hover:text-black/70"
            >
              <LinkedIn width={32} height={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
