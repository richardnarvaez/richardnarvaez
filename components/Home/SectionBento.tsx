"use client"

/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Image from "next/image"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

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
        className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-3xl border-4 border-red-500"
      >
        <Image
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110 group-hover:blur-sm"
          src={"/images/avatars/richard.jpg"}
          width={700}
          height={900}
        />
        <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-between bg-black/20 transition-all group-hover:bg-black/30 ">
          <div className="w-fit rounded-br-xl bg-red-500 px-4 py-2">
            <p className="text-xs font-bold text-gray-300 ">NOW AVALIABLE</p>
          </div>

          <div className="">
            <div className="bg-gradient-to-t from-red-500 to-transparent p-4 font-bold">
              <p className="text-md text-gray-300">RESUME</p>
              <p className="text-3xl ">View or Download Resume in PDF</p>
              <p className="text-sm ">{"It's free, so take a look."}</p>
            </div>
            <div className="flex items-center justify-between gap-3  bg-red-500 p-2 pb-3">
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
                Visit
              </div>
            </div>
          </div>

          {/* <Image
            alt=""
            className="absolute -right-[270px] -top-[80px] h-full w-full  rotate-45 object-cover opacity-0 transition-all duration-300 ease-out group-hover:right-0 group-hover:rotate-0 group-hover:opacity-100"
            src={"/images/home/me.webp"}
            width={700}
            height={900}
          /> */}
        </div>
      </a>
      <div className="group relative z-50 flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-0 border-white/20 p-4 font-bold transition-transform lg:col-span-2">
        <Image
          alt="Background Huma Legends"
          src={"/images/blog/huma/huma-bg.jpg"}
          width={960}
          height={540}
          className="absolute top-0 h-full w-full scale-105 opacity-75 blur-md transition-all  group-hover:scale-125 group-hover:blur-lg "
        />
        <p className="z-10 rounded-full border-4 border-white/30 bg-white/70 px-4 py-1 text-sm  text-black/60">
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
        className="group relative h-[500px] w-full cursor-pointer overflow-hidden rounded-3xl bg-[#23293C]  md:h-full lg:h-auto "
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
          <p className="text-3xl ">Tools and Frameworks</p>
        </div>
        <Image
          alt=""
          className="absolute -bottom-8 -right-8 w-full  -rotate-12 scale-125 transition-transform ease-out group-hover:scale-150"
          src={"/images/IconsTech.png"}
          width={800}
          height={800}
        />
      </Link>
      <div className=" grid w-full cursor-pointer grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => alert("Coming soon")}
            className="group relative flex items-center justify-center overflow-hidden rounded-3xl border px-6 py-12 text-center"
          >
            1M$ Ideas
          </button>
          <div className="flex w-full flex-wrap items-center justify-center gap-4 rounded-3xl bg-white px-4 py-5 text-slate-500/40 shadow-lg">
            <a
              title="Figma"
              href="https://www.figma.com/@richardvnarvaez"
              target="_blank"
              rel="noreferrer noopener"
              className="text-black/50 hover:text-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                viewBox="0 0 26 26"
                fill="none"
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
            </a>
            <a
              title="Twitter"
              href="https://twitter.com/richardvnarvaez"
              target="_blank"
              rel="noreferrer noopener"
              className="text-black/50 hover:text-black/70 transition-colors"
            >
              <svg
                width="22px"
                height="22px"
                version="1.1"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <title>Twitter | X</title>
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
              title="Github"
              href="https://github.com/richardnarvaez"
              target="_blank"
              rel="noreferrer noopener"
              className="text-black/50 hover:text-black/70 transition-colors"
            >
              <svg
                width="22px"
                height="22px"
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
              className="text-black/50 hover:text-black/70 transition-colors"
            >
              <LinkedIn width={22} height={22} />
            </a>

            <a
              title="Dribbble"
              href="https://dribbble.com/RichardNarvaez"
              target="_blank"
              rel="noreferrer noopener"
              className="text-black/50 hover:text-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 0 210 59"
                fill="none"
                className="fill-current"
              >
                <title>Dribbble: the community for graphic design</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M206.622 31.928C207.065 31.4116 207.85 31.4352 208.253 31.986H208.25L209.784 34.0834C210.075 34.4864 210.073 35.0425 209.769 35.4349C207.106 38.8893 202.44 42.2143 196.81 42.5359C192.366 42.7887 188.701 41.1051 186.706 37.9221C186.311 37.2925 185.44 37.2557 184.997 37.8511C182.63 41.0286 179.766 43.5134 176.782 43.6845C171.467 43.9876 169.966 40.4228 171.28 32.563C171.412 31.7805 170.726 31.1192 169.987 31.3141C168.885 31.6065 167.715 31.7356 166.528 31.633C166.034 31.5907 165.571 31.8912 165.422 32.3811C163.455 38.8418 158.774 44.8518 152.715 45.1997C148.847 45.421 143.069 43.205 143.647 33.9462C143.695 33.1927 143.019 32.5999 142.323 32.8106C141.11 33.1795 139.804 33.3534 138.474 33.2401C137.981 33.1979 137.52 33.4983 137.371 33.9885C135.404 40.449 130.723 46.4592 124.664 46.8068C120.796 47.0282 115.018 44.8124 115.596 35.5536C115.644 34.7998 114.968 34.207 114.272 34.418C113.059 34.7869 111.753 34.9634 110.423 34.8473C109.93 34.8053 109.469 35.1057 109.32 35.5956C107.352 42.0564 102.672 48.0664 96.6132 48.4142C93.8613 48.5723 90.1398 47.4945 88.4308 43.5264C88.1016 42.7599 87.1144 42.6438 86.6257 43.3105C84.2334 46.5751 81.3193 49.152 78.2762 49.3259C75.1571 49.505 73.4509 48.2535 72.7091 46.0216C72.4458 45.2339 71.4609 45.0467 70.9293 45.6712C68.8002 48.1744 66.3749 50.0082 63.9216 50.1479C60.1393 50.3666 57.9619 47.563 57.7823 44.1667C57.5747 40.204 59.2887 35.564 61.2025 30.4999C61.4684 29.7964 60.9873 29.0348 60.2608 29.0032C59.157 28.956 57.8963 28.8399 56.7113 28.6185C56.1771 28.5159 55.6583 28.8479 55.5063 29.3907C53.243 37.4716 49.7771 45.392 46.8529 50.074C46.5263 50.5984 45.8505 50.7381 45.3593 50.377L43.1264 48.7331C42.6682 48.393 42.5441 47.7397 42.8504 47.247C47.0759 40.478 50.8278 29.8807 52.1215 22.0421C52.2025 21.5415 52.61 21.17 53.0986 21.141L56.0683 20.9697C56.7493 20.9302 57.2861 21.5652 57.162 22.2634L57.1493 22.3372C57.0379 22.959 57.4532 23.5439 58.0532 23.6257C60.7164 23.992 64.6963 24.0366 67.3975 23.9313C68.157 23.9023 68.6938 24.6875 68.4178 25.4226C66.2507 31.1876 63.3469 39.1765 63.5139 42.3382C63.5899 43.7662 64.2204 44.5462 65.3291 44.4829C67.4508 44.3619 70.7141 40.0959 73.1876 35.3455C73.2331 35.261 73.2659 35.169 73.2862 35.0741C74.1196 31.3543 75.3565 27.2068 76.6061 23.0163L76.6837 22.7561C76.8128 22.3188 77.1901 22.0131 77.6306 21.9868L81.1876 21.7839C81.9219 21.7417 82.4712 22.4795 82.2485 23.2093C82.0654 23.8112 81.883 24.409 81.7023 25.0014C78.5723 35.2603 75.9438 43.8759 79.4838 43.6742C81.7978 43.5422 85.0764 39.6164 87.8966 34.0279C87.9421 33.9356 87.9751 33.8381 87.9954 33.7355C88.1372 33.0055 88.3092 32.2416 88.5195 31.4432C90.1639 24.8753 92.0286 18.3691 93.8955 11.855C94.4717 9.8446 95.0481 7.83341 95.6182 5.81945C95.7449 5.37417 96.1245 5.06062 96.57 5.03426L100.221 4.82611C100.963 4.78396 101.512 5.52962 101.279 6.26474C99.8208 10.8388 98.2967 15.7106 96.8487 20.4006C96.5448 21.3887 97.603 22.2107 98.4386 21.6416C99.8791 20.6562 101.545 20.0027 103.158 19.9105C107.267 19.676 110.064 23.0565 110.332 28.1496C110.347 28.4184 110.363 28.7082 110.37 29.0032C110.385 29.5673 110.808 30.023 111.348 30.0704C113.282 30.2417 115.259 29.6673 116.786 28.3051C116.943 28.1654 117.049 27.9757 117.102 27.7701C118.616 21.8916 120.287 16.0568 121.959 10.2147C122.532 8.21455 123.105 6.21353 123.672 4.20956C123.798 3.76427 124.178 3.45072 124.624 3.42438L128.274 3.21623C129.016 3.17408 129.566 3.91972 129.333 4.65484C127.874 9.22892 126.35 14.1007 124.902 18.7907C124.598 19.7788 125.657 20.6008 126.492 20.0317C127.933 19.0463 129.599 18.3929 131.211 18.3006C135.32 18.0662 138.117 21.4466 138.386 26.5399C138.401 26.8084 138.416 27.0985 138.424 27.3935C138.436 27.9573 138.862 28.4132 139.401 28.4607C141.335 28.6318 143.312 28.0573 144.839 26.6951C144.996 26.5557 145.102 26.3659 145.156 26.1604C146.67 20.2818 148.34 14.4471 150.013 8.6051C150.586 6.60484 151.158 4.60372 151.725 2.59968C151.852 2.15439 152.232 1.84085 152.677 1.8145L156.328 1.60635C157.07 1.56419 157.619 2.30985 157.386 3.04497C155.928 7.61902 154.404 12.4908 152.956 17.1808C152.652 18.1689 153.71 18.991 154.546 18.4219C155.986 17.4364 157.652 16.783 159.265 16.6908C163.374 16.4563 166.171 19.8367 166.44 24.9299C166.455 25.2013 166.47 25.4885 166.477 25.7835C166.493 26.3447 166.913 26.8032 167.452 26.8507C169.323 27.0166 171.237 26.4844 172.741 25.2171C172.908 25.0774 173.024 24.8798 173.08 24.6637C174.804 18.0187 177.336 9.31324 179.777 0.981894C179.906 0.541877 180.285 0.236236 180.726 0.209888L184.344 0.0017367C185.078 -0.0404207 185.627 0.692063 185.407 1.42191C182.047 12.5778 179.308 22.3372 177.797 28.0944C175.789 35.9039 175.711 38.1567 177.994 38.025C179.911 37.9143 182.493 35.1952 184.928 31.0847C185.025 30.924 185.075 30.7397 185.083 30.5526C185.402 22.324 190.447 14.8385 197.946 14.409C202.969 14.1218 205.721 17.916 205.918 21.6495C206.293 28.7767 199.248 33.3324 192.42 32.9107C191.625 32.8606 191.047 33.7145 191.397 34.4574C192.351 36.4967 194.359 37.6352 197.787 37.4374C201.048 37.2531 204.468 34.439 206.622 31.928ZM93.7548 33.9278C92.1345 40.4228 94.1017 42.9652 96.646 42.8203C100.823 42.5805 104.864 34.9263 104.553 29.019C104.416 26.4396 102.907 25.0958 101.145 25.1961C98.2106 25.3646 95.0512 28.745 93.7548 33.9278ZM121.808 32.3207C120.188 38.8154 122.155 41.3581 124.7 41.2131H124.697C128.874 40.9734 132.917 33.3192 132.606 27.4119C132.472 24.8324 130.96 23.4886 129.198 23.5887C126.264 23.7574 123.105 27.1379 121.808 32.3207ZM149.862 30.7133C148.242 37.2082 150.209 39.7509 152.753 39.606H152.751C156.925 39.3662 160.971 31.712 160.66 25.8047C160.525 23.2251 159.014 21.8814 157.252 21.9815C154.318 22.1501 151.158 25.5307 149.862 30.7133ZM200.584 22.2239C200.559 20.5218 199.513 19.2887 197.817 19.3862H197.815C194.483 19.5785 191.875 23.1856 191.045 27.562C190.913 28.2577 191.422 28.9058 192.103 28.8899C196.407 28.7821 200.721 25.9416 200.584 22.2239ZM44.3525 25.3837C43.9171 12.1962 35.3423 3.49339 22.6712 3.94658C17.2307 4.19426 11.0052 6.25733 6.32164 9.9461C5.88113 10.2939 5.76719 10.9315 6.06593 11.4163L8.05331 14.6519C8.39254 15.2052 9.11407 15.3185 9.60776 14.9075C13.1724 11.9459 18.0383 10.0041 22.7193 9.79855C31.403 9.43757 37.7828 14.9971 38.1551 25.7367C38.6209 38.2417 30.2157 52.5461 16.7091 53.3207C16.2382 53.3471 15.7471 53.3577 15.2559 53.3577C14.5673 53.3577 14.0585 52.6858 14.2306 51.9901C16.8357 41.4744 19.8763 30.1974 22.9776 19.7029C23.1928 18.973 22.6459 18.2458 21.9143 18.288L17.9648 18.5146C17.5218 18.5409 17.142 18.8492 17.0129 19.2918C14.0331 29.6045 11.0508 40.7895 8.36723 51.284C8.21279 51.89 7.59761 52.2379 7.02544 52.0427C5.62543 51.566 4.34693 51.0232 3.2583 50.3881C2.73677 50.0825 2.07601 50.2987 1.80765 50.8571L0.11142 54.4037C-0.139216 54.9281 0.0455967 55.5709 0.539275 55.8527C4.38489 58.0345 10.223 59.2806 16.0914 58.9462C35.4032 57.8393 44.864 40.0015 44.3525 25.3889V25.3837ZM82.3044 9.18082C79.955 9.31518 77.8713 11.9553 78.0183 14.7377C78.1143 16.5715 79.2917 17.7967 81.1195 17.694C83.4689 17.5596 85.6106 14.7798 85.4714 12.1318C85.3754 10.298 84.0005 9.08333 82.3044 9.18082Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
          <CardTopTools />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.figma.com/community/file/1270173776891030529"
            className="group relative flex items-center overflow-hidden rounded-3xl border-2 border-dashed border-[#FF512F]/50  p-6 font-bold "
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
              <p className="text-3xl ">Visit this Portfolio Template</p>
              <p className="text-md mt-3 font-normal text-gray-200/50">
                We have Updates of this Portfolio Design in Figma Community
              </p>
            </div>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <button className="group relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-white bg-slate-800 text-center">
                <Image
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110 group-hover:blur-sm"
                  src={"/images/speech.png"}
                  width={700}
                  height={900}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <p className="font-bold">About Me</p>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl rounded-3xl sm:max-w-4xl max-h-[100vh] sm:max-h-[80vh] overflow-y-auto">
              <ProfileInfoModal />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
