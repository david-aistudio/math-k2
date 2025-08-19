// ADVANCED PROBLEM GENERATOR - MULTIPLE TYPES & DIFFICULTIES 🎲

export interface GeneratedProblem {
  question: string;
  answer: string;
  steps: string[];
  type: 'arithmetic' | 'algebra' | 'trigonometry' | 'calculus' | 'geometry' | 'physics';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export class ProblemGenerator {
  private static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static randomFloat(min: number, max: number, decimals: number = 2): number {
    return Number((Math.random() * (max - min) + min).toFixed(decimals));
  }

  // ARITHMETIC PROBLEMS
  static generateArithmetic(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
    switch (difficulty) {
      case 'easy':
        return this.generateEasyArithmetic();
      case 'medium':
        return this.generateMediumArithmetic();
      case 'hard':
        return this.generateHardArithmetic();
    }
  }

  private static generateEasyArithmetic(): GeneratedProblem {
    const a = this.randomInt(1, 20);
    const b = this.randomInt(1, 20);
    const operators = ['+', '-', '×'];
    const op = operators[this.randomInt(0, operators.length - 1)];
    
    let answer: number;
    let steps: string[];
    
    switch (op) {
      case '+':
        answer = a + b;
        steps = [
          `${a} + ${b} = ${answer}`,
          `Jawaban: ${answer}`
        ];
        break;
      case '-':
        answer = a - b;
        steps = [
          `${a} - ${b} = ${answer}`,
          `Jawaban: ${answer}`
        ];
        break;
      case '×':
        answer = a * b;
        steps = [
          `${a} × ${b} = ${answer}`,
          `Jawaban: ${answer}`
        ];
        break;
      default:
        answer = a + b;
        steps = [`Jawaban: ${answer}`];
    }

    return {
      question: `Hitung ${a} ${op} ${b}`,
      answer: answer.toString(),
      steps,
      type: 'arithmetic',
      difficulty: 'easy',
      category: 'Basic Operations'
    };
  }

  private static generateMediumArithmetic(): GeneratedProblem {
    const a = this.randomInt(10, 50);
    const b = this.randomInt(2, 10);
    const c = this.randomInt(5, 20);
    
    const answer = a + b * c;
    const steps = [
      `Ikuti urutan operasi: perkalian dulu, baru penjumlahan`,
      `${b} × ${c} = ${b * c}`,
      `${a} + ${b * c} = ${answer}`,
      `Jawaban: ${answer}`
    ];

    return {
      question: `Hitung ${a} + ${b} × ${c}`,
      answer: answer.toString(),
      steps,
      type: 'arithmetic',
      difficulty: 'medium',
      category: 'Order of Operations'
    };
  }

  private static generateHardArithmetic(): GeneratedProblem {
    const a = this.randomInt(20, 100);
    const b = this.randomInt(2, 10);
    const c = this.randomInt(2, 10);
    
    const answer = a / b + Math.sqrt(c * c);
    const steps = [
      `Hitung pembagian: ${a} ÷ ${b} = ${a / b}`,
      `Hitung akar: √${c * c} = ${c}`,
      `${a / b} + ${c} = ${answer}`,
      `Jawaban: ${answer}`
    ];

    return {
      question: `Hitung ${a} ÷ ${b} + √${c * c}`,
      answer: answer.toString(),
      steps,
      type: 'arithmetic',
      difficulty: 'hard',
      category: 'Mixed Operations'
    };
  }

  // ALGEBRA PROBLEMS
  static generateAlgebra(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
    switch (difficulty) {
      case 'easy':
        return this.generateEasyAlgebra();
      case 'medium':
        return this.generateMediumAlgebra();
      case 'hard':
        return this.generateHardAlgebra();
    }
  }

  private static generateEasyAlgebra(): GeneratedProblem {
    const a = this.randomInt(1, 10);
    const b = this.randomInt(5, 20);
    
    const answer = (b - a) / a;
    const steps = [
      `${a}x + ${a} = ${b}`,
      `${a}x = ${b} - ${a}`,
      `${a}x = ${b - a}`,
      `x = ${b - a} ÷ ${a}`,
      `x = ${answer}`,
      `Jawaban: x = ${answer}`
    ];

    return {
      question: `Selesaikan persamaan: ${a}x + ${a} = ${b}`,
      answer: `x = ${answer}`,
      steps,
      type: 'algebra',
      difficulty: 'easy',
      category: 'Linear Equations'
    };
  }

  private static generateMediumAlgebra(): GeneratedProblem {
    const a = this.randomInt(1, 5);
    const b = this.randomInt(1, 10);
    const c = this.randomInt(1, 10);
    
    // ax² + bx + c = 0
    const discriminant = b * b - 4 * a * c;
    let answer: string;
    let steps: string[];
    
    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      answer = `x = ${x1.toFixed(2)} atau x = ${x2.toFixed(2)}`;
      steps = [
        `Persamaan kuadrat: ${a}x² + ${b}x + ${c} = 0`,
        `Diskriminan: D = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
        `Karena D > 0, ada 2 akar real`,
        `x₁ = (-${b} + √${discriminant}) / ${2 * a} = ${x1.toFixed(2)}`,
        `x₂ = (-${b} - √${discriminant}) / ${2 * a} = ${x2.toFixed(2)}`,
        `Jawaban: ${answer}`
      ];
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      answer = `x = ${x.toFixed(2)}`;
      steps = [
        `Persamaan kuadrat: ${a}x² + ${b}x + ${c} = 0`,
        `Diskriminan: D = 0, akar kembar`,
        `x = -${b} / ${2 * a} = ${x.toFixed(2)}`,
        `Jawaban: ${answer}`
      ];
    } else {
      answer = 'Tidak ada akar real';
      steps = [
        `Persamaan kuadrat: ${a}x² + ${b}x + ${c} = 0`,
        `Diskriminan: D = ${discriminant} < 0`,
        `Jawaban: Tidak ada akar real`
      ];
    }

    return {
      question: `Selesaikan persamaan kuadrat: ${a}x² + ${b}x + ${c} = 0`,
      answer,
      steps,
      type: 'algebra',
      difficulty: 'medium',
      category: 'Quadratic Equations'
    };
  }

  private static generateHardAlgebra(): GeneratedProblem {
    const a = this.randomInt(1, 5);
    const b = this.randomInt(1, 5);
    const c = this.randomInt(1, 10);
    const d = this.randomInt(1, 10);
    
    // ax + by = c, dx + ey = f
    const e = this.randomInt(1, 5);
    const f = this.randomInt(1, 10);
    
    // Solve using elimination
    const det = a * e - b * d;
    const x = (c * e - b * f) / det;
    const y = (a * f - c * d) / det;
    
    const steps = [
      `Sistem persamaan linear:`,
      `${a}x + ${b}y = ${c}`,
      `${d}x + ${e}y = ${f}`,
      `Gunakan eliminasi:`,
      `Kalikan persamaan 1 dengan ${e}: ${a * e}x + ${b * e}y = ${c * e}`,
      `Kalikan persamaan 2 dengan ${b}: ${d * b}x + ${e * b}y = ${f * b}`,
      `Kurangkan: ${a * e - d * b}x = ${c * e - f * b}`,
      `x = ${x.toFixed(2)}`,
      `Substitusi ke persamaan 1: ${a}(${x.toFixed(2)}) + ${b}y = ${c}`,
      `y = ${y.toFixed(2)}`,
      `Jawaban: x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`
    ];

    return {
      question: `Selesaikan sistem persamaan: ${a}x + ${b}y = ${c}, ${d}x + ${e}y = ${f}`,
      answer: `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`,
      steps,
      type: 'algebra',
      difficulty: 'hard',
      category: 'System of Equations'
    };
  }

  // TRIGONOMETRY PROBLEMS
  static generateTrigonometry(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
    switch (difficulty) {
      case 'easy':
        return this.generateEasyTrigonometry();
      case 'medium':
        return this.generateMediumTrigonometry();
      case 'hard':
        return this.generateHardTrigonometry();
    }
  }

  private static generateEasyTrigonometry(): GeneratedProblem {
    const angles = [0, 30, 45, 60, 90];
    const angle = angles[this.randomInt(0, angles.length - 1)];
    const functions = ['sin', 'cos', 'tan'];
    const func = functions[this.randomInt(0, functions.length - 1)];
    
    let answer: number;
    let steps: string[];
    
    switch (func) {
      case 'sin':
        answer = Math.sin(angle * Math.PI / 180);
        steps = [
          `sin(${angle}°) = ${answer.toFixed(4)}`,
          `Jawaban: ${answer.toFixed(4)}`
        ];
        break;
      case 'cos':
        answer = Math.cos(angle * Math.PI / 180);
        steps = [
          `cos(${angle}°) = ${answer.toFixed(4)}`,
          `Jawaban: ${answer.toFixed(4)}`
        ];
        break;
      case 'tan':
        answer = Math.tan(angle * Math.PI / 180);
        steps = [
          `tan(${angle}°) = ${answer.toFixed(4)}`,
          `Jawaban: ${answer.toFixed(4)}`
        ];
        break;
      default:
        answer = 0;
        steps = [`Jawaban: 0`];
    }

    return {
      question: `Hitung ${func}(${angle}°)`,
      answer: answer.toFixed(4),
      steps,
      type: 'trigonometry',
      difficulty: 'easy',
      category: 'Basic Trigonometry'
    };
  }

  private static generateMediumTrigonometry(): GeneratedProblem {
    const a = this.randomInt(1, 10);
    const b = this.randomInt(1, 10);
    
    const answer = a * Math.sin(30 * Math.PI / 180) + b * Math.cos(60 * Math.PI / 180);
    const steps = [
      `sin(30°) = 0.5`,
      `cos(60°) = 0.5`,
      `${a} × 0.5 + ${b} × 0.5 = ${a * 0.5} + ${b * 0.5}`,
      `= ${answer.toFixed(2)}`,
      `Jawaban: ${answer.toFixed(2)}`
    ];

    return {
      question: `Hitung ${a}sin(30°) + ${b}cos(60°)`,
      answer: answer.toFixed(2),
      steps,
      type: 'trigonometry',
      difficulty: 'medium',
      category: 'Trigonometric Expressions'
    };
  }

  private static generateHardTrigonometry(): GeneratedProblem {
    const angle = this.randomInt(15, 75);
    const answer = Math.sin(angle * Math.PI / 180) ** 2 + Math.cos(angle * Math.PI / 180) ** 2;
    const steps = [
      `Identitas trigonometri: sin²θ + cos²θ = 1`,
      `sin²(${angle}°) + cos²(${angle}°) = 1`,
      `Jawaban: 1`
    ];

    return {
      question: `Hitung sin²(${angle}°) + cos²(${angle}°)`,
      answer: '1',
      steps,
      type: 'trigonometry',
      difficulty: 'hard',
      category: 'Trigonometric Identities'
    };
  }

  // CALCULUS PROBLEMS
  static generateCalculus(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
    switch (difficulty) {
      case 'easy':
        return this.generateEasyCalculus();
      case 'medium':
        return this.generateMediumCalculus();
      case 'hard':
        return this.generateHardCalculus();
    }
  }

  private static generateEasyCalculus(): GeneratedProblem {
    const power = this.randomInt(2, 5);
    const answer = `${power}x^${power - 1}`;
    const steps = [
      `Aturan turunan: d/dx(x^n) = nx^(n-1)`,
      `d/dx(x^${power}) = ${power}x^${power - 1}`,
      `Jawaban: ${answer}`
    ];

    return {
      question: `Turunan dari f(x) = x^${power}`,
      answer,
      steps,
      type: 'calculus',
      difficulty: 'easy',
      category: 'Basic Derivatives'
    };
  }

  private static generateMediumCalculus(): GeneratedProblem {
    const a = this.randomInt(1, 5);
    const b = this.randomInt(1, 5);
    const c = this.randomInt(1, 10);
    
    const answer = `${a * 3}x^2 + ${b * 2}x + ${c}`;
    const steps = [
      `f(x) = ${a}x^3 + ${b}x^2 + ${c}x`,
      `f'(x) = ${a * 3}x^2 + ${b * 2}x + ${c}`,
      `Jawaban: ${answer}`
    ];

    return {
      question: `Turunan dari f(x) = ${a}x^3 + ${b}x^2 + ${c}x`,
      answer,
      steps,
      type: 'calculus',
      difficulty: 'medium',
      category: 'Polynomial Derivatives'
    };
  }

  private static generateHardCalculus(): GeneratedProblem {
    const a = this.randomInt(1, 3);
    const b = this.randomInt(1, 5);
    
    const answer = `${a * b}x^${b - 1} * e^(x^${b})`;
    const steps = [
      `f(x) = ${a}e^(x^${b})`,
      `Gunakan aturan rantai: d/dx(e^u) = e^u * du/dx`,
      `f'(x) = ${a}e^(x^${b}) * d/dx(x^${b})`,
      `f'(x) = ${a}e^(x^${b}) * ${b}x^${b - 1}`,
      `f'(x) = ${a * b}x^${b - 1} * e^(x^${b})`,
      `Jawaban: ${answer}`
    ];

    return {
      question: `Turunan dari f(x) = ${a}e^(x^${b})`,
      answer,
      steps,
      type: 'calculus',
      difficulty: 'hard',
      category: 'Chain Rule'
    };
  }

  // GEOMETRY PROBLEMS
  static generateGeometry(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
    switch (difficulty) {
      case 'easy':
        return this.generateEasyGeometry();
      case 'medium':
        return this.generateMediumGeometry();
      case 'hard':
        return this.generateHardGeometry();
    }
  }

  private static generateEasyGeometry(): GeneratedProblem {
    const radius = this.randomInt(1, 10);
    const area = Math.PI * radius * radius;
    const steps = [
      `Luas lingkaran = πr²`,
      `Luas = π × ${radius}²`,
      `Luas = π × ${radius * radius}`,
      `Luas = ${area.toFixed(2)}`,
      `Jawaban: ${area.toFixed(2)} satuan luas`
    ];

    return {
      question: `Hitung luas lingkaran dengan jari-jari ${radius} satuan`,
      answer: `${area.toFixed(2)} satuan luas`,
      steps,
      type: 'geometry',
      difficulty: 'easy',
      category: 'Circle Area'
    };
  }

  private static generateMediumGeometry(): GeneratedProblem {
    const base = this.randomInt(5, 15);
    const height = this.randomInt(5, 15);
    const area = 0.5 * base * height;
    const steps = [
      `Luas segitiga = ½ × alas × tinggi`,
      `Luas = ½ × ${base} × ${height}`,
      `Luas = ½ × ${base * height}`,
      `Luas = ${area}`,
      `Jawaban: ${area} satuan luas`
    ];

    return {
      question: `Hitung luas segitiga dengan alas ${base} satuan dan tinggi ${height} satuan`,
      answer: `${area} satuan luas`,
      steps,
      type: 'geometry',
      difficulty: 'medium',
      category: 'Triangle Area'
    };
  }

  private static generateHardGeometry(): GeneratedProblem {
    const a = this.randomInt(3, 8);
    const b = this.randomInt(3, 8);
    const c = this.randomInt(3, 8);
    
    // Heron's formula
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const steps = [
      `Gunakan rumus Heron: A = √(s(s-a)(s-b)(s-c))`,
      `s = (${a} + ${b} + ${c}) / 2 = ${s}`,
      `A = √(${s}(${s - a})(${s - b})(${s - c}))`,
      `A = √(${s * (s - a) * (s - b) * (s - c)})`,
      `A = ${area.toFixed(2)}`,
      `Jawaban: ${area.toFixed(2)} satuan luas`
    ];

    return {
      question: `Hitung luas segitiga dengan sisi ${a}, ${b}, dan ${c} satuan`,
      answer: `${area.toFixed(2)} satuan luas`,
      steps,
      type: 'geometry',
      difficulty: 'hard',
      category: 'Heron\'s Formula'
    };
  }

  // PHYSICS PROBLEMS
  static generatePhysics(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
    switch (difficulty) {
      case 'easy':
        return this.generateEasyPhysics();
      case 'medium':
        return this.generateMediumPhysics();
      case 'hard':
        return this.generateHardPhysics();
    }
  }

  private static generateEasyPhysics(): GeneratedProblem {
    const mass = this.randomInt(1, 10);
    const acceleration = this.randomInt(1, 5);
    const force = mass * acceleration;
    const steps = [
      `Hukum Newton II: F = ma`,
      `F = ${mass} × ${acceleration}`,
      `F = ${force}`,
      `Jawaban: ${force} N`
    ];

    return {
      question: `Hitung gaya yang diperlukan untuk memberikan percepatan ${acceleration} m/s² pada benda bermassa ${mass} kg`,
      answer: `${force} N`,
      steps,
      type: 'physics',
      difficulty: 'easy',
      category: 'Newton\'s Second Law'
    };
  }

  private static generateMediumPhysics(): GeneratedProblem {
    const force = this.randomInt(10, 50);
    const angle = this.randomInt(15, 75);
    const fx = force * Math.cos(angle * Math.PI / 180);
    const fy = force * Math.sin(angle * Math.PI / 180);
    const steps = [
      `Komponen gaya:`,
      `Fx = F cos θ = ${force} cos ${angle}°`,
      `Fx = ${force} × ${Math.cos(angle * Math.PI / 180).toFixed(3)}`,
      `Fx = ${fx.toFixed(2)} N`,
      `Fy = F sin θ = ${force} sin ${angle}°`,
      `Fy = ${force} × ${Math.sin(angle * Math.PI / 180).toFixed(3)}`,
      `Fy = ${fy.toFixed(2)} N`,
      `Jawaban: Fx = ${fx.toFixed(2)} N, Fy = ${fy.toFixed(2)} N`
    ];

    return {
      question: `Sebuah gaya ${force} N membentuk sudut ${angle}° dengan sumbu x. Hitung komponen Fx dan Fy`,
      answer: `Fx = ${fx.toFixed(2)} N, Fy = ${fy.toFixed(2)} N`,
      steps,
      type: 'physics',
      difficulty: 'medium',
      category: 'Vector Components'
    };
  }

  private static generateHardPhysics(): GeneratedProblem {
    const f1 = this.randomInt(20, 40);
    const f2 = this.randomInt(20, 40);
    const angle = this.randomInt(30, 150);
    
    const fx1 = f1;
    const fy1 = 0;
    const fx2 = f2 * Math.cos(angle * Math.PI / 180);
    const fy2 = f2 * Math.sin(angle * Math.PI / 180);
    
    const fx = fx1 + fx2;
    const fy = fy1 + fy2;
    const resultant = Math.sqrt(fx * fx + fy * fy);
    
    const steps = [
      `Komponen F₁: Fx₁ = ${f1} N, Fy₁ = 0 N`,
      `Komponen F₂: Fx₂ = ${f2} cos ${angle}° = ${fx2.toFixed(2)} N`,
      `Fy₂ = ${f2} sin ${angle}° = ${fy2.toFixed(2)} N`,
      `Resultan: Fx = ${fx1} + ${fx2.toFixed(2)} = ${fx.toFixed(2)} N`,
      `Fy = 0 + ${fy2.toFixed(2)} = ${fy.toFixed(2)} N`,
      `F = √(Fx² + Fy²) = √(${fx.toFixed(2)}² + ${fy.toFixed(2)}²)`,
      `F = √${(fx * fx + fy * fy).toFixed(2)} = ${resultant.toFixed(2)} N`,
      `Jawaban: ${resultant.toFixed(2)} N`
    ];

    return {
      question: `Dua gaya F₁ = ${f1} N dan F₂ = ${f2} N membentuk sudut ${angle}°. Hitung resultan gayanya`,
      answer: `${resultant.toFixed(2)} N`,
      steps,
      type: 'physics',
      difficulty: 'hard',
      category: 'Resultant Force'
    };
  }

  // MAIN GENERATOR FUNCTION
  static generateProblems(
    type: 'arithmetic' | 'algebra' | 'trigonometry' | 'calculus' | 'geometry' | 'physics' | 'random',
    difficulty: 'easy' | 'medium' | 'hard' | 'random',
    count: number = 1
  ): GeneratedProblem[] {
    const problems: GeneratedProblem[] = [];
    
    for (let i = 0; i < count; i++) {
      const selectedType = type === 'random' 
        ? ['arithmetic', 'algebra', 'trigonometry', 'calculus', 'geometry', 'physics'][this.randomInt(0, 5)]
        : type;
      
      const selectedDifficulty = difficulty === 'random'
        ? ['easy', 'medium', 'hard'][this.randomInt(0, 2)]
        : difficulty;
      
      switch (selectedType) {
        case 'arithmetic':
          problems.push(this.generateArithmetic(selectedDifficulty));
          break;
        case 'algebra':
          problems.push(this.generateAlgebra(selectedDifficulty));
          break;
        case 'trigonometry':
          problems.push(this.generateTrigonometry(selectedDifficulty));
          break;
        case 'calculus':
          problems.push(this.generateCalculus(selectedDifficulty));
          break;
        case 'geometry':
          problems.push(this.generateGeometry(selectedDifficulty));
          break;
        case 'physics':
          problems.push(this.generatePhysics(selectedDifficulty));
          break;
      }
    }
    
    return problems;
  }

  // Get available categories
  static getCategories(): { type: string; difficulties: string[]; categories: string[] }[] {
    return [
      {
        type: 'arithmetic',
        difficulties: ['easy', 'medium', 'hard'],
        categories: ['Basic Operations', 'Order of Operations', 'Mixed Operations']
      },
      {
        type: 'algebra',
        difficulties: ['easy', 'medium', 'hard'],
        categories: ['Linear Equations', 'Quadratic Equations', 'System of Equations']
      },
      {
        type: 'trigonometry',
        difficulties: ['easy', 'medium', 'hard'],
        categories: ['Basic Trigonometry', 'Trigonometric Expressions', 'Trigonometric Identities']
      },
      {
        type: 'calculus',
        difficulties: ['easy', 'medium', 'hard'],
        categories: ['Basic Derivatives', 'Polynomial Derivatives', 'Chain Rule']
      },
      {
        type: 'geometry',
        difficulties: ['easy', 'medium', 'hard'],
        categories: ['Circle Area', 'Triangle Area', 'Heron\'s Formula']
      },
      {
        type: 'physics',
        difficulties: ['easy', 'medium', 'hard'],
        categories: ['Newton\'s Second Law', 'Vector Components', 'Resultant Force']
      }
    ];
  }
}
