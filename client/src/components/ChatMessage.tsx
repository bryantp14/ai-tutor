import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { GraduationCap, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isAi = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex w-full gap-4 max-w-3xl mx-auto mb-8",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      {/* Avatar (Left for AI) */}
      {isAi && (
        <div className="shrink-0 h-10 w-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-primary">
          <GraduationCap className="h-5 w-5" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "relative px-6 py-4 rounded-2xl shadow-sm text-sm leading-relaxed max-w-[85%] md:max-w-[75%]",
          isAi
            ? "bg-white text-stone-800 border border-stone-100 rounded-tl-none"
            : "bg-primary text-white shadow-primary/25 shadow-lg rounded-tr-none"
        )}
      >
        <div className={cn("prose prose-sm", isAi ? "prose-stone" : "prose-invert")}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {/* Avatar (Right for User) */}
      {!isAi && (
        <div className="shrink-0 h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
          <User className="h-5 w-5" />
        </div>
      )}
    </motion.div>
  );
}
