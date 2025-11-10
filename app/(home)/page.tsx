import { allPosts } from "@/.contentlayer/generated"
import { getFavTools } from "@/services/posts"
import { compareDesc } from "date-fns"

import { getAllPlaygroundComponents, getPhotography } from "@/lib/gallery-data"
import FeaturedSections from "@/components/featured-sections"
import Header from "@/components/Home/Header"
import SectionBento from "@/components/Home/SectionBento"
import SectionFavTools from "@/components/Home/SectionFavTools"
import SectionFrameworksNStak from "@/components/Home/SectionFrameworksNStack"
import SectionInspiration from "@/components/Home/SectionInspiration"
import SectionListOfProjects from "@/components/Home/SectionListOfProjects"
import SectionOpenSource from "@/components/Home/SectionOpenSource"
import { ScrollToTopButton } from "@/components/SrollTopButton"

export default async function IndexPage() {
  const [favTools, photographyItems, playgroundComponents] = await Promise.all([
    getFavTools(),
    getPhotography(),
    getAllPlaygroundComponents(),
  ])

  const posts = allPosts
    .filter((post) => post.published && post.highlight)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div>
      <ScrollToTopButton />

      <Header />

      <SectionBento />

      <div
        id="projects-placeholder"
        className="relative mx-auto mt-4 grid max-w-5xl grid-cols-1 gap-4 px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-0"
      >
        <div className="absolute inset-x-0 bottom-0 z-10 h-24 w-full bg-gradient-to-t from-[hsl(244,31%,10%)] to-transparent"></div>
        <div className="col-span-2 h-24 w-full rounded-3xl border-2 border-dashed border-white/10"></div>
        <div className="col-span-2 h-24 w-full rounded-3xl border-2 border-dashed border-white/10"></div>
      </div>

      <SectionListOfProjects posts={posts} />

      <FeaturedSections dataList={playgroundComponents} />

      <SectionFrameworksNStak />

      <SectionOpenSource />
    </div>
  )
}

/**
 * Hero
 * The last
 * - Mis favoritos
 * - Huma
 * - Link de figma
 *    - Prueba Social perfiles y numeros.
 * - Redes Sociales
 *    - Github
 *    - Linkedin
 * Top Projects
 * Sandbox
 * Frameworks
 *  - Animacion de la Mac
 * OpenSource links
 * Footer
 */
