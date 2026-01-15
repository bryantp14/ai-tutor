import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Mic, Sparkles, Download, AlertTriangle, Trash2 } from "lucide-react"; // ✅ UPDATED: Removed FileText
import { useChat } from "@/hooks/use-chat";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

// If you get a TypeScript error here, add "// @ts-ignore" on the line above it
// @ts-ignore
import html2pdf from "html2pdf.js";

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

const INITIAL_GREETING: Message = {
  role: "assistant",
  content: "你好！Let's start chatting using specific vocabulary. For feedback, just type 'feedback'!"
};

export default function Home() {
  const [currentUnit, setCurrentUnit] = useState("lesson-1");
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState("");
  const [chatId, setChatId] = useState<string>(() => uuidv4());
  const [savedChats, setSavedChats] = useState<Omit<SavedChat, "messages" | "unit">[]>([]);
  
  // State for deletion modal
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  useEffect(() => {
    if (messages.length > 0) {
      const isJustGreeting = messages.length === 1 && messages[0].content === INITIAL_GREETING.content;
      
      if (!isJustGreeting) {
        const chatData: SavedChat = {
          id: chatId,
          title: messages.find(m => m.role === "user")?.content.slice(0, 30) + "..." || "New Chat",
          date: new Date().toISOString(),
          messages,
          unit: currentUnit
        };
        localStorage.setItem(`chat_${chatId}`, JSON.stringify(chatData));
        
        setSavedChats(prev => {
          const exists = prev.find(p => p.id === chatId);
          if (!exists) {
            return [{ id: chatId, title: chatData.title, date: chatData.date }, ...prev];
          }
          return prev;
        });
      }
    }
  }, [messages, chatId, currentUnit]);

  // --- Deletion Handlers ---
  const initiateDelete = (id: string) => {
    setChatToDelete(id);
  };

  const confirmDelete = () => {
    if (!chatToDelete) return;

    localStorage.removeItem(`chat_${chatToDelete}`);
    setSavedChats(prev => prev.filter(c => c.id !== chatToDelete));

    if (chatToDelete === chatId) {
        startNewChat();
    }

    setChatToDelete(null);
    toast({
      title: "Chat Deleted",
      description: "The session has been removed from your history.",
      variant: "destructive"
    });
  };

  const cancelDelete = () => {
    setChatToDelete(null);
  };

  // --- PDF Export Only ---
  const handleExportPDF = () => {
    const element = document.getElementById("chat-export-area"); 
    
    if (!element) return;

    const opt = {
      margin:       1,
      filename:     `Chinese_Tutor_Session_${new Date().toISOString().slice(0,10)}.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' } as const
    };

    // @ts-ignore
    html2pdf().set(opt).from(element).save();
    
    toast({
      title: "Exporting Chat",
      description: "Your transcript is being downloaded as a PDF.",
    });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSendMessage();
      }
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
    setMessages([INITIAL_GREETING]); 
    setInputValue("");
  };

  return (
    <Layout
      currentUnit={currentUnit}
      onUnitChange={setCurrentUnit}
      savedChats={savedChats}
      onLoadChat={loadChat}
      onNewChat={startNewChat}
      // @ts-ignore
      onDeleteChat={initiateDelete} 
    >
      <div className="flex-1 overflow-y-auto px-4 py-8">
        
        <div id="chat-export-area" className="mx-auto max-w-3xl min-h-full flex flex-col justify-start">
          
        <div className="mb-8 text-center">
             <span className="inline-flex items-start text-left gap-1.5 px-3 py-1 rounded-3xl bg-stone-100 text-[10px] font-medium text-stone-400 uppercase tracking-widest border border-stone-200 max-w-2xl mx-auto leading-relaxed">
               <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
               <span>
                 AI Tutor • When engaging with a GenAI language model like ChatGPT or other GenAI tools, do not provide information such as name, university ID#, phone number, address etc. which is personal information. Doing so is a violation of privacy regulations.
               </span>
             </span>
          </div>

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
        </div>
      </div>

      <div className="p-4 lg:p-6 bg-white border-t border-stone-100">
        
        {/* Export Button Container - Only PDF now */}
        <div className="mx-auto max-w-3xl flex justify-end mb-2">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleExportPDF}
                className="text-stone-400 hover:text-stone-600 text-xs"
                title="Download as PDF (For Submission)"
            >
                <Download className="h-3 w-3 mr-1" />
                Export Transcript (.pdf)
            </Button>
        </div>

        <form 
          onSubmit={handleSendMessage}
          className="mx-auto max-w-3xl relative flex items-end gap-3"
        >
          <div className="relative flex-1">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message in English or Chinese..."
              className="w-full pl-4 pr-12 py-4 rounded-2xl border-stone-200 bg-stone-50 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 shadow-inner transition-all text-base resize-none min-h-[52px] max-h-[200px]"
              disabled={chatMutation.isPending}
              rows={1}
            />
            <div className="absolute right-3 top-3 text-stone-400 hover:text-primary cursor-pointer transition-colors">
               <Mic className="h-5 w-5" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || chatMutation.isPending}
            className="h-[52px] w-[52px] rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center shrink-0"
            data-testid="button-send-message"
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

      {/* Deletion Confirmation Modal */}
      {chatToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200 scale-100 animate-in zoom-in-95 duration-200">
            
            <div className="bg-red-50 p-6 border-b border-red-100 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full border border-red-100 shadow-sm">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-800">Delete this chat?</h3>
                <p className="text-sm text-stone-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-sm text-stone-600">
                <p className="font-semibold text-stone-800 mb-1">⚠️ Wait! Have you exported?</p>
                If this chat contains important vocabulary or grammar notes, please ensure you have exported it as a PDF first.
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={cancelDelete}
                className="bg-white hover:bg-stone-100 text-stone-700"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Delete it
              </Button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}