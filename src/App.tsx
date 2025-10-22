import { useEffect, useState } from "react";
import CategorySelector from "./components/CategorySelector";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import axios from "axios";
import type { TriviaQuestion } from "./types";

export default function App() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchTrivia = async (): Promise<TriviaQuestion[]> => {
    const res = await axios.get("https://opentdb.com/api.php?amount=50");
    return res.data.results;
  };

  useEffect(() => {
    fetchTrivia().then((data) => setQuestions(data));
  }, []);

  const categories = [...new Set(questions.map((q) => q.category))];
  const filtered = selectedCategory === "All"
    ? questions
    : questions.filter((q) => q.category === selectedCategory);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎯 Trivia Data Visualizer</h1>
      <CategorySelector
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <CategoryChart data={filtered} />
        <DifficultyChart data={filtered} />
      </div>
    </div>
  );
}