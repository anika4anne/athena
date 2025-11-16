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
        ) : (
          <div className="flex min-h-screen w-full flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 p-2">
              <button
                onClick={() => setShowCharacterSelection(false)}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs text-white transition-all hover:bg-white/20"
              >
                ←
              </button>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center">
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="text-sm font-bold text-white sm:text-base">
                  Labyrinth of Wisdom
                </h2>
              </div>
            </div>

            <div className="border-b border-white/10 p-2">
              <div className="mx-auto flex max-w-7xl justify-center gap-2 overflow-x-auto">
                {characters
                  .slice(0, Math.ceil(characters.length / 2))
                  .map((character, index) => (
                    <button
                      key={index}
                      onClick={() => setCharacterIndex(index)}
                      className={`group relative flex w-24 flex-col items-center gap-1 rounded-lg border p-2 transition-all sm:w-28 md:w-32 lg:w-36 ${
                        characterIndex === index
                          ? "border-blue-400 bg-blue-500/30 shadow-lg"
                          : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg sm:h-28 md:h-32 lg:h-36">
                        {character.image && (
                          <img
                            src={character.image}
                            alt={character.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              console.error(
                                "Failed to load grid image:",
                                character.image,
                              );
                            }}
                          />
                        )}
                      </div>
                      <div className="w-full text-center">
                        <div className="text-xs font-semibold text-white sm:text-sm md:text-base lg:text-lg">
                          {character.name}
                        </div>
                      </div>
                      {characterIndex === index && (
                        <div className="absolute top-1 right-1 text-sm text-blue-400">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center p-2">
              <div className="flex w-full max-w-2xl flex-col items-center gap-2 rounded-xl border border-white/20 bg-black p-3 md:p-4">
                <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-lg md:h-56 md:w-56 lg:h-64 lg:w-64">
                  {characters[characterIndex]?.image && (
                    <img
                      key={characterIndex}
                      src={characters[characterIndex].image}
                      alt={characters[characterIndex].name}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        console.error(
                          "Failed to load image:",
                          characters[characterIndex]?.image,
                        );
                      }}
                    />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-base font-bold text-white md:text-lg">
                    {characters[characterIndex]?.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/70 md:text-xs">
                    {characters[characterIndex]?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-2">
              <div className="mx-auto flex max-w-7xl justify-center gap-2 overflow-x-auto">
                {characters
                  .slice(Math.ceil(characters.length / 2))
                  .map((character, index) => {
                    const actualIndex =
                      Math.ceil(characters.length / 2) + index;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => setCharacterIndex(actualIndex)}
                        className={`group relative flex w-24 flex-col items-center gap-1 rounded-lg border p-2 transition-all sm:w-28 md:w-32 lg:w-36 ${
                          characterIndex === actualIndex
                            ? "border-blue-400 bg-blue-500/30 shadow-lg"
                            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg sm:h-28 md:h-32 lg:h-36">
                          {character.image && (
                            <img
                              src={character.image}
                              alt={character.name}
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                console.error(
                                  "Failed to load grid image:",
                                  character.image,
                                );
                              }}
                            />
                          )}
                        </div>
                        <div className="w-full text-center">
                          <div className="text-xs font-semibold text-white sm:text-sm md:text-base lg:text-lg">
                            {character.name}
                          </div>
                        </div>
                        {characterIndex === actualIndex && (
                          <div className="absolute top-1 right-1 text-sm text-blue-400">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const selectedCharacter = characters[characterIndex];
                    if (selectedCharacter) {
                      router.push(
                        `/playnow?character=${encodeURIComponent(selectedCharacter.name)}&image=${encodeURIComponent(selectedCharacter.image)}`,
                      );
                    }
                  }}
                  className="group rounded-lg border border-yellow-500 bg-yellow-500 px-6 py-2 text-base font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-yellow-600 hover:shadow-[0_8px_32px_0_rgba(234,179,8,0.4)]"
                >
                  Begin Journey
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
