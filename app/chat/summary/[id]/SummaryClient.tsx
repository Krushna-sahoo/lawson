"use client";

import { useEffect, useState } from "react";
import { InputComp } from "@/app/_chat_components/input-comp";
import { Doc } from "@/app/_chat_components/navbar-comp/NavSidebar";
import { Typebar } from "@/app/_chat_components/typebar";
import { SummComp } from "@/app/_chat_components/summ-comp";
import { useTabsStore } from "@/app/_store/tabsStore";
import { useRouter } from "next/navigation";
import { fetchSummary } from "@/app/_helper_functions/fetchSummary";
import { vectorStore } from "@/app/_helper_functions/vectorStore";
import { toast } from "sonner";

export default function SummaryClient({ currentDoc }: { currentDoc: Doc }) {
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");
  const { activeTab } = useTabsStore();
  const router = useRouter();

  useEffect(() => {
    const performVectorStoreAndNavigate = async () => {
      if (activeTab === "chat") {
        const loadingToastId = toast.loading(
          "Loading vector store... Estimated time: 2 min",
        );
        await vectorStore(
          currentDoc.fileUrl,
          currentDoc.id,
          currentDoc.isLarge,
        );
        toast.success("Vector store loaded successfully", {
          id: loadingToastId,
        });
        toast.dismiss();
        router.push(`/chat/chatting/${currentDoc.id}`);
        toast.dismiss();
      }
    };

    performVectorStoreAndNavigate();
  }, [activeTab]);

  const handleFetchSummary = (
    type: "large" | "small" | "custom",
    prompt: string,
  ) => {
    fetchSummary(
      type,
      prompt,
      setIsLoadingSummary,
      setMarkdownContent,
      setError,
      currentDoc,
    );
  };

  return (
    <>
      <Typebar />
      <SummComp
        isLoadingSummary={isLoadingSummary}
        markdownContent={markdownContent}
        error={error}
      />
      <InputComp handlefetchSummary={handleFetchSummary} />
    </>
  );
}
