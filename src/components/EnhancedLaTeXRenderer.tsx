import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface EnhancedLaTeXRendererProps {
  text: string;
  className?: string;
}

export const EnhancedLaTeXRenderer: React.FC<EnhancedLaTeXRendererProps> = ({ 
  text, 
  className = '' 
}) => {
  // Enhanced LaTeX pattern detection
  const latexPatterns = [
    /\$\$([^$]+)\$\$/g,        // Block math: $$x^2$$
    /\$([^$]+)\$/g,            // Inline math: $x^2$
    /\\\(([^)]+)\\\)/g,        // \(x^2\)
    /\\\[([^\]]+)\\\]/g,       // \[x^2\]
    /\\begin\{([^}]+)\}([^]*?)\\end\{\1\}/g  // \begin{equation}...\end{equation}
  ];

  // Convert common math symbols to LaTeX
  const convertToLatex = (input: string): string => {
    return input
      // Basic operations
      .replace(/(\d+)\^(\d+)/g, '$1^{$2}')  // x^2 → x^{2}
      .replace(/(\d+)_(\d+)/g, '$1_{$2}')   // x_2 → x_{2}
      .replace(/√(\d+)/g, '\\sqrt{$1}')     // √16 → \sqrt{16}
      .replace(/π/g, '\\pi')                 // π → \pi
      .replace(/θ/g, '\\theta')              // θ → \theta
      .replace(/α/g, '\\alpha')              // α → \alpha
      .replace(/β/g, '\\beta')               // β → \beta
      .replace(/∫/g, '\\int')                // ∫ → \int
      .replace(/∂/g, '\\partial')            // ∂ → \partial
      .replace(/∞/g, '\\infty')              // ∞ → \infty
      .replace(/±/g, '\\pm')                 // ± → \pm
      .replace(/×/g, '\\times')              // × → \times
      .replace(/÷/g, '\\div')                // ÷ → \div
      .replace(/≤/g, '\\leq')                // ≤ → \leq
      .replace(/≥/g, '\\geq')                // ≥ → \geq
      .replace(/≠/g, '\\neq')                // ≠ → \neq
      .replace(/≈/g, '\\approx')             // ≈ → \approx
      // Fractions
      .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')  // 1/2 → \frac{1}{2}
      // Functions
      .replace(/sin\(/g, '\\sin(')           // sin( → \sin(
      .replace(/cos\(/g, '\\cos(')           // cos( → \cos(
      .replace(/tan\(/g, '\\tan(')           // tan( → \tan(
      .replace(/log\(/g, '\\log(')           // log( → \log(
      .replace(/ln\(/g, '\\ln(')             // ln( → \ln(
      .replace(/exp\(/g, '\\exp(')           // exp( → \exp(
      .replace(/lim\(/g, '\\lim(')           // lim( → \lim(
      // Subscripts and superscripts
      .replace(/([a-zA-Z])_(\d+)/g, '$1_{$2}')     // x_1 → x_{1}
      .replace(/([a-zA-Z])\^(\d+)/g, '$1^{$2}');   // x^2 → x^{2}
  };

  // Check if text contains LaTeX patterns
  const containsLatex = (text: string): boolean => {
    return latexPatterns.some(pattern => pattern.test(text)) ||
           /[√πθαβ∫∂∞±×÷≤≥≠≈]/.test(text) ||
           /\d+\^\d+|\d+_\d+|\d+\/\d+/.test(text);
  };

  // Render text with LaTeX
  const renderWithLatex = (text: string): React.ReactNode[] => {
    if (!containsLatex(text)) {
      return [<span key="text">{text}</span>];
    }

    const convertedText = convertToLatex(text);
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Find and render LaTeX patterns
    latexPatterns.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(convertedText)) !== null) {
        // Add text before LaTeX
        if (match.index > lastIndex) {
          parts.push(
            <span key={`text-${lastIndex}`}>
              {convertedText.slice(lastIndex, match.index)}
            </span>
          );
        }

        // Add LaTeX
        const latexContent = match[1] || match[2];
        try {
          if (pattern.source.includes('$$') || pattern.source.includes('\\[')) {
            // Block math
            parts.push(
              <BlockMath 
                key={`latex-${match.index}`}
                math={latexContent}
                errorColor="red"
              />
            );
          } else {
            // Inline math
            parts.push(
              <InlineMath 
                key={`latex-${match.index}`}
                math={latexContent}
                errorColor="red"
              />
            );
          }
        } catch (error) {
          // Fallback to text if LaTeX rendering fails
          parts.push(
            <span key={`fallback-${match.index}`} className="text-red-500">
              {match[0]}
            </span>
          );
        }

        lastIndex = match.index + match[0].length;
      }
    });

    // Add remaining text
    if (lastIndex < convertedText.length) {
      parts.push(
        <span key={`text-end`}>
          {convertedText.slice(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : [<span key="text">{text}</span>];
  };

  return (
    <div className={`enhanced-latex ${className}`}>
      {renderWithLatex(text)}
    </div>
  );
};

// Utility function to detect if text contains math
export const containsMath = (text: string): boolean => {
  const mathPatterns = [
    /\$\$.*?\$\$/g,
    /\$.*?\$/g,
    /\\\(.*?\\\)/g,
    /\\\[.*?\\\]/g,
    /[√πθαβ∫∂∞±×÷≤≥≠≈]/g,
    /\d+\^\d+|\d+_\d+|\d+\/\d+/g,
    /\b(sin|cos|tan|log|ln|exp|lim)\b/g
  ];
  
  return mathPatterns.some(pattern => pattern.test(text));
};

// Utility function to extract LaTeX from text
export const extractLatex = (text: string): string[] => {
  const latexExpressions: string[] = [];
  const patterns = [
    /\$\$([^$]+)\$\$/g,
    /\$([^$]+)\$/g,
    /\\\(([^)]+)\\\)/g,
    /\\\[([^\]]+)\\\]/g
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      latexExpressions.push(match[1] || match[2]);
    }
  });

  return latexExpressions;
};
