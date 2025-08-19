import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User, Copy, Check, Calculator, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathSolution } from "@/lib/mathEngine";
import TypingAnimation from "./TypingAnimation";
import { EnhancedLaTeXRenderer, containsMath } from "./EnhancedLaTeXRenderer";


interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    mathSolution?: MathSolution;
    imageUrl?: string; // For user uploaded images
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [showSteps, setShowSteps] = useState(false);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const isUser = message.sender === 'user';

  useEffect(() => {
    if (!isUser) {
      // Reset typing animation when new message
      setTypingComplete(false);
      setShowSteps(false);
    }
  }, [message.id, isUser]);

  const copyToClipboard = (text: string, stepIndex?: number) => {
    navigator.clipboard.writeText(text);
    if (stepIndex !== undefined) {
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    }
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
    if (message.mathSolution) {
      setTimeout(() => setShowSteps(true), 300);
    }
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : 'text-left'} ${!isUser ? 'ml-0' : ''}`}>
        <div className={`inline-block transition-smooth ${isUser 
          ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-md' 
          : 'card-gradient border border-border rounded-2xl rounded-tl-md'
        } p-4 message-shadow`}>
          
          {/* User Image */}
          {message.imageUrl && isUser && (
            <div className="mb-3">
              <img 
                src={message.imageUrl} 
                alt="Uploaded math problem" 
                className="max-w-sm rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => window.open(message.imageUrl, '_blank')}
              />
            </div>
          )}

          {/* Message Text */}
          {(message.content || (message.mathSolution && message.mathSolution.type === 'conversation')) && (
            <div className="text-sm leading-relaxed">
              {isUser ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <TypingAnimation 
                  text={message.content || (message.mathSolution?.type === 'conversation' ? message.mathSolution.finalAnswer : '')} 
                  onComplete={handleTypingComplete}
                  className="whitespace-pre-wrap"
                />
              )}
            </div>
          )}

          {/* AI Solution Image (if from vision analysis) */}
          {message.mathSolution?.imageUrl && !isUser && typingComplete && (
            <div className="mt-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-xs font-medium text-primary">Gambar yang dianalisis:</span>
              </div>
              <img 
                src={message.mathSolution.imageUrl} 
                alt="Analyzed math problem" 
                className="max-w-xs rounded-lg border border-border/50 shadow-sm"
              />
            </div>
          )}
          
          {/* Math Solution - Only show for actual math problems, NOT conversation */}
          {message.mathSolution && !isUser && typingComplete && message.mathSolution.type !== 'conversation' && (
            <div className={`mt-4 space-y-4 ${showSteps ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="border-t border-border/50 pt-4">
                
                {/* Solution Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <h4 className="font-semibold text-primary text-sm">
                    Solusi Langkah demi Langkah:
                  </h4>
                </div>
                
                {/* Steps */}
                <div className="space-y-3">
                  {message.mathSolution.steps.map((step, index) => (
                    <div 
                      key={index} 
                      className="step-container p-4"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          {/* Step Number */}
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              Langkah {index + 1}
                            </span>
                          </div>
                          
                          {/* Mathematical Expression with LaTeX support */}
                          <div className="math-formula">
                            {containsMath(step.step) ? (
                              <EnhancedLaTeXRenderer text={step.step} />
                            ) : (
                              <code className="text-sm font-mono">{step.step}</code>
                            )}
                          </div>
                          
                          {/* Explanation */}
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-medium">Penjelasan:</span> {step.explanation}
                          </p>
                          
                          {/* Result */}
                          {step.result && (
                            <div className="mt-2 p-2 bg-primary/10 rounded border border-primary/20">
                              <span className="text-xs font-medium text-primary">Hasil: </span>
                              <code className="text-sm font-mono text-foreground">{step.result}</code>
                            </div>
                          )}
                        </div>
                        
                        {/* Copy Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(step.step, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedStep === index ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Final Answer */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl border border-primary/30 animate-scale-in">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
                      <span className="text-lg font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">Jawaban Final:</p>
                      <div className="text-lg font-bold text-foreground">
                        {containsMath(message.mathSolution.finalAnswer) ? (
                          <EnhancedLaTeXRenderer text={message.mathSolution.finalAnswer} />
                        ) : (
                          <span className="font-mono">{message.mathSolution.finalAnswer}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(message.mathSolution.finalAnswer)}
                      className="ml-auto"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-muted-foreground mt-2 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
}