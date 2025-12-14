import { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clamped);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => isDragging && handleMove(e.clientX);
  const handleTouchMove = (e) => isDragging && handleMove(e.touches[0].clientX);

useEffect(() => {
  if (isDragging) return;

  let startTime = Date.now();
  let interval;
  let currentDirection = 1; // 1 = right, -1 = left

  interval = setInterval(() => {
    let elapsed = Date.now() - startTime;

    // 5 sec baad stop + center
    if (elapsed >= 6050) {
      clearInterval(interval);
      setSliderPosition(50);
      return;
    }

    // Movement logic (left ↔ right)
    setSliderPosition((prev) => {
      let next = prev + currentDirection * 1.5; // speed

      if (next >= 100) {
        currentDirection = -1; // right → left
        next = 100;
      }
      if (next <= 0) {
        currentDirection = 1; // left → right
        next = 0;
      }

      return next;
    });
  }, 30);

  return () => clearInterval(interval);
}, [isDragging]);




  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full lg:w-1/2 relative flex bg-gradient-to-br bg-[#008CFF] items-center justify-center px-5 rounded-b-[30%] md:rounded-b-none py-7 lg:px-16 min-h-[350px] md:min-h-[600px] lg:min-h-screen overflow-hidden">
      <div>
        <img
          src={assets.vectorimg}
          alt="vector image here"
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10">
        <div className="w-full md:w-[568px]  h-full  max-w-2xl mx-auto flex flex-col items-center justify-center ">
          {/* Before/After Slider */}
          <div
            ref={containerRef}
            className="relative w-[150px] h-[200px] md:w-[400px] max-w-md md:h-[460px] overflow-hidden rounded-xl cursor-ew-resize select-none shadow-2xl mb-4"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            role="img"
            aria-label="Before and after comparison slider"
          >
            {/* Right Side (AFTER image) */}
            <img src={assets.rightimg} alt="After" className="w-full h-full" />

            {/* Left Side (BEFORE image) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={assets.leftimg}
                alt="Before"
                className="w-full h-full"
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gray-600 shadow-lg transition-none z-10"
              style={{
                left: `${sliderPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-9 bg-[#576572] rounded-3xl shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-white/50 transition-transform hover:scale-110">
                <img
                  className="w-full h-full rounded-3xl px-1"
                  src={assets.gifficon}
                  alt=""
                />
              </div>  
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center">
            <h2 className="text-[26px] lg:text-4xl font-semibold tracking-tight leading-tight text-white mb-1">
              Your Vision, Our Expertise
            </h2>
            <p className="text-[14px] md:w-full md:text-[17px] font-light leading-relaxed text-white/90 mx-auto">
              Experience seamless collaboration where your goals meet our
              professional expertise. Together, we create exceptional results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
