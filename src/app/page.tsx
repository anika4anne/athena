"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);

  const [characterIndex, setCharacterIndex] = useState(0);

  const characters = [
    {
      name: "Zeus",
      description: "King of the Gods",
      image: "/avatar/zeus.png",
    },
    {
      name: "Athena",
      description: "Goddess of Wisdom",
      image: "/avatar/athena.png",
    },
    {
      name: "Poseidon",
      description: "God of the Sea",
      image: "/avatar/poseidon.png",
    },
    { name: "Ares", description: "God of War", image: "/avatar/ares.png" },
    {
      name: "Apollo",
      description: "God of Light",
      image: "/avatar/apollo.png",
    },
    {
      name: "Artemis",
      description: "Goddess of the Hunt",
      image: "/avatar/artemis.png",
    },
    {
      name: "Hermes",
      description: "Messenger God",
      image: "/avatar/hermes.png",
    },
    {
      name: "Hades",
      description: "God of the Underworld",
      image: "/avatar/hades.png",
    },
    {
      name: "Aphrodite",
      description: "Goddess of Love",
      image: "/avatar/aphrodite.png",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = false;
    video.addEventListener("pause", (e) => {
      if (!video.ended) {
        e.preventDefault();
        video.play().catch(() => {
          // Ignore play errors
        });
      }
    });
    video.addEventListener("contextmenu", (e) => e.preventDefault());
    video.addEventListener("ended", () => {
      video.pause();
      video.currentTime = video.duration;
    });

    video.play().catch(() => {
      // Ignore autoplay errors
    });
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
        <source src="/opening-2.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex min-h-screen flex-col text-white">
        {!showCharacterSelection ? (
          <>
            <div className="animate-fade-in pt-24 text-center sm:pt-32 md:pt-40">
              <h1 className="title-3d text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
                Labyrinth of Wisdom
              </h1>
            </div>

            <div className="mt-auto pb-16">
              <div className="animate-fade-in-delay flex justify-center">
                <button
                  onClick={() => setShowCharacterSelection(true)}
                  className="group rounded-xl border border-white/20 bg-white/10 px-10 py-4 text-xl font-semibold text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-white/30 hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]"
                >
                  Start Now
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          </>
       