import { Calculator, Camera, PenTool, BookOpen, Zap, HelpCircle } from "lucide-react";

interface QuickActionsProps {
  onActionSelect: (prompt: string) => void;
}

export default function QuickActions({ onActionSelect }: QuickActionsProps) {
  const actions = [
    {
      icon: Calculator,
      title: "Aritmatika",
      description: "Basic calculations",
      prompt: "Hitung 15 + 27 × 3"
    },
    {
      icon: Camera,
      title: "Foto soal",
      description: "Upload math problems", 
      prompt: "Upload foto soal matematika"
    },
    {
      icon: PenTool,
      title: "Aljabar",
      description: "Equations & variables",
      prompt: "Selesaikan persamaan: 2x + 5 = 13"
    },
    {
      icon: BookOpen,
      title: "Trigonometri",
      description: "Trigonometry help",
      prompt: "Hitung sin(30°) + cos(60°)"
    },
    {
      icon: Zap,
      title: "Kalkulus",
      description: "Derivatives & integrals",
      prompt: "Turunan dari f(x) = x³ + 2x² - 5x + 1"
    },
    {
      icon: HelpCircle,
      title: "Fisika",
      description: "Physics problems",
      prompt: "Sebuah gaya 50 N membentuk sudut 30° dengan sumbu x. Hitung komponen Fx dan Fy"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      {actions.map((action, index) => {
        const IconComponent = action.icon;
        return (
          <button
            key={action.title}
            onClick={() => onActionSelect(action.prompt)}
            className="group relative p-4 bg-card/60 hover:bg-card border border-border/50 hover:border-border rounded-2xl transition-smooth hover:scale-[1.02] text-left animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {action.title}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}