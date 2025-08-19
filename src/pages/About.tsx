import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Cpu, Zap, Calculator, Brain, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen claude-gradient flex flex-col">
      <Helmet>
        <title>Tentang Math K-2 - Asisten Matematika AI</title>
        <meta name="description" content="Pelajari lebih lanjut tentang Math K-2, asisten matematika AI yang membantu menyelesaikan soal dari SD hingga Universitas." />
        <meta property="og:title" content="Tentang Math K-2 - Asisten Matematika AI" />
        <meta property="og:description" content="Pelajari lebih lanjut tentang Math K-2, asisten matematika AI yang membantu menyelesaikan soal dari SD hingga Universitas." />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:image" content="/logo.svg" />
      </Helmet>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
        <Button
          variant="ghost" 
          size="sm"
          asChild
          className="w-9 h-9 p-0 text-muted-foreground hover:text-foreground rounded-lg"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="text-center absolute left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-medium text-foreground">About</p>
          <p className="text-xs text-muted-foreground">Math K-2</p>
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="p-6 card-gradient border border-border">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center mx-auto border-2 border-primary/20 bg-primary/10">
                <span className="text-2xl font-bold text-primary">AD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ahmad David</h1>
                <p className="text-sm text-muted-foreground mt-1">Developer & AI Enthusiast</p>
              </div>
            </div>
          </Card>

          {/* About Math K-2 */}
          <Card className="p-6 card-gradient border border-border">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Tentang Math K-2</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Math K-2 adalah asisten matematika AI yang dirancang untuk membantu siswa dan pelajar 
                dalam menyelesaikan berbagai jenis soal matematika. Aplikasi ini menggunakan teknologi 
                AI terdepan untuk memberikan solusi langkah demi langkah yang mudah dipahami.
              </p>
            </div>
          </Card>

          {/* Technology Stack */}
          <Card className="p-6 card-gradient border border-border">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Teknologi Yang Digunakan</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">React + TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">MathJS Engine</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">LaTeX Rendering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">Advanced AI Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground font-medium">Real-time Calculation</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Features */}
          <Card className="p-6 card-gradient border border-border">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Fitur Utama</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm text-muted-foreground">Penyelesaian soal matematika dengan langkah-langkah detail</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm text-muted-foreground">Support untuk berbagai jenis matematika (Aritmatika, Aljabar, Kalkulus, dll)</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm text-muted-foreground">Rendering LaTeX untuk tampilan rumus yang profesional</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm text-muted-foreground">Interface yang user-friendly dan responsif</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-sm text-muted-foreground">Quick actions untuk soal-soal yang umum</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Demo Information */}
          <Card className="p-6 card-gradient border border-border bg-yellow-500/10">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">ℹ️ Informasi Demo</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ini adalah proyek <strong className="text-foreground">DEMO</strong> yang dibuat untuk tujuan presentasi dan showcase kemampuan teknologi AI dalam menyelesaikan soal matematika.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">Proyek ini tidak untuk produksi langsung</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">API key yang digunakan adalah untuk demo/testing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">Beberapa fitur mungkin memiliki keterbatasan</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6 card-gradient border border-border">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Kontak Developer</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground">
              Dibuat dengan ❤️ oleh Ahmad David menggunakan teknologi AI modern
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;