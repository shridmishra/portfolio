import { NextRequest, NextResponse } from "next/server";
import { COMPONENTS_REGISTRY } from "@/src/components/ui-showcase/registry";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  const cleanName = name.replace(/\.json$/, "");

  const item = COMPONENTS_REGISTRY.find((c) => c.id === cleanName);

  if (!item) {
    return NextResponse.json(
      { error: `Component "${cleanName}" not found in registry.` },
      { status: 404 }
    );
  }

  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.id,
    type: "registry:ui",
    title: item.name,
    description: item.description,
    dependencies: item.dependencies,
    files: [
      {
        path: `components/ui/${item.id}.tsx`,
        content: item.sourceCode,
        type: "registry:ui",
        target: "",
      },
    ],
  };

  return NextResponse.json(registryItem, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
