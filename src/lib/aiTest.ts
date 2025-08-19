// AI MATHEMATICS TESTING SUITE 🧪

import { EnhancedMathEngine } from './enhancedMathEngine';
import { MathSolution } from './mathEngine';

export class AITestSuite {
  // Test cases for different types of mathematical problems
  private static testCases = [
    // Basic Arithmetic
    {
      name: 'Basic Addition',
      input: 'Hitung 15 + 27',
      expectedType: 'arithmetic',
      description: 'Simple addition problem'
    },
    {
      name: 'Order of Operations',
      input: 'Hitung 15 + 27 × 3',
      expectedType: 'arithmetic',
      description: 'Testing order of operations (multiplication before addition)'
    },
    {
      name: 'Power and Root',
      input: 'Berapa hasil dari 5² + √16?',
      expectedType: 'arithmetic',
      description: 'Testing powers and square roots'
    },

    // Algebra
    {
      name: 'Linear Equation',
      input: 'Selesaikan persamaan: 2x + 5 = 13',
      expectedType: 'algebra',
      description: 'Simple linear equation'
    },
    {
      name: 'Variable Question',
      input: '2x + 5 = 13, berapa x?',
      expectedType: 'algebra',
      description: 'Variable question format'
    },
    {
      name: 'Quadratic Equation',
      input: 'Selesaikan x² - 5x + 6 = 0',
      expectedType: 'algebra',
      description: 'Quadratic equation'
    },

    // Trigonometry
    {
      name: 'Basic Trigonometry',
      input: 'Hitung sin(30°)',
      expectedType: 'trigonometry',
      description: 'Basic sine function with degrees'
    },
    {
      name: 'Trigonometric Sum',
      input: 'Hitung sin(30°) + cos(60°)',
      expectedType: 'trigonometry',
      description: 'Sum of trigonometric functions'
    },
    {
      name: 'Trigonometric Identity',
      input: 'Hitung sin²(30°) + cos²(30°)',
      expectedType: 'trigonometry',
      description: 'Testing trigonometric identity'
    },

    // Calculus
    {
      name: 'Derivative',
      input: 'Turunan dari f(x) = x³ + 2x² - 5x + 1',
      expectedType: 'calculus',
      description: 'Polynomial derivative'
    },
    {
      name: 'Simple Derivative',
      input: 'Turunan dari x²',
      expectedType: 'calculus',
      description: 'Simple power rule derivative'
    },
    {
      name: 'Integral',
      input: 'Integral dari ∫(3x² - 4x + 5)dx',
      expectedType: 'calculus',
      description: 'Polynomial integration'
    },

    // Physics
    {
      name: 'Vector Components',
      input: 'Sebuah gaya 50 N membentuk sudut 30° dengan sumbu x. Hitung komponen Fx dan Fy',
      expectedType: 'geometry',
      description: 'Vector component calculation'
    },
    {
      name: 'Force Calculation',
      input: 'Gaya 100 N sudut 45°',
      expectedType: 'geometry',
      description: 'Force vector problem'
    },
    {
      name: 'Physics Problem',
      input: 'Berapa resultan gaya jika F1 = 30 N dan F2 = 40 N membentuk sudut 90°?',
      expectedType: 'geometry',
      description: 'Resultant force calculation'
    },

    // Geometry
    {
      name: 'Circle Area',
      input: 'Berapa luas lingkaran dengan jari-jari 7 cm?',
      expectedType: 'geometry',
      description: 'Circle area calculation'
    },
    {
      name: 'Triangle Area',
      input: 'Hitung luas segitiga dengan alas 10 cm dan tinggi 8 cm',
      expectedType: 'geometry',
      description: 'Triangle area calculation'
    },

    // Conversation
    {
      name: 'Greeting',
      input: 'Halo',
      expectedType: 'conversation',
      description: 'Basic greeting'
    },
    {
      name: 'Thanks',
      input: 'Terima kasih',
      expectedType: 'conversation',
      description: 'Thank you message'
    },
    {
      name: 'Capability Question',
      input: 'Apa yang bisa kamu lakukan?',
      expectedType: 'conversation',
      description: 'Asking about capabilities'
    }
  ];

  // Run all tests
  public static async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Starting AI Mathematics Test Suite...');
    
    const results: TestResult[] = [];
    
