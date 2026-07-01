

import "./index.css";
import Canvas from "./Canvas";
import data from "./data";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {

    const lenis = new Lenis({

      duration: 1.4,

      smoothWheel: true,

      wheelMultiplier: 1,

      touchMultiplier: 2,

      infinite: false,

    });

    function raf(time) {

      lenis.raf(time);

      requestAnimationFrame(raf);

    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {

      lenis.destroy();

    };

  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          // gsap.to(growingSpan.current, {
          //   scale: 1000,
          //   duration: 2,
          //   ease: "power2.inOut",
          //   onComplete: () => {
          //     gsap.set(growingSpan.current, {
          //       scale: 0,
          //       clearProps: "all",
          //     });
          //   },
          // });
          gsap.fromTo(
            growingSpan.current,
            {
              scale: 0
            },
            {
              scale: 850,
              duration: 1.6,
              ease: "expo.inOut"
            }
          );
        } else {
          // gsap.to("body", {
          //   color: "#fff",
          //   backgroundColor: "#000",
          //   duration: 1.2,
          //   ease: "power2.inOut",
          // });
          gsap.to("body", {

            color: "#000",

            backgroundColor: "#fd2c2a",

            duration: 1.5,

            ease: "expo.inOut",

          })
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);

  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas key={index} details={canvasdets} />)}
        <div className="w-full relative z-50 h-screen ">
          {/* <nav className="w-full p-8 flex justify-between z-50"> */}
          <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-[1500px] z-[999] rounded-full
backdrop-blur-xl bg-white/5 border border-white/10
px-10 py-5 flex justify-between items-center
transition-all duration-500">
            <div className="brand text-3xl font-semibold tracking-tight cursor-pointer hover:tracking-wider duration-500">thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "Home",
                "About",
                "Projects",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                 className="
relative
text-[15px]
font-medium
tracking-wide
text-white/80
hover:text-white
duration-300

after:absolute
after:left-0
after:-bottom-1
after:w-0
after:h-[2px]
after:bg-white
after:duration-300
hover:after:w-full
"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className=" relative z-50 w-full px-[8%] pt-36">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className=" relative z-50 text-[15rem] font-normal tracking-tight leading-none pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative min-h-screen  mt-32 px-10 pb-20">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <h1 className="text-8xl tracking-tighter">about the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
}

export default App;




