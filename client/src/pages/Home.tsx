import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Mic, Sparkles } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SavedChat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  unit: string;
}

export default function Home() {
  const [currentUnit, setCurrentUnit] = useState("Unit 1: Greetings");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState<string>(() => uuidv4());
  const [savedChats, setSavedChats] = useState<Omit<SavedChat, "messages" | "unit">[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();
  const { toast } = useToast();

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load saved chats metadata on mount
  useEffect(() => {
    const loadHistory = () => {
      const keys = Object.keys(localStorage);
      const chats = keys
        .filter(k => k.startsWith("chat_"))
        .map(k => {
          try {
            const data = JSON.parse(localStorage.getItem(k) || "{}");
            return { id: k.replace("chat_", ""), title: data.title, date: data.date };
          } catch {
            return null;
          }
        })
        .filter((c): c is Omit<SavedChat, "messages" | "unit"> => c !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setSavedChats(chats);
    };
    loadHistory();
  }, []);

  // Save current chat to local storage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      const chatData: SavedChat = {
        id: chatId,
        title: messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? "..." : ""),
        date: new Date().toISOString(),
        messages,
        unit: currentUnit
      };
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(chatData));
      
      // Update sidebar list if it's a new chat title
      setSavedChats(prev => {
        const exists = prev.find(p => p.id === chatId);
        if (!exists) {
          return [{ id: chatId, title: chatData.title, date: chatData.date }, ...prev];
        }
        return prev;
      });
    }
  }, [messages, chatId, currentUnit]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    // Add user message immediately
    const newHistory = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newHistory);

    try {
      const response = await chatMutation.mutateAsync({
        message: userMessage,
        unitId: currentUnit,
        history: messages.map(m => ({ role: m.role, content: m.content }))
      });

      setMessages(prev => [...prev, { role: "assistant", content: response.message }]);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
      // Optional: remove the user message if it failed
    }
  };

  const loadChat = (id: string) => {
    try {
      const data = JSON.parse(localStorage.getItem(`chat_${id}`) || "{}");
      if (data.messages) {
        setChatId(id);
        setMessages(data.messages);
        if (data.unit) setCurrentUnit(data.unit);
      }
    } catch (error) {
      console.error("Failed to load chat", error);
    }
  };

  const startNewChat = () => {
    setChatId(uuidv4());
    setMessages([]);
    setInputValue("");
  };

  return (
    <Layout
      currentUnit={currentUnit}
      onUnitChange={setCurrentUnit}
      savedChats={savedChats}
      onLoadChat={loadChat}
      onNewChat={startNewChat}
    >
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto max-w-3xl min-h-full flex flex-col justify-start">
          {/* Disclaimer */}
          <div className="mb-8 text-center">
             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-[10px] font-medium text-stone-400 uppercase tracking-widest border border-stone-200">
               <Sparkles className="h-3 w-3" />
               AI Tutor • Do not share personal information
             </span>
          </div>

          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center shadow-inner">
                 <span className="text-4xl">👋</span>
              </div>
              <div className="space-y-2 max-w-md">
                <h1 className="text-3xl font-serif font-bold text-stone-800">
                  有什么可以帮你的吗？
                </h1>
                <p className="text-stone-500">
                  Welcome to your Elementary Chinese Tutor. Select a unit from the sidebar or type a message to start practicing!
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-8">
                {["Explain 'Le' particle", "How do I say 'Coffee'?", "Quiz me on colors", "Practice ordering food"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInputValue(suggestion);
                      // Optional: auto-send
                    }}
                    className="px-4 py-3 rounded-xl border border-stone-200 bg-white hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all text-sm text-stone-600 text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} role={msg.role} content={msg.content} />
              ))}
              {chatMutation.isPending && (
                <div className="flex items-center gap-2 text-stone-400 text-sm ml-4 animate-pulse">
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce delay-0" />
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce delay-150" />
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce delay-300" />
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 lg:p-6 bg-white border-t border-stone-100">
        <form 
          onSubmit={handleSendMessage}
          className="mx-auto max-w-3xl relative flex items-center gap-3"
        >
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message in English or Chinese..."
              className="w-full pl-4 pr-12 py-6 rounded-2xl border-stone-200 bg-stone-50 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 shadow-inner transition-all text-base"
              disabled={chatMutation.isPending}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-primary cursor-pointer transition-colors">
               <Mic className="h-5 w-5" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || chatMutation.isPending}
            className="h-[52px] w-[52px] rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center shrink-0"
          >
            <SendHorizontal className="h-6 w-6 ml-0.5" />
          </Button>
        </form>
        <div className="text-center mt-3">
          <p className="text-[10px] text-stone-400">
             Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </Layout>
  );
}