    for (const testCase of this.testCases) {
      try {
        console.log(`\n📝 Testing: ${testCase.name}`);
        console.log(`Input: "${testCase.input}"`);
        
        const startTime = Date.now();
        const result = await EnhancedMathEngine.solve(testCase.input);
        const endTime = Date.now();
        
        const testResult: TestResult = {
          name: testCase.name,
          input: testCase.input,
          expectedType: testCase.expectedType,
          actualType: result.type,
          success: result.type === testCase.expectedType,
          response: result.finalAnswer,
          steps: result.steps.length,
          executionTime: endTime - startTime,
          description: testCase.description,
          error: null
        };
        
        results.push(testResult);
        
        console.log(`✅ Result: ${testResult.success ? 'PASS' : 'FAIL'}`);
        console.log(`Type: ${result.type} (expected: ${testCase.expectedType})`);
        console.log(`Response: ${result.finalAnswer.substring(0, 100)}...`);
        console.log(`Steps: ${result.steps.length}`);
        console.log(`Time: ${testResult.executionTime}ms`);
        
      } catch (error) {
        const testResult: TestResult = {
          name: testCase.name,
          input: testCase.input,
          expectedType: testCase.expectedType,
          actualType: 'error',
          success: false,
          response: '',
          steps: 0,
          executionTime: 0,
          description: testCase.description,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        
        results.push(testResult);
        
        console.log(`❌ Result: FAIL`);
        console.log(`Error: ${testResult.error}`);
      }
    }
    
    this.printSummary(results);
    return results;
  }

  // Run specific test category
  public static async runCategoryTests(category: string): Promise<TestResult[]> {
    const categoryTests = this.testCases.filter(test => 
      test.expectedType === category || 
      test.name.toLowerCase().includes(category.toLowerCase())
    );
    
    console.log(`🧪 Running ${category} tests...`);
    
    const results: TestResult[] = [];
    
    for (const testCase of categoryTests) {
      try {
        const result = await EnhancedMathEngine.solve(testCase.input);
        
        const testResult: TestResult = {
          name: testCase.name,
          input: testCase.input,
          expectedType: testCase.expectedType,
          actualType: result.type,
          success: result.type === testCase.expectedType,
          response: result.finalAnswer,
          steps: result.steps.length,
          executionTime: 0,
          description: testCase.description,
          error: null
        };
        
        results.push(testResult);
        
      } catch (error) {
        const testResult: TestResult = {
          name: testCase.name,
          input: testCase.input,
          expectedType: testCase.expectedType,
          actualType: 'error',
          success: false,
          response: '',
          steps: 0,
          executionTime: 0,
          description: testCase.description,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        
        results.push(testResult);
      }
    }
    
    return results;
  }

  // Print test summary
  private static printSummary(results: TestResult[]): void {
    const total = results.length;
    const passed = results.filter(r => r.success).length;
    const failed = total - passed;
    const successRate = ((passed / total) * 100).toFixed(1);
    
    console.log('\n📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed} ✅`);
    console.log(`Failed: ${failed} ❌`);
    console.log(`Success Rate: ${successRate}%`);
    
    // Group by type
    const typeStats = results.reduce((acc, result) => {
      const type = result.actualType;
      if (!acc[type]) acc[type] = { total: 0, passed: 0 };
      acc[type].total++;
      if (result.success) acc[type].passed++;
      return acc;
    }, {} as Record<string, { total: number; passed: number }>);
    
    console.log('\n📈 BY TYPE:');
    Object.entries(typeStats).forEach(([type, stats]) => {
      const rate = ((stats.passed / stats.total) * 100).toFixed(1);
      console.log(`${type}: ${stats.passed}/${stats.total} (${rate}%)`);
    });
    
    // Show failed tests
    const failedTests = results.filter(r => !r.success);
    if (failedTests.length > 0) {
      console.log('\n❌ FAILED TESTS:');
      failedTests.forEach(test => {
        console.log(`- ${test.name}: expected ${test.expectedType}, got ${test.actualType}`);
        if (test.error) console.log(`  Error: ${test.error}`);
      });
    }
    
    console.log('\n🎉 Test suite completed!');
  }

  // Quick test for development
  public static async quickTest(): Promise<void> {
    console.log('🚀 Quick AI Test...');
    
    const testInputs = [
      'Hitung 15 + 27 × 3',
      'Selesaikan persamaan: 2x + 5 = 13',
      'Hitung sin(30°)',
      'Halo'
    ];
    
    for (const input of testInputs) {
      try {
        console.log(`\nTesting: "${input}"`);
        const result = await EnhancedMathEngine.solve(input);
        console.log(`✅ Type: ${result.type}`);
        console.log(`✅ Response: ${result.finalAnswer.substring(0, 100)}...`);
        console.log(`✅ Steps: ${result.steps.length}`);
      } catch (error) {
        console.log(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }
}

// Test result interface
export interface TestResult {
  name: string;
  input: string;
  expectedType: string;
  actualType: string;
  success: boolean;
  response: string;
  steps: number;
  executionTime: number;
  description: string;
  error: string | null;
}

// Export for use in development
export const runTests = AITestSuite.runAllTests;
export const runQuickTest = AITestSuite.quickTest;
