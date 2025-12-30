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
  PlusCircle
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
}

const UNITS = [
  { id: "unit-1", label: "Unit 1: Greetings", sub: "Basic introductions" },
  { id: "unit-2", label: "Practice: Ordering Food", sub: "Restaurant scenarios" },
  { id: "unit-3", label: "Homework: Family", sub: "Describing relatives" },
  { id: "unit-4", label: "Vocab: Colors & Numbers", sub: "Essential basics" },
  { id: "unit-5", label: "Grammar: Using 'Le'", sub: "Past tense particles" },
];

export function Layout({ 
  children, 
  currentUnit, 
  onUnitChange, 
  savedChats, 
  onLoadChat, 
  onNewChat 
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
      {/* Mobile Overlay */}
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
            {/* Sidebar Header */}
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
              {/* Actions */}
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

              {/* Units Section */}
              <div className="space-y-3">
                <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-stone-400">
                  Learning Context
                </h3>
                <div className="space-y-1">
                  {UNITS.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => {
                        onUnitChange(unit.label);
                        if (isMobile) setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "group w-full flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200",
                        currentUnit === unit.label
                          ? "bg-stone-100 text-stone-900 ring-1 ring-stone-200/50 shadow-sm"
                          : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm font-semibold">{unit.label}</span>
                        {currentUnit === unit.label && (
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

              {/* Previous Chats Section */}
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
                      <button
                        key={chat.id}
                        onClick={() => {
                          onLoadChat(chat.id);
                          if (isMobile) setIsSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors text-left"
                      >
                        <MessageSquare className="h-4 w-4 opacity-50 shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar Footer */}
            <div className="border-t border-stone-100 p-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <p className="text-xs text-primary/80 leading-relaxed font-medium">
                  "Learning is a treasure that will follow its owner everywhere."
                </p>
                <p className="mt-2 text-[10px] text-primary/60 font-serif uppercase tracking-widest">
                   Chinese Proverb
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
                 Current Context: <span className="text-stone-900 ml-1">{currentUnit}</span>
               </span>
             </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
