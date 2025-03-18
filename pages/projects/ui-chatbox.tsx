// pages/projects/ui-chatbot.tsx
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Chatbot UI main component
const ChatbotApp = dynamic(
  () => import("../../components/UIChatbot/ChatbotApp"),
  {
    ssr: false, // disable SSR if the component relies on browser-only APIs
  }
);

export default function ChatbotUIPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <ChatbotApp />
    </div>
  );
}
