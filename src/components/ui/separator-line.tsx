import React from "react";

export const SeparatorLine = () => {
  return (
    <div className="flex relative my-2 h-px w-[calc(100%+1rem)] -ml-2 sm:w-[calc(100%+2rem)] sm:-ml-4">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-px w-full bg-border/80" />
    </div>
  );
};
