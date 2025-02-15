"use client"
import { useEffect, useState } from "react"

export default function RewardBase(props) {
  const { title, description, base } = props
  const [formattedText, setFormattedText] = useState(["", ""])

  useEffect(() => {
    const words = description.split(" ")
    const midpoint = Math.ceil(words.length / 2)
    const line1 = words.slice(0, midpoint).join(" ")
    const line2 = words.slice(midpoint).join(" ")
    setFormattedText([line1, line2])
  }, [description])
  return (
    <svg
      width="211"
      height="103"
      viewBox="0 0 211 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_277_354)">
        <path
          d="M23.2841 38.6498C34.026 35.3448 28.6298 21.6343 26.5348 17.1598C26.1885 16.4202 25.2645 16.267 24.7261 16.881C22.2194 19.7396 16.8399 27.6373 23.9203 36.7407"
          stroke="url(#paint0_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter1_d_277_354)">
        <path
          d="M24.1508 52.9181C31.8012 44.6849 20.8463 35.591 16.221 32.6818C15.5514 32.2145 14.6746 32.5438 14.5153 33.3447C13.7738 37.0737 11.9371 47.6818 23.7473 50.9466"
          stroke="url(#paint1_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter2_d_277_354)">
        <path
          d="M34.4442 62.8477C34.032 51.6164 19.3921 53.2802 14.5277 54.1458C13.7238 54.2888 13.3367 55.1416 13.7904 55.8206C15.9028 58.9818 22.1391 66.222 32.7648 61.739"
          stroke="url(#paint2_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter3_d_277_354)">
        <path
          d="M39.3009 86.4999C43.3312 85.8635 49.4828 79.4999 46.9374 71.2269C43.6324 60.4849 29.922 65.8812 25.4474 67.9762C24.7078 68.3225 24.5547 69.2465 25.1686 69.7849C28.0273 72.2916 35.925 77.6711 45.0283 70.5907"
          stroke="url(#paint3_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g clipPath="url(#clip0_277_354)">
        <text
          x="50%"
          y="18%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current font-bold"
        >
          {title}
        </text>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-sm font-medium"
        >
          <tspan x="50%" dy="0">
            {formattedText[0]}
          </tspan>
          <tspan x="50%" dy="1.2em">
            {formattedText[1]}
          </tspan>
        </text>
        <text
          x="50%"
          y="82%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-xs font-medium"
        >
          {base}
        </text>
      </g>
      <g filter="url(#filter4_d_277_354)">
        <path
          d="M186.787 38.6498C176.045 35.3448 181.442 21.6343 183.537 17.1598C183.883 16.4202 184.807 16.267 185.345 16.881C187.852 19.7396 193.232 27.6373 186.151 36.7407"
          stroke="url(#paint4_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter5_d_277_354)">
        <path
          d="M185.921 52.9181C178.27 44.6849 189.225 35.591 193.851 32.6818C194.52 32.2145 195.397 32.5438 195.556 33.3447C196.298 37.0737 198.134 47.6818 186.324 50.9466"
          stroke="url(#paint5_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter6_d_277_354)">
        <path
          d="M175.627 62.8477C176.04 51.6164 190.679 53.2802 195.544 54.1458C196.348 54.2888 196.735 55.1416 196.281 55.8206C194.169 58.9818 187.932 66.222 177.307 61.739"
          stroke="url(#paint6_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <g filter="url(#filter7_d_277_354)">
        <path
          d="M170.771 86.4999C166.74 85.8635 160.589 79.4999 163.134 71.2269C166.439 60.4849 180.15 65.8812 184.624 67.9762C185.364 68.3225 185.517 69.2465 184.903 69.7849C182.044 72.2916 174.147 77.6711 165.043 70.5907"
          stroke="url(#paint7_linear_277_354)"
          strokeWidth="3.8182"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_277_354"
          x="14.4927"
          y="10.5878"
          width="21.172"
          height="33.9716"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_277_354"
          x="8.04053"
          y="26.5613"
          width="24.6588"
          height="32.2659"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_277_354"
          x="7.68176"
          y="47.6093"
          width="32.6715"
          height="21.4645"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_277_354"
          x="18.8755"
          y="58.8463"
          width="34.5697"
          height="33.563"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_277_354"
          x="174.407"
          y="10.5878"
          width="21.172"
          height="33.9716"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_277_354"
          x="177.372"
          y="26.5613"
          width="24.6588"
          height="32.2659"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter6_d_277_354"
          x="169.718"
          y="47.6093"
          width="32.6715"
          height="21.4645"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <filter
          id="filter7_d_277_354"
          x="156.626"
          y="58.8463"
          width="34.5697"
          height="33.563"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_277_354"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_277_354"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_277_354"
          x1="25.0786"
          y1="16.5"
          x2="25.0786"
          y2="38.6498"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_277_354"
          x1="14.4088"
          y1="32.9662"
          x2="25.4837"
          y2="52.1486"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_277_354"
          x1="25.4216"
          y1="53.7303"
          x2="23.0006"
          y2="62.7656"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_277_354"
          x1="35.7819"
          y1="64.7554"
          x2="35.7819"
          y2="86.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_277_354"
          x1="180.536"
          y1="23.5001"
          x2="218.036"
          y2="36.5001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_277_354"
          x1="185.536"
          y1="39.4999"
          x2="211.036"
          y2="47.4999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_277_354"
          x1="178.536"
          y1="54.0001"
          x2="194.036"
          y2="80.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_277_354"
          x1="162.536"
          y1="68.4999"
          x2="176.536"
          y2="101"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EEEEEE" />
        </linearGradient>
        <clipPath id="clip0_277_354">
          <rect
            width="95"
            height="83"
            fill="white"
            transform="translate(57.5358 10)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

// <div>
//   <h1>{props.title}</h1>
//   <p>{props.description}</p>
// </div>
