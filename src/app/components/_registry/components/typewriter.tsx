"use client";

import React, { useState, useEffect } from "react";

export const TypewriterText = () => {
  const [text, setText] = useState("");
  const fullText = "Hello, I'm a typewriter effect...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-3xl font-mono">
      {text}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export const typewriterCode = `const TypewriterText = () => {
  const [text, setText] = useState("");
  const fullText = "Hello, I'm a typewriter effect...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return <div>{text}<span className="animate-pulse">|</span></div>;
};`;
