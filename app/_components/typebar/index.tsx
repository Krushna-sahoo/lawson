"use client";

import { Tabs } from "./tabs";

export function Typebar() {
  const tabs = [
    {
      title: "summary",
    },
    {
      title: "chat",
    },
    {
      title: "semantic search",
    },
  ];

  return (
    <div className="mt-3 flex w-full flex-col items-center justify-center">
      <Tabs tabs={tabs} />
    </div>
  );
}
