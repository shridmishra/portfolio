import React from "react";

export const SeparatorLine = () => {
  return (
    <div className="flex relative w-full my-2 h-px">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-px w-screen bg-border/80" />
    </div>
  );
};
