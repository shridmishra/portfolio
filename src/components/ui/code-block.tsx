"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border border-border rounded-lg bg-muted p-4">
      <Button
        variant="default"
        size="default"
        onClick={handleCopy}
        className="absolute top-2 right-2 shadow-sm"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
      <pre className="overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
