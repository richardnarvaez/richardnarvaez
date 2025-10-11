import { api } from "@/lib/api"

const directusUrl = process.env.DIRECTUS_URL

export async function getFavTools() {
  try {
    const resp = await api("/por_fav_tools")
    console.log(resp)
    return resp.data.map((item) => ({
      ...item,
      icon: item.icon ? directusUrl + item.icon : null,
    }))
  } catch (error) {
    return [
      {
        title: "Brandfetch",
        description: "Brand Logos",
        url: "https://brandfetch.com",
        icon: "https://asset.brandfetch.io/idL0iThUh6/idXGq6SIu2.svg",
      },
      {
        title: "svgl",
        description: "Good SVG Icons",
        url: "https://svgl.app/",
        icon: "",
      },
      {
        title: "Pinterest",
        description: "Inspiration",
        url: "https://www.pinterest.com/search/pins/?q=ui%20saas%20page",
        icon: "",
        theme: "ligth",
      },
      {
        title: "Refero",
        description: "Designs from the best products",
        url: "https://refero.design/",
        icon: "https://asset.brandfetch.io/idiWIi67lS/id824DNM84.png",
      },
      {
        title: "Makepill",
        description: "Inspiration",
        url: "https://makepill.com/",
      },
      {
        title: "Stripe",
        description: "Payments",
        icon: "",
      },
      {
        title: "gsap",
        url: "https://gsap.com/",
      },
      {
        title: "RailWay",
        description: "Backend Deployment",
        url: "https://railway.app",
        icon: "",
      },

      {
        title: "Open AI",
        description: "AI development environment",
        icon: "",
      },
      {
        title: "Figma",
        description: "Design",
        icon: "",
      },
      {
        title: "Vercel",
        description: "Frontend Deployment",
        icon: "",
      },
      {
        title: "AWS",
        description: "EC2, Lambdas, ECS, S3",
        icon: "",
      },
      {
        title: "N8N",
        description: "Automatization",
        icon: "",
      },
      {
        title: "Strapi",
        description: "HeadLess CMS",
        icon: "",
      },
      {
        title: "Spline",
        description: "3D Design",
        url: "https://spline.design",
        icon: "",
      },
      {
        title: "Stripe",
        description: "Payments",
        icon: "",
      },
      {
        title: "Medusa",
        description: "Open Source E-Commerce",
        url: "https://medusajs.com/",
        icon: "",
      },
      {
        title: "Framer Motion",
        description: "Animations",
        icon: "",
      },
      {
        title: "Resend",
        description: "Send Emails",
        icon: "https://asset.brandfetch.io/id0BqaqET6/idwjc1TygR.jpeg",
      },
    ]
  }
}
