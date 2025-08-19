import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Camera, X, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string, imageFile?: File) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || selectedImage) && !disabled) {
      onSendMessage(message.trim() || "Tolong bantu saya dengan soal ini:", selectedImage || undefined);
      setMessage("");
      clearImage();
    }
  };

  const handleImageSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "File tidak didukung",
        description: "Silakan pilih file gambar (JPG, PNG, HEIC, dll)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: "Ukuran gambar maksimal 10MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    toast({
      title: "Gambar dipilih",
      description: `${file.name} siap dikirim`
    });
  };

  const clearImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      {/* Image Preview */}
      {previewUrl && (
        <div className="mb-4 relative">
          <div className="card-gradient border border-border rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview soal matematika" 
                  className="w-20 h-20 object-cover rounded-lg border border-border"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Image className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {selectedImage?.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Siap untuk di-analisis AI • {(selectedImage?.size || 0 / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearImage}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className="relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center gap-2">
            {/* Image Upload Button - Left side */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="w-9 h-9 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-smooth flex-shrink-0"
            >
              <Image className="w-4 h-4" />
            </Button>
            
            <Textarea
              placeholder={selectedImage ? "Tanya tentang gambar..." : "Ketik soal atau upload foto..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={disabled}
              className="flex-1 min-h-[60px] max-h-[200px] card-gradient border-2 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground rounded-2xl resize-none pr-16 py-4 px-6 text-sm leading-relaxed transition-smooth shadow-lg"
              rows={1}
            />
          </div>
          
          {/* Send Button - Right side */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Button
              type="submit"
              disabled={disabled || (!message.trim() && !selectedImage)}
              size="sm"
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground rounded-xl px-4 py-2 transition-smooth shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {disabled ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </form>
    </div>
  );
}