import { ImageResponse } from "next/og"

import { ogImageSchema } from "@/lib/validations/og"
export const runtime = "edge"

const interRegular = fetch(
  new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const interBold = fetch(
  new URL("../../../assets/fonts/CalSans-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    const fontRegular = await interRegular
    const fontBold = await interBold

    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading

    const { mode } = values
    const paint = mode === "dark" ? "#fff" : "#000"

    const fontSize = heading.length > 100 ? "70px" : "100px"

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start "
          style={{
            color: paint,
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #000 0%, #111 100%)"
                : "white",
          }}
        >
          <div tw="flex absolute inset-0 h-full w-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1200"
              height="630"
              viewBox="0 0 1200 630"
              fill="none"
            >
              <g clip-path="url(#clip0_169_893)">
                <g opacity="0.75" filter="url(#filter0_f_169_893)">
                  <path
                    d="M1366.25 3.59763C1373.89 -10.2222 1290.78 -30.6857 1248.27 -39.19C1260.67 -80.1682 1277.45 -165.728 1245.32 -180.142C1205.17 -198.159 1158.9 -137.6 1142.61 -124.966C1126.31 -112.332 1087.37 -96.7344 994.854 -57.8331C902.342 -18.9318 910.23 -84.0284 800.709 -39.1901C691.189 5.64824 662.728 142.124 653 162.863C645.218 179.454 781.958 125.929 800.709 142.581C851.841 106.858 805.295 330.512 800.709 338.5C794.977 348.485 977.36 134.667 1089.5 198.5C1201.64 262.332 1164.78 205.966 1173.94 214.274C1183.1 222.583 1356.7 20.8725 1366.25 3.59763Z"
                    fill="#EF0A33"
                  />
                  <path
                    d="M519.173 -61.9118L835.282 -108.793L851.815 -92.0922C884.221 -91.5742 951.849 -87.6956 963.105 -76.3246C977.176 -62.111 1087.17 52.5884 1050.31 87.1079C1015.71 119.513 998.166 97.8694 963.105 109.359C935.057 118.551 845.6 134.036 836.651 109.359C845.152 84.2794 851.021 37.6714 855.291 12.808C849.092 9.10912 842.172 7.65711 835.282 11.5884C833.979 36.0951 758.096 136.136 748.479 136.136C581.5 136.136 473.534 61.5706 464 82.5C441.78 71.8984 480.588 14.9007 474.173 -2.95115C467.758 -20.803 506.486 -23.5561 519.173 -61.9118Z"
                    fill="#FF5C00"
                  />
                  <path
                    d="M1103 348.535C1106.59 285.082 1124.74 136.341 1168.66 49L1242.58 145.497C1265.18 166.492 1310.9 211.283 1312.91 222.48C1315.42 236.477 1266.62 405.841 1253.34 419.838C1242.72 431.035 1126.8 357.867 1103 348.535Z"
                    fill="#FF512F"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_f_169_893"
                  x="267"
                  y="-333.463"
                  width="1560.54"
                  height="1040.86"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="75"
                    result="effect1_foregroundBlur_169_893"
                  />
                </filter>
                <clipPath id="clip0_169_893">
                  <rect width="1200" height="630" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <img
            tw="shadow-xl border rounded-3xl"
            width={100}
            height={100}
            alt="Logo"
            src="https://richard.darkpixl.com/images/logo-richard.png"
          />
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-3xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              RICHARD VINUEZA | PORTFOLIO
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{
                fontFamily: "Cal Sans",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
            <div tw="flex">
              <p tw="bg-gray-100 rounded-full px-4 py-2 mt-8 uppercase">
                {values.type}
              </p>
              <p tw="bg-gray-200 ml-3 rounded-full px-4 py-2 mt-8 uppercase">
                {values.status}
              </p>
            </div>
          </div>

          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              richard.darkpixl.com
            </div>
            <div
              tw="flex items-center text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke={paint}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke={paint}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/richardnarvaez/richardnarvaez</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Cal Sans",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
