import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import QuickActions from "@/components/QuickActions";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ProblemGeneratorComponent } from "@/components/ProblemGenerator";
import { MathEngine, MathSolution } from "@/lib/mathEngine";
import { EnhancedMathEngine } from "@/lib/enhancedMathEngine";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mathSolution?: MathSolution;
  imageUrl?: string; // For user uploaded images
}

const Index = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProblemGenerator, setShowProblemGenerator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, sender: 'user' | 'ai', mathSolution?: MathSolution, imageUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      mathSolution,
      imageUrl
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (userMessage: string, imageFile?: File) => {
    // Add user message with optional image
    const userImageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;
    addMessage(userMessage, 'user', undefined, userImageUrl);
    setIsProcessing(true);

    try {
      // Use Enhanced AI-powered math solver (with optional image)
      let solution: MathSolution;
      
      if (imageFile) {
        // For image analysis, use original engine
        solution = await MathEngine.solve(userMessage, imageFile);
      } else {
        // For text input, use enhanced engine
        solution = await EnhancedMathEngine.solve(userMessage);
      }
      
      let aiResponse = '';
      if (solution.type === 'conversation') {
        aiResponse = solution.steps[solution.steps.length - 1]?.result || solution.finalAnswer;
      } else {
        const typeMap = {
          'arithmetic': 'aritmatika',
          'algebra': 'aljabar', 
          'trigonometry': 'trigonometri',
          'calculus': 'kalkulus',
          'geometry': 'geometri'
        };
        const sourceText = imageFile ? 'dari gambar yang kamu kirim' : 'kamu';
        aiResponse = `AI telah menyelesaikan soal ${typeMap[solution.type as keyof typeof typeMap] || solution.type} ${sourceText}! Ini penjelasan langkah demi langkahnya:`;
      }
      
      // Always add the AI message with mathSolution
      addMessage(aiResponse, 'ai', solution);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Maaf, AI sedang mengalami gangguan. Coba lagi sebentar!';
      
      addMessage(errorMessage, 'ai');
      
      toast({
        title: "AI sedang gangguan",
        description: "Coba lagi dalam beberapa saat atau gunakan contoh di bawah ini.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectExample = (example: string) => {
    handleSendMessage(example);
  };

  return (
    <div className="min-h-screen claude-gradient flex flex-col">
      <Helmet>
        <title>Math K-2 - Asisten Matematika AI Profesional</title>
        <meta name="description" content="Asisten matematika AI yang menyelesaikan soal dari SD hingga Universitas dengan penjelasan langkah demi langkah." />
        <meta property="og:title" content="Math K-2 - Asisten Matematika AI Profesional" />
        <meta property="og:description" content="Asisten matematika AI yang menyelesaikan soal dari SD hingga Universitas dengan penjelasan langkah demi langkah." />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:image" content="/logo.svg" />
      </Helmet>
      
      {/* Demo Banner */}
      {messages.length === 0 && (
        <div className="w-full bg-yellow-500/20 border-b border-yellow-500/30 p-2 text-center">
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            ℹ️ Ini adalah proyek <strong>DEMO</strong> untuk tujuan presentasi. Beberapa fitur mungkin dibatasi. 
            <Link to="/about" className="underline ml-1">Pelajari lebih lanjut</Link>
          </p>
        </div>
      )}
      
      {/* Consistent Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
        {messages.length > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMessages([])}
            className="w-9 h-9 p-0 text-muted-foreground hover:text-foreground rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        ) : (
          <div className="w-9 h-9"></div>
        )}
        <div className="text-center absolute left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-medium text-foreground">{t('welcome', 'Math K-2')}</p>
          {messages.length > 0 && (
            <p className="text-xs text-muted-foreground">{t('readyToHelp', 'Siap membantu Anda')}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          {messages.length === 0 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProblemGenerator(!showProblemGenerator)}
                className="text-muted-foreground hover:text-foreground w-8 h-8 p-0"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground w-8 h-8 p-0"
              >
                <Link to="/about">
                  <Info className="w-4 h-4" />
                </Link>
              </Button>
            </>
          )}
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="w-9 h-9 p-0 text-muted-foreground hover:text-foreground rounded-lg"
            >
              <Link to="/about">
                <Info className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {messages.length === 0 ? (
          // Welcome Screen dengan Quick Actions - NORMAL LAYOUT
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl mx-auto text-center space-y-8">
              {/* Header with Title */}
              <div className="w-full">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('welcome', 'Math K-2')}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {t('whatCanIHelp', 'Apa yang bisa saya bantu?')}
                </p>
              </div>
              
              {/* Problem Generator */}
              {showProblemGenerator && (
                <div className="mb-8">
                  <ProblemGeneratorComponent />
                </div>
              )}
              
              {/* Quick Action Buttons - NORMAL FLOW */}
              <QuickActions onActionSelect={handleSendMessage} />
            </div>
          </div>
        ) : (
          // Chat Interface - SCROLLABLE ONLY
          <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full">
              <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
                <div className="space-y-8">
                  {messages.map((message, index) => (
                    <div key={message.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ChatMessage message={message} />
                    </div>
                  ))}
                  
                  {isProcessing && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="card-gradient border border-border rounded-2xl rounded-tl-md p-4 message-shadow">
                        <div className="flex items-center gap-3">
                          <div className="typing-dots">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                          </div>
                          <span className="text-sm text-muted-foreground">AI sedang menganalisis...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
        
        {/* Fixed Input Area - ALWAYS FIXED */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm sticky bottom-0 z-50">
          <div className="max-w-4xl mx-auto p-4">
            <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
