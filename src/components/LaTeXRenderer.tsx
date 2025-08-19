import { memo } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LaTeXRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

const LaTeXRenderer = memo(({ math, block = false, className = "" }: LaTeXRendererProps) => {
  // Clean and prepare math expression
  const cleanMath = math
    .replace(/\*/g, '\\cdot ') // Replace * with multiplication dot
    .replace(/\^(\w)/g, '^{$1}') // Add braces to single character exponents
    .replace(/sqrt\(/g, '\\sqrt{') // Convert sqrt( to \sqrt{
    .replace(/sin\(/g, '\\sin(') // Convert sin( to \sin(
    .replace(/cos\(/g, '\\cos(') // Convert cos( to \cos(
    .replace(/tan\(/g, '\\tan(') // Convert tan( to \tan(
    .replace(/log\(/g, '\\log(') // Convert log( to \log(
    .replace(/ln\(/g, '\\ln(') // Convert ln( to \ln(
    .replace(/\b(\d+)\/(\d+)\b/g, '\\frac{$1}{$2}') // Convert fractions
    .replace(/integral/gi, '\\int') // Convert integral to \int
    .replace(/derivative/gi, '\\frac{d}{dx}') // Convert derivative
    .replace(/alpha/gi, '\\alpha')
    .replace(/beta/gi, '\\beta')
    .replace(/gamma/gi, '\\gamma')
    .replace(/delta/gi, '\\delta')
    .replace(/theta/gi, '\\theta')
    .replace(/pi/gi, '\\pi')
    .replace(/infinity/gi, '\\infty');

  try {
    if (block) {
      return (
        <div className={`my-4 p-4 bg-muted/20 rounded-lg border border-border text-center ${className}`}>
          <BlockMath math={cleanMath} />
        </div>
      );
    } else {
      return (
        <span className={`inline-math ${className}`}>
          <InlineMath math={cleanMath} />
        </span>
      );
    }
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    
    // Fallback to plain text with styling
    return (
      <span className={`font-mono text-sm bg-muted/30 px-2 py-1 rounded ${className}`}>
        {math}
      </span>
    );
  }
});

LaTeXRenderer.displayName = 'LaTeXRenderer';

// Helper function to detect if text contains math expressions
export const containsMath = (text: string): boolean => {
  const mathPatterns = [
    /\^/, // Exponents
    /\\[a-zA-Z]+/, // LaTeX commands
    /\$.*\$/, // Math delimiters
    /\b(sin|cos|tan|log|ln|sqrt|integral|derivative)\b/i,
    /\b\d+\/\d+\b/, // Fractions
    /[α-ωΑ-Ω]/, // Greek letters
    /[∫∂∆∑∏√]/  // Math symbols
  ];
  
  return mathPatterns.some(pattern => pattern.test(text));
};

// Enhanced step renderer with LaTeX support
export const renderMathStep = (step: string): JSX.Element => {
  if (containsMath(step)) {
    return <LaTeXRenderer math={step} />;
  }
  
  return <code className="text-sm font-mono">{step}</code>;
};

export default LaTeXRenderer;