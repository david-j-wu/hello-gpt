import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // Defining state hooks
  const [reply, setReply] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Making a client-side request to our endpoint
  async function onSubmit(event) {
    event.preventDefault();
    setLoadingStatus(true);
    try {
      const response = await fetch("/api/hello");
      const body = await response.json();

      setReply(response.status === 200 ? body.completion : body.error.message);
    } catch {
      setReply("An error has occurred");
    }
    setLoadingStatus(false);
  }

  // Creating the UI
  return (
    <>
      <Head>
        <title>Hello, GPT!</title>
        <meta
          name="description"
          content={
            '"Hello, GPT!": A simple ChatGPT-powered app' +
            " built with Next.js and Tailwind CSS"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex h-screen max-w-xs flex-col">
        <div className="mt-32">
          <h1 className="text-center text-6xl font-bold text-blue-300">
            Hello, GPT!
          </h1>
        </div>
        <div className="mx-auto my-6">
          <Image
            src="waving-hand.svg"
            width={120}
            height={120}
            alt="A cartoon drawing of a waving hand"
            priority
          />
        </div>
        <div className="mx-auto">
          <form onSubmit={onSubmit}>
            <button
              className="mb-3 rounded-md border-2 border-blue-600 bg-blue-600 
              px-4 py-2 hover:border-blue-700 hover:bg-blue-700"
              type="submit"
            >
              <p className="text-[20px] font-bold text-white">Say hello</p>
            </button>
          </form>
        </div>
        {loadingStatus ? (
          <div className="mx-auto mt-3">
            <Image src="three-dots.svg" width={60} height={15} />
          </div>
        ) : (
          <div className="mt-3">
            <p
              className="whitespace-pre-line text-center text-[20px] 
              font-bold text-slate-600"
            >
              {reply}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
