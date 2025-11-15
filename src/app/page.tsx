"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = false;
    video.addEventListener("pause", (e) => {
      if (!video.ended) {
        e.preventDefault();
        video.play().catch(() => {});
      }
    });
    video.addEventListener("contextmenu", (e) => e.preventDefault());
    video.addEventListener("ended", () => {
      video.pause();
      video.currentTime = video.duration;
    });

    video.play().catch(() => {});
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={(e) => {
          const v = e.currentTarget;
          v.pause();
          v.currentTime = v.duration;
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/opening.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start text-white">
        <div className="flex flex-col items-center gap-12 pt-24 sm:pt-32 md:pt-40">
          <div className="animate-fade-in text-center">
            <h1 className="title-3d text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Labyrinth of Wisdom
            </h1>
          </div>

          <div className="animate-fade-in-delay">
            <button className="group rounded-lg bg-blue-500 px-10 py-4 text-xl font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-blue-600 hover:shadow-2xl">
              Start Now
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
