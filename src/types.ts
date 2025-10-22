export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ChartData {
  name: string;
  value: number;
}