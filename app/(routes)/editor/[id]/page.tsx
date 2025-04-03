"use client";

import { usePathname } from "next/navigation";
import { files } from "@/data/data";
import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";

import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const id = usePathname().split("/")[2];
  const file = files.find((f) => f.slug === id);

  const [nameChange, setNameChange] = useState<string | undefined>(file?.name);
  const [textChange, setTextChange] = useState<string | undefined>(file?.content);

  // READER (napravi posebnu komponentu)
  // const [currentWordIndex, setCurrentWord] = useState<number>(0);
  // const [pause, setPause] = useState<boolean>(false);

  // const [defaultSpeed, setDefaultSpeed] = useState<number>(300);
  // const [currentSpeed, setCurrentSpeed] = useState<number>(300);

  // const readMode = file?.content.split(" ");

  const paragraph = file?.content;

  const [pause, setPause] = useState<boolean>(true);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [word, setWord] = useState<string>("");
  const [defaultSpeed, setDefaultSpeed] = useState<number>(300);
  const [currentSpeed, setCurrentSpeed] = useState<number>(300);

  useEffect(() => {
    const handleSpeed = (speed: number, condition: boolean) => {
      if (condition) {
        setCurrentSpeed(defaultSpeed + speed);
        setTimeout(() => (condition ? setCurrentSpeed(defaultSpeed) : setCurrentSpeed(defaultSpeed + speed)), defaultSpeed + speed);
      }
    };

    //? Uspori na duzim recima
    handleSpeed(200, word.length > 10);
    //? Uspori na pocetku i kad je kraj recenice
    handleSpeed(500, wordIndex === 0 || word.endsWith("."));
    //? Uspori kad je zarez
    handleSpeed(200, word.endsWith(","));
    //? Pauziraj kad se zavrsi citanje paragrafa
    if (wordIndex === paragraph?.length) setPause(true);
    //////////////////////////////////////////////////////////
  }, [paragraph, word, wordIndex, defaultSpeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pause && wordIndex < paragraph?.length) {
        setWordIndex(wordIndex < paragraph?.length ? wordIndex + 1 : paragraph?.length);
        setWord(paragraph?.split(" ")[wordIndex]!);
      } else clearTimeout(timer);
    }, currentSpeed);

    return () => {
      clearInterval(timer);
      console.log("h2");
    };
  }, [paragraph, pause, wordIndex, currentSpeed]);
  // -----------

  const documentName = useEditor({
    extensions: [StarterKit],
    content: file?.name,
  });

  const documentText = useEditor({
    extensions: [StarterKit],
    content: file?.content,
  });

  return (
    <div className={`grid grid-flow-row ${!pause ? "grid-cols-1" : "grid-cols-2"} h-full`}>
      {pause ? (
        <div className="flex flex-col gap-10 p-10">
          <h1 className="text-2xl font-bold">
            <EditorContent editor={documentName} />
          </h1>

          <EditorContent editor={documentText} />

          <button
            className="px-10 py-2 bg-gray-200 self-end"
            onClick={() => {
              console.log(nameChange, textChange);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="border-l flex flex-col justify-center items-center gap-10 p-10">
        <span>{currentSpeed} WPS</span>
        <h1 className="text-5xl font-bold">{word}</h1>

        <div className="flex flex-row gap-5">
          {pause ? (
            <button className="px-10 py-2 bg-gray-200 self-end" onClick={() => setPause((prev) => !prev)}>
              Play
            </button>
          ) : (
            <button className="px-10 py-2 bg-gray-200 self-end" onClick={() => setPause((prev) => !prev)}>
              Pause
            </button>
          )}

          {/* <button
            className="px-10 py-2 bg-gray-200 self-end"
            onClick={() => {
              setWordIndex((prev) => (prev > 0 ? prev - 1 : 0));
            }}
          >
            Previous
          </button>

          <button
            className="px-10 py-2 bg-gray-200 self-end"
            onClick={() => {
              setWordIndex((prev) => (prev < readMode.split(" ")?.length - 1 ? prev + 1 : readMode.split(" ")?.length - 1));
            }}
          >
            Next
          </button> */}
        </div>

        {/* {pause && (
          <div className="flex flex-row flex-wrap gap-1">
            {paragraph?.split(" ")?.map((word, i) => (
              <span className={i === wordIndex ? "bg-yellow-200" : ""} key={word + i}>
                {word}
              </span>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
