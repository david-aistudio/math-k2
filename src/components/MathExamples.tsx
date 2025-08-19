import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Circle, MessageCircle, Beaker } from "lucide-react";
import { MathEngine } from "@/lib/mathEngine";

interface MathExamplesProps {
  onSelectExample: (example: string) => void;
}

export default function MathExamples({ onSelectExample }: MathExamplesProps) {
  const examples = [
    {
      category: "Aritmatika",
      icon: Calculator,
      items: ["berapa 1 + 1?", "hitung 2 × 3", "5^2 berapa?", "berapa (15 + 25) ÷ 2?"]
    },
    {
      category: "Aljabar", 
      icon: TrendingUp,
      items: ["x^2 - 5x + 6 = 0", "2x^2 + 7x - 15 = 0", "x^2 + 4x + 4 = 0"]
    },
    {
      category: "Trigonometri",
      icon: Circle,
      items: ["sin(30 derajat)", "cos(45 derajat)", "tan(60 derajat)"]
    },
    {
      category: "Kimia",
      icon: Beaker,
      items: ["Gas metana (CH4) dibakar sempurna dengan oksigen murni. Diketahui: Volume CH4 = 10,0 L - Volume O2 tersedia = 25,0 L"]
    },
    {
      category: "Ngobrol",
      icon: MessageCircle,
      items: ["hai, gimana kabarnya?", "kamu bisa apa aja?", "terima kasih ya!"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Asisten AI Matematika
        </h2>
        <p className="text-slate-300 text-lg">
          Tanya apa saja tentang matematika dan saya akan selesaikan langkah demi langkah!
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {examples.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card key={category.category} className="bg-slate-800/50 border-slate-600/50 hover:border-violet-500/30 transition-colors backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-100">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.items.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start font-mono text-xs bg-slate-700/30 text-slate-200 border-slate-600/50 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-white"
                    onClick={() => onSelectExample(example)}
                  >
                    {example}
                  </Button>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-violet-500/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3 text-slate-100">Yang bisa saya selesaikan:</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Operasi aritmatika dasar (+, -, ×, ÷, ^, √)</li>
            <li>• Persamaan kuadrat dalam bentuk ax² + bx + c = 0</li>
            <li>• Fungsi trigonometri (sin, cos, tan) dalam derajat atau radian</li>
            <li>• Stoikiometri kimia (pembakaran, reaksi redoks)</li>
            <li>• Ngobrol santai dan tanya jawab umum</li>
            <li>• Penjelasan langkah demi langkah untuk semua solusi</li>
            <li>• Pertanyaan dalam bahasa Indonesia natural</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}