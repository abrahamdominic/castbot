"use client";
import { useState } from "react";
import Image from "next/image";
import { postCast } from "./farcaster/client";
import { ConnectWallet } from "./components/ConnectWallet";

export default function Home() {
  const [post, setPost] = useState("");
  const [isCasting, setIsCasting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: post }),
      });
      const data = await response.json();
      setPost(data.text);
    } catch (error) {
      console.error("Failed to generate content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCast = async () => {
    setIsCasting(true);
    try {
      await postCast(post);
      setPost("");
    } catch (error) {
      console.error("Failed to cast:", error);
    } finally {
      setIsCasting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 bg-white p-8 dark:bg-black sm:items-start">
        <header className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Castbot logo"
              width={30}
              height={30}
              priority
            />
            <h1 className="text-xl font-bold tracking-tight text-black dark:text-zinc-50">
              Castbot
            </h1>
          </div>
          <ConnectWallet />
        </header>

        <div className="flex w-full flex-col gap-4">
          <textarea
            className="h-40 w-full rounded-md border border-solid border-black/[.08] bg-white p-4 text-black dark:border-white/[.145] dark:bg-zinc-900 dark:text-white"
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              className="flex h-12 w-full items-center justify-center rounded-full bg-blue-500 px-5 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300 md:w-[158px]"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
            <button
              className="flex h-12 w-full items-center justify-center rounded-full bg-purple-500 px-5 text-white transition-colors hover:bg-purple-600 disabled:bg-purple-300 md:w-[158px]"
              onClick={handleCast}
              disabled={isCasting}
            >
              {isCasting ? "Casting..." : "Cast"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
