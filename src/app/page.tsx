'use client';

import { useEffect, useState } from 'react';

type RandomState = {
  emoji: string;
  message: string;
  gradient: string;
};

const EMOJIS = ['🌈', '✨', '🍀', '🌶️', '🌊', '🪩', '🌻', '🧊', '🍉', '🚀'];
const MESSAGES = [
  'Make today oddly wonderful',
  'Small steps, big vibes',
  'Color outside the lines',
  'Curiosity powered',
  'Build tiny, dream big',
  'Vibes set to delightful',
  'Find magic in the mundane',
  'Stay playful, stay kind',
  'Keep it simple, sparkle anyway',
  'Chase ideas, not perfection',
];
const COLORS = [
  '#ff7171',
  '#ffd36e',
  '#7dd3fc',
  '#a78bfa',
  '#34d399',
  '#f472b6',
  '#60a5fa',
  '#f59e0b',
  '#22d3ee',
  '#fca5a5',
];

function randomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomGradient() {
  const c1 = randomItem(COLORS);
  let c2 = randomItem(COLORS);
  // Ensure two distinct colors
  while (c2 === c1) c2 = randomItem(COLORS);
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${c1}, ${c2})`;
}

function makeRandom(): RandomState {
  return {
    emoji: randomItem(EMOJIS),
    message: randomItem(MESSAGES),
    gradient: randomGradient(),
  };
}

export default function Home() {
  const [rand, setRand] = useState<RandomState | null>(null);

  useEffect(() => {
    setRand(makeRandom());
  }, []);

  const shuffle = () => setRand(makeRandom());

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">Random Simple Site</h1>
        <button
          onClick={shuffle}
          className="rounded-full border border-black/10 dark:border-white/20 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
          aria-label="Shuffle the page"
        >
          Shuffle
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <section
          className="w-full max-w-3xl rounded-2xl shadow-lg ring-1 ring-black/10 dark:ring-white/10 overflow-hidden"
          style={{ backgroundImage: rand?.gradient ?? undefined }}
        >
          <div className="backdrop-blur-sm bg-white/60 dark:bg-black/40 p-10 sm:p-14 text-center">
            <div className="text-6xl sm:text-7xl mb-4 select-none" aria-hidden>
              {rand?.emoji ?? '🔄'}
            </div>
            <p className="text-lg sm:text-2xl font-medium">
              {rand?.message ?? 'Shuffling delightful randomness...'}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={shuffle}
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                <span>Shuffle</span>
                <span aria-hidden>🎲</span>
              </button>
              <a
                className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer"
              >
                Built with Next.js
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 py-4 text-center text-xs opacity-70">
        Refresh or press Shuffle for a new combo. Have fun!
      </footer>
    </div>
  );
}
