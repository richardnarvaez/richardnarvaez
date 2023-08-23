import Link from "next/link"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { allPosts } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"

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

  return (
    <>
      <p className="fixed z-50 m-6 rounded-full bg-red-500 px-6 py-2 text-xs font-semibold text-white">
        In Dev
      </p>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <header className="z-10 w-full max-w-5xl">
            <div className="relative z-20 flex w-full flex-col  items-center justify-center gap-4">
              <Image
                src="/images/Perfil.jpg"
                alt="Vercel Logo"
                className="aspect-square rounded-3xl border-4 border-white bg-white"
                width={100}
                height={100}
                priority
              />
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
              <h1 className="text-center text-3xl font-bold">
                Richard Vinueza
              </h1>

              <h2
                style={{
                  opacity: "1",
                  background:
                    "-webkit-radial-gradient(100% 0%, #39e5ae, #1861db)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="z-10 max-w-3xl text-center text-6xl  font-extrabold opacity-70 md:text-8xl "
              >
                CREATIVE DEVELOPER
              </h2>
              {/* SOFTWARE ENGINEER */}
              <h3 className="flex flex-col text-center text-lg">
                Over the last 5 years, I&apos;ve empowered 9+ companies
                <span className="hidden max-w-2xl opacity-70 md:block">
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
            <Image
              src="/HeadBlurElipse.svg"
              alt="Blur"
              className="absolute left-0 top-0 z-0 w-full"
              width={180}
              height={90}
            />
          </header>
          {/* <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            SOFTWARE ENGINEER</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link> 
          </div>*/}
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
            <p className="text-3xl ">Ultimos lanzamientos</p>
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
              <p className="text-3xl ">List of Best</p>
            </div>
            <div className="absolute top-0 z-10 h-full w-full bg-[rgba(35,41,60,0.3)]"></div>

            <Image
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform ease-out group-hover:scale-110"
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
              <p className="text-lg text-white/75">FIGMA</p>
              <p className="text-3xl ">Visit Portfolio Template</p>
            </div>
          </a>
        </div>
        <div className="col-span-3 mt-4">
          <p className="text-xl font-bold">Proyectos y Productos</p>
          <p>Lista de todos los productos destacados</p>
        </div>
        {posts?.length ? (
          <>
            {posts.map((post, index) => (
              <article
                key={post._id}
                className={
                  "group relative flex flex-col space-y-2 " +
                  (index % 3 == 0 ? "col-span-2" : "")
                }
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors"
                    priority={index <= 1}
                  />
                )}
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                )}
                <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
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
                <h3 className="font-bold">Next.js 13</h3>
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
                <h3 className="font-bold">React 18</h3>
                <p className="text-sm">
                  Server and Client Components. Use hook.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                version="1.0"
                width="100px"
                height="100px"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
                  <path d="M1779 4380 l-30 -30 4 -587 c4 -647 3 -632 73 -848 159 -487 578 -880 1078 -1010 139 -36 237 -46 498 -53 l238 -7 31 -32 c26 -26 33 -41 36 -85 5 -65 -20 -112 -72 -134 -59 -24 -522 -17 -642 11 -15 3 -30 -2 -44 -16 -20 -20 -21 -26 -17 -352 4 -321 5 -334 28 -392 32 -82 114 -164 193 -194 117 -43 387 -37 563 14 295 86 538 314 644 603 61 167 61 176 57 999 -3 732 -4 750 -26 848 -76 340 -230 617 -472 850 -244 234 -540 379 -874 430 -80 12 -214 15 -668 15 l-569 0 -29 -30z m1792 -1571 c85 -26 148 -110 149 -200 0 -63 -40 -139 -92 -175 -37 -26 -50 -29 -118 -29 -68 0 -81 3 -118 29 -83 57 -114 174 -71 263 46 95 150 141 250 112z" />
                  <path d="M863 4204 c-57 -21 -132 -90 -168 -156 l-30 -53 -3 -950 c-3 -1026 -3 -1039 50 -1205 114 -360 399 -650 756 -770 153 -51 235 -60 553 -60 347 0 365 4 466 105 91 91 103 138 103 394 0 108 -4 201 -8 207 -4 6 -61 39 -127 73 -66 34 -163 92 -215 129 -123 86 -345 308 -433 432 -118 168 -230 412 -281 615 -46 181 -49 225 -55 710 l-6 470 -40 13 c-155 53 -475 79 -562 46z" />
                </g>
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Database</h3>
                <p className="text-sm text-muted-foreground">
                  ORM using Prisma and Postgresql.
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
