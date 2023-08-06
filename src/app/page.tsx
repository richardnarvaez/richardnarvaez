import Image from 'next/image'

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <header className="z-10 w-full max-w-5xl">
            <div className="relative w-full z-20 items-center justify-center  flex flex-col gap-4">
               <Image
                  src="/img/Perfil.jpg"
                  alt="Vercel Logo"
                  className="bg-white rounded-3xl aspect-square border-4 border-white"
                  width={100}
                  height={100}
                  priority
               />
               <Image
                  src="/img/aws_icon.png"
                  alt="Blur"
                  className="w-24 absolute bottom-32 -right-20 md:bottom-32 md:right-16 z-0 "
                  width={120}
                  height={120}
               />
               <Image
                  src="/img/next_icon.png"
                  alt="Blur"
                  className="w-32 absolute bottom-32 -left-32 md:bottom-32 md:left-0 z-0 "
                  width={120}
                  height={120}
               />
               <Image
                  src="/img/vercel_icon.png"
                  alt="Blur"
                  className="w-16 absolute top-16 -left-8 md:top-16 md:left-32 z-0 "
                  width={120}
                  height={120}
               />
               <Image
                  src="/img/figma_icon.png"
                  alt="Blur"
                  className="w-24 absolute top-16 -right-20 md:top-16 md:right-0 z-0 "
                  width={120}
                  height={120}
               />
               <h1 className="text-3xl font-bold text-center">I&apos;m Richard Vinueza</h1>
               <h2 style={{
                opacity: "1",
                background: "-webkit-radial-gradient(100% 0%, #39e5ae, #1861db)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"

               }}className="text-6xl md:text-8xl opacity-70 z-10  max-w-3xl text-center font-extrabold ">
                  SOFTWARE ENGINEER
               </h2>
               <h3 className="flex flex-col text-center text-lg">
                  Over the last 5 years, I&apos;ve empowered 9+ companies
                  <span className="hidden md:block opacity-70 max-w-2xl">
                     Developing user-centric interfaces that captivate and engage audiences and make
                     a real impact.
                  </span>
               </h3>
               <div className="flex gap-4 mt-8">
                  <a className='hover:bg-white/25 p-2 rounded-lg' href="https://www.linkedin.com/in/richardvnarvaez" target="_blank">
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
                  <a className='hover:bg-white/25 p-2 rounded-lg' href="https://twitter.com/richardvnarvaez" target="_blank">
                     <svg
                        height="24px"
                        width="24px"
                        version="1.1"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                     >
                        <rect height="400" style={{ fill: 'none' }} width="400" x="56" y="56" />
                        <path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" />
                     </svg>
                  </a>
                  <a className='hover:bg-white/25 p-2 rounded-lg' href="https://github.com/richardnarvaez" target="_blank">
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
                  <a className='hover:bg-white/25 p-2 rounded-lg' href="https://www.figma.com/@richardvnarvaez" target="_blank">
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
               className="w-full absolute top-0 left-0 z-0"
               width={180}
               height={90}
            />
         </header>
         {/* 
         <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div> */}
      </main>
   )
}
