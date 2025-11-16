"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense, useCallback, useEffect, useState } from "react";

const BASE_MAZE = [
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
  ],
  [
    1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1,
    0, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    0, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1,
    0, 1, 0, 0, 1,
  ],
  [
    1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1,
    0, 1, 0, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    0, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1,
  ],
  [
    1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
  ],
];

function generateRandomMaze(): number[][] {
  const maze = BASE_MAZE.map((row) => [...row]);
  const pathCells: { row: number; col: number }[] = [];

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < (maze[row]?.length ?? 0); col++) {
      if (maze[row]?.[col] === 0) {
        pathCells.push({ row, col });
      }
    }
  }

  const shuffled = [...pathCells].sort(() => Math.random() - 0.5);
  const riddleCells = shuffled.slice(0, 10);

  riddleCells.forEach((cell) => {
    const row = maze[cell.row];
    if (row?.[cell.col] !== undefined) {
      row[cell.col] = 4;
    }
  });

  return maze;
}

const ALL_RIDDLES = [
  {
    question: "I am the king of the gods, wielder of thunderbolts. Who am I?",
    options: ["Zeus", "Poseidon", "Hades", "Apollo"],
    correct: 0,
  },
  {
    question:
      "I am the goddess of wisdom and warfare, born from my father's head. Who am I?",
    options: ["Aphrodite", "Athena", "Artemis", "Hera"],
    correct: 1,
  },
  {
    question: "I rule the underworld and am the brother of Zeus. Who am I?",
    options: ["Poseidon", "Hades", "Ares", "Hermes"],
    correct: 1,
  },
  {
    question: "I am the god of the sea, known for my trident. Who am I?",
    options: ["Zeus", "Poseidon", "Apollo", "Ares"],
    correct: 1,
  },
  {
    question:
      "I am the messenger of the gods, known for my winged sandals. Who am I?",
    options: ["Apollo", "Hermes", "Ares", "Dionysus"],
    correct: 1,
  },
  {
    question: "I am the god of war, son of Zeus and Hera. Who am I?",
    options: ["Apollo", "Ares", "Hermes", "Hephaestus"],
    correct: 1,
  },
  {
    question: "I am the goddess of love and beauty. Who am I?",
    options: ["Athena", "Artemis", "Aphrodite", "Hera"],
    correct: 2,
  },
  {
    question: "I am the god of the sun, music, and prophecy. Who am I?",
    options: ["Hermes", "Apollo", "Ares", "Dionysus"],
    correct: 1,
  },
  {
    question: "I am the goddess of the hunt and the moon. Who am I?",
    options: ["Athena", "Artemis", "Aphrodite", "Hera"],
    correct: 1,
  },
  {
    question: "I am the god of wine and celebration. Who am I?",
    options: ["Apollo", "Dionysus", "Hermes", "Ares"],
    correct: 1,
  },
  {
    question: "I am the goddess of marriage and queen of the gods. Who am I?",
    options: ["Athena", "Hera", "Aphrodite", "Artemis"],
    correct: 1,
  },
  {
    question: "I am the god of fire and the forge. Who am I?",
    options: ["Ares", "Hephaestus", "Apollo", "Hermes"],
    correct: 1,
  },
];

function shuffleRiddles() {
  return [...ALL_RIDDLES].sort(() => Math.random() - 0.5);
}

function PlayNowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [maze, setMaze] = useState<number[][]>(() => generateRandomMaze());
  const [riddles, setRiddles] = useState(() => shuffleRiddles());
  const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 });
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [moves, setMoves] = useState(0);
  const hearts = 2;
  const [showRiddle, setShowRiddle] = useState(false);
  const [currentRiddle, setCurrentRiddle] = useState<{
    question: string;
    options: string[];
    correct: number;
  } | null>(null);
  const [answeredRiddles, setAnsweredRiddles] = useState<Set<string>>(
    new Set(),
  );
  const characterName = searchParams.get("character") ?? "Athena";
  const characterImage = searchParams.get("image") ?? "/avatar/girl-base.png";

  useEffect(() => {
    setMaze(generateRandomMaze());
    setRiddles(shuffleRiddles());
  }, []);

  useEffect(() => {
    for (let row = 0; row < maze.length; row++) {
      const currentRow = maze[row];
      if (!currentRow) continue;
      for (let col = 0; col < currentRow.length; col++) {
        if (currentRow[col] === 2) {
          setPlayerPos({ row, col });
          break;
        }
      }
    }
  }, [maze]);

  const handleMove = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (hasWon || hasLost) return;
      if (showRiddle) return;

      let newRow = playerPos.row;
      let newCol = playerPos.col;

      switch (direction) {
        case "up":
          newRow = Math.max(0, playerPos.row - 1);
          break;
        case "down":
          newRow = Math.min(maze.length - 1, playerPos.row + 1);
          break;
        case "left":
          newCol = Math.max(0, playerPos.col - 1);
          break;
        case "right":
          newCol = Math.min((maze[0]?.length ?? 0) - 1, playerPos.col + 1);
          break;
      }

      const targetRow = maze[newRow];
      if (targetRow?.[newCol] !== undefined && targetRow[newCol] !== 1) {
        setPlayerPos({ row: newRow, col: newCol });
        setMoves((prev) => prev + 1);

        const cellValue = targetRow[newCol];

        if (cellValue === 4 && !showRiddle) {
          const riddleKey = `${newRow}-${newCol}`;
          if (!answeredRiddles.has(riddleKey)) {
            const randomRiddle =
              riddles[Math.floor(Math.random() * riddles.length)];
            if (randomRiddle) {
              setCurrentRiddle(randomRiddle);
              setShowRiddle(true);
              return;
            }
          }
        }

        if (cellValue === 3) {
          setHasWon(true);
        }
      }
    },
    [hasWon, hasLost, showRiddle, playerPos, maze, answeredRiddles, riddles],
  );

  const handleRiddleAnswer = (selectedIndex: number) => {
    if (!currentRiddle) return;

    const riddleKey = `${playerPos.row}-${playerPos.col}`;
    const wasCorrect = selectedIndex === currentRiddle.correct;

    setShowRiddle(false);
    setCurrentRiddle(null);

    setAnsweredRiddles((prev) => new Set(prev).add(riddleKey));

    if (!wasCorrect) {
      setHasLost(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showRiddle || hasWon || hasLost) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          handleMove("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          handleMove("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          handleMove("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          handleMove("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleMove, hasWon, hasLost, showRiddle]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[url('/bg-athena.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="text-lg">
              {i < hearts ? "❤️" : "🤍"}
            </span>
          ))}
        </div>
        <button
          onClick={() => router.push("/")}
          className="rounded-md border border-amber-800 bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-red-700"
        >
          Exit
        </button>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg border-2 border-amber-800 bg-amber-100 p-2">
            <div className="grid gap-0.5">
              {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-0.5">
                  {row.map((cell, colIndex) => {
                    const isPlayer =
                      playerPos.row === rowIndex && playerPos.col === colIndex;
                    const isEnd = cell === 3 && !isPlayer;
                    const isRiddle = cell === 4 && !isPlayer;
                    const riddleKey = `${rowIndex}-${colIndex}`;
                    const isAnswered = answeredRiddles.has(riddleKey);

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`flex h-8 w-8 items-center justify-center rounded text-xs transition-all sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ${
                          cell === 1
                            ? "bg-gray-300"
                            : cell === 3
                              ? "bg-green-500"
                              : "bg-amber-700"
                        } ${isPlayer ? "bg-blue-500 ring-1 ring-blue-300" : ""}`}
                      >
                        {isPlayer && (
                          <div className="relative z-10 flex h-full w-full items-center justify-center">
                            <Image
                              src={characterImage}
                              alt={characterName}
                              width={56}
                              height={56}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        )}
                        {isRiddle && !isAnswered && (
                          <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
                        )}
                        {isEnd && <div className="text-lg">🏆</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => handleMove("up")}
              className="rounded-md border border-amber-800 bg-amber-700 px-3 py-1 text-xs text-white transition-all hover:bg-amber-600"
            >
              ↑ Up
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => handleMove("left")}
                className="rounded-md border border-amber-800 bg-amber-700 px-3 py-1 text-xs text-white transition-all hover:bg-amber-600"
              >
                ← Left
              </button>
              <button
                onClick={() => handleMove("right")}
                className="rounded-md border border-amber-800 bg-amber-700 px-3 py-1 text-xs text-white transition-all hover:bg-amber-600"
              >
                Right →
              </button>
            </div>
            <button
              onClick={() => handleMove("down")}
              className="rounded-md border border-amber-800 bg-amber-700 px-3 py-1 text-xs text-white transition-all hover:bg-amber-600"
            >
              ↓ Down
            </button>
            <p className="mt-2 text-xs text-amber-900">
              Use arrow keys or WASD to move
            </p>
          </div>
        </div>

        {showRiddle && currentRiddle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="flex max-w-sm flex-col gap-3 rounded-xl border-2 border-amber-600 bg-black p-4">
              <h2 className="text-center text-lg font-bold text-white">
                Athena&apos;s Riddle
              </h2>
              <p className="text-center text-sm text-white">
                {currentRiddle.question}
              </p>
              <div className="flex flex-col gap-2">
                {currentRiddle.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRiddleAnswer(index);
                    }}
                    className="rounded-md border-2 border-amber-600 bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-amber-700"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasWon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-white/20 bg-black p-6">
              <div className="text-4xl">🎉</div>
              <h2 className="text-2xl font-bold text-white">
                You Escaped the Labyrinth!
              </h2>
              <p className="text-sm text-white/70">
                Completed in {moves} moves
              </p>
              <button
                onClick={() => router.push("/")}
                className="rounded-md bg-blue-500 px-6 py-2 text-base font-semibold text-white transition-all hover:bg-blue-600"
              >
                Return to Start
              </button>
            </div>
          </div>
        )}

        {hasLost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-red-500/20 bg-black p-6">
              <div className="text-4xl">💔</div>
              <h2 className="text-2xl font-bold text-white">Game Over</h2>
              <p className="text-sm text-white/70">You ran out of lives!</p>
              <button
                onClick={() => router.push("/")}
                className="rounded-md bg-red-500 px-6 py-2 text-base font-semibold text-white transition-all hover:bg-red-600"
              >
                Return to Start
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PlayNow() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-amber-50">
          <div className="text-amber-900">Loading...</div>
        </div>
      }
    >
      <PlayNowContent />
    </Suspense>
  );
}
