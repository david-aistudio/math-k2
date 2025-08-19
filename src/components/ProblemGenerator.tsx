import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, RefreshCw } from 'lucide-react';
import { ProblemGenerator, GeneratedProblem } from '@/lib/problemGenerator';
import { EnhancedLaTeXRenderer } from './EnhancedLaTeXRenderer';

export const ProblemGeneratorComponent: React.FC = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<'arithmetic' | 'algebra' | 'trigonometry' | 'calculus' | 'geometry' | 'physics' | 'random'>('random');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'random'>('random');
  const [generatedProblems, setGeneratedProblems] = useState<GeneratedProblem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProblems = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const problems = ProblemGenerator.generateProblems(selectedType, selectedDifficulty, 3);
      setGeneratedProblems(problems);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Problem Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="arithmetic">Arithmetic</SelectItem>
                  <SelectItem value="algebra">Algebra</SelectItem>
                  <SelectItem value="trigonometry">Trigonometry</SelectItem>
                  <SelectItem value="calculus">Calculus</SelectItem>
                  <SelectItem value="geometry">Geometry</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={(value: any) => setSelectedDifficulty(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateProblems} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Gamepad2 className="h-4 w-4 mr-2" />
                Generate Problems
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedProblems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Problems</h3>
          {generatedProblems.map((problem, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{problem.type}</Badge>
                    <Badge variant={problem.difficulty === 'easy' ? 'default' : problem.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="outline">{problem.category}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Question:</h4>
                    <EnhancedLaTeXRenderer text={problem.question} className="text-lg" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Answer:</h4>
                    <EnhancedLaTeXRenderer text={problem.answer} className="text-lg font-semibold text-green-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {problem.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>
                          <EnhancedLaTeXRenderer text={step} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
