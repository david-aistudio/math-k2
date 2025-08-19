import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen claude-gradient flex flex-col">
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan | Math K-2</title>
        <meta name="description" content="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Math K-2." />
        <meta property="og:title" content="404 - Halaman Tidak Ditemukan | Math K-2" />
        <meta property="og:description" content="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Math K-2." />
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
          <p className="text-sm font-medium text-foreground">404</p>
          <p className="text-xs text-muted-foreground">Page Not Found</p>
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
