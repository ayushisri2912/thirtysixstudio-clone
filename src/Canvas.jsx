// import { useEffect, useRef, useState } from "react"
// import canvasImages from "./canvasimages";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

// function Canvas({ details }) {
//   const { startIndex, numImages, duration, size, top, left, zIndex } = details;
//   const [index, setIndex] = useState(startIndex );
//   const canvasRef = useRef(null);

//   useGSAP(() => {
//     gsap.to(index, {
//       value: startIndex + numImages - 1,
//       duration: duration,
//       repeat: -1,
//       ease: "linear",
//       onUpdate: () => {
//         setIndex({ value: Math.round(index.value) });
//       },
//     },[]);
    

//     gsap.from(canvasRef.current, {
//       opacity:0,
//       duration: 1,
//       ease: "power2.inout"
//     });
//   });

//   useEffect(() => {
//     const scale = window.devicePixelRatio;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     img.src = canvasImages[index.value];
//     img.onload = () => {

//       canvas.width = canvas.offsetWidth * scale;
//       canvas.height = canvas.offsetHeight * scale;
//       canvas.style.width = canvas.offsetWidth + "px";
//       canvas.style.height = canvas.offsetHeight + "px";

//       ctx.scale(scale, scale);
//       ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
//     };

    
//   }, [index]);
//   return (
//     <canvas
//     data-scroll
//     data-scroll-speed={Math.random().toFixed(1) }
//       ref={canvasRef}
//       className="absolute -z-10"
//       style={{
//         width: `${size * 1.7}px`,
//         height: `${size * 1.7}px`,
//         top: `${top}%`,
//         left: `${left}%`,
//         // zIndex: `${zIndex}`
//       }}
//       id='canvas'
//     ></canvas>
//   );

// }

// export default Canvas;


import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const {
    startIndex,
    numImages,
    duration,
    size,
    top,
    left,
  } = details;

  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const speedRef = useRef((Math.random() * 2 + 0.5).toFixed(1));

  const [frame, setFrame] = useState(startIndex);

  // Preload Images
  useEffect(() => {
    imagesRef.current = canvasImages.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  // GSAP Animation
  useGSAP(() => {
    const obj = {
      value: startIndex,
    };

    const tween = gsap.to(obj, {
      value: startIndex + numImages - 1,
      duration,
      repeat: -1,
      ease: "none",

      onUpdate: () => {
        setFrame(Math.round(obj.value));
      },
    });

    gsap.from(canvasRef.current, {
      opacity: 0,
      scale: 0.8,
      rotate: 5,
      filter: "blur(20px)",
      duration: 1.8,
      ease: "expo.out",
    });

    return () => {
      tween.kill();
    };
  }, []);

  // Draw Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
     if (!canvas) return;

    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
   
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const img = imagesRef.current[frame];

    if (!img) return;

    const draw = () => {
      const scale = window.devicePixelRatio || 1;

      // canvas.width = canvas.offsetWidth * scale;
      // canvas.height = canvas.offsetHeight * scale;

      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      ctx.clearRect(
        0,
        0,
        canvas.offsetWidth,
        canvas.offsetHeight
      );

      ctx.drawImage(
        img,
        0,
        0,
        canvas.offsetWidth,
        canvas.offsetHeight
      );
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }
  }, [frame]);

  return (
    <canvas
      ref={canvasRef}
      data-scroll
      data-scroll-speed={speedRef.current}
      // className="absolute -z-10"
      className="absolute z-40 "
      style={{
        width: `${size * 1.7}px`,
        height: `${size * 1.7}px`,
        top: `${top}%`,
        left: `${left}%`,
      }}
    />
  );
}

export default Canvas;