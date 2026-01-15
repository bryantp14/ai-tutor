import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  MessageSquare, 
  Menu, 
  X, 
  GraduationCap, 
  History,
  ChevronRight,
  PlusCircle,
  Trash2,
  Sparkles, // Used for the proverb box
  RefreshCw // Used for the visual hint to cycle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  currentUnit: string;
  onUnitChange: (unit: string) => void;
  savedChats: { id: string; title: string; date: string }[];
  onLoadChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

// ✅ The collection of Proverbs
const PROVERBS = [
  { chinese: "学而时习之，不亦说乎？", english: "Is it not pleasant to learn with a constant perseverance and application?", pinyin: "Xué ér shí xí zhī..." },
  { chinese: "千里之行，始于足下。", english: "A journey of a thousand miles begins with a single step.", pinyin: "Qiān lǐ zhī xíng..." },
  { chinese: "熟能生巧。", english: "Practice makes perfect.", pinyin: "Shú néng shēng qiǎo." },
  { chinese: "授人以鱼不如授人以渔。", english: "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime.", pinyin: "Shòu rén yǐ yú..." },
  { chinese: "温故而知新。", english: "Review the old to learn the new.", pinyin: "Wēn gù ér zhī xīn." },
  { chinese: "读万卷书，行万里路。", english: "Read ten thousand books, travel ten thousand miles.", pinyin: "Dú wàn juàn shū..." },
  { chinese: "世上无难事，只怕有心人。", english: "Nothing is impossible to a willing heart.", pinyin: "Shì shàng wú nán shì..." }
];

const UNITS = [
  { 
    id: "unit-1", 
    label: "Lesson 1: Greetings", 
    sub: "Basic introductions" 
  },
  { 
    id: "unit-2", 
    label: "Lesson 2: Family", 
    sub: "Describing relatives" 
  },
  { 
    id: "unit-3",
    label: "Lesson 3: Dates & Time", 
    sub: "Time, dates, invitations" 
  },
  // START OF FIX
  {
    id: "unit-4", 
    label: "Lesson 4: Hobbies", // Changed from 'title' to 'label'
    sub: "Discussing interests & plans" // Changed from 'description' to 'sub'
  },
  {
    id: "unit-5",
    label: "Lesson 5: Visiting Friends", // Changed from 'title' to 'label'
    sub: "Welcoming visitors & offering drinks" // Changed from 'description' to 'sub'
  }
  // END OF FIX
];

export function Layout({ 
  children, 
  currentUnit, 
  onUnitChange, 
  savedChats, 
  onLoadChat, 
  onNewChat,
  onDeleteChat
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ PROVERB STATE
  // Initialize with a random proverb
  const [dailyProverb, setDailyProverb] = useState(() => {
    return PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
  });

  // ✅ CYCLE FUNCTION
  const cycleProverb = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * PROVERBS.length);
      // Ensure we don't pick the exact same one twice in a row
    } while (PROVERBS[newIndex].chinese === dailyProverb.chinese && PROVERBS.length > 1);
    
    setDailyProverb(PROVERBS[newIndex]);
  };

  const activeUnitLabel = UNITS.find(u => u.id === currentUnit)?.label || currentUnit;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Mask */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed lg:static z-50 flex h-full w-80 flex-col border-r border-stone-200 bg-white/80 backdrop-blur-xl shadow-xl lg:shadow-none",
            )}
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-serif font-bold text-lg text-stone-800">
                  AI Tutor
                </span>
              </div>
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
              {/* New Session Button */}
              <div>
                <Button 
                  onClick={() => {
                    onNewChat();
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className="w-full justify-start gap-2 bg-stone-900 text-white hover:bg-stone-800 shadow-md hover:shadow-lg transition-all"
                >
                  <PlusCircle className="h-4 w-4" />
                  New Session
                </Button>
              </div>

              {/* Units */}
              <div className="space-y-3">
                <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-stone-400">
                  Learning Context
                </h3>
                <div className="space-y-1">
                  {UNITS.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => {
                        onUnitChange(unit.id); 
                        if (isMobile) setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "group w-full flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200",
                        currentUnit === unit.id
                          ? "bg-stone-100 text-stone-900 ring-1 ring-stone-200/50 shadow-sm"
                          : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm font-semibold">{unit.label}</span>
                        {currentUnit === unit.id && (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-stone-400 font-normal">
                        {unit.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* History Section */}
              <div className="space-y-3">
                <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                  <History className="h-3 w-3" />
                  History
                </h3>
                <div className="space-y-1">
                  {savedChats.length === 0 ? (
                    <div className="px-3 py-4 text-xs text-stone-400 italic text-center border border-dashed border-stone-200 rounded-lg">
                      No past sessions yet.
                    </div>
                  ) : (
                    savedChats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => {
                          onLoadChat(chat.id);
                          if (isMobile) setIsSidebarOpen(false);
                        }}
                        className="group relative w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <MessageSquare className="h-4 w-4 opacity-50 shrink-0" />
                          <span className="truncate max-w-[160px]">{chat.title}</span>
                        </div>

                        {/* Delete Button (Only visible on hover) */}
                        <button
                           onClick={(e) => {
                             e.stopPropagation();
                             onDeleteChat(chat.id);
                           }}
                           className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-all absolute right-2 bg-white/80 backdrop-blur-sm"
                           title="Delete Chat"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer with Proverb Cycler */}
            <div className="border-t border-stone-100 p-4">
              <div 
                onClick={cycleProverb}
                className="group relative rounded-xl bg-primary/5 p-4 border border-primary/10 cursor-pointer hover:bg-primary/10 transition-all duration-300"
                title="Click for a new proverb"
              >
                {/* Decoration Icons */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <RefreshCw className="h-3 w-3 text-primary/50" />
                </div>
                <div className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 text-primary fill-primary/20" />
                </div>

                <p className="font-serif font-bold text-stone-800 text-sm mb-1">
                    {dailyProverb.chinese}
                </p>
                <p className="text-xs text-stone-400 mb-2 font-mono">
                    {dailyProverb.pinyin}
                </p>
                <p className="text-xs text-primary/80 leading-relaxed font-medium">
                  "{dailyProverb.english}"
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative z-0">
        <header className="h-16 flex items-center px-4 lg:px-8 border-b border-stone-100 bg-white/50 backdrop-blur-sm sticky top-0 z-30">
          {!isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1 flex items-center justify-center">
             <div className="bg-stone-100/50 px-4 py-1.5 rounded-full border border-stone-200/50">
               <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                 Current Context: <span className="text-stone-900 ml-1">{activeUnitLabel}</span>
               </span>
             </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}