import { useEffect, useState } from "react";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import axios from "axios";
import type { TriviaQuestion } from "./types";
import QuestionList from "./components/QuestionList";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");

  const fetchTrivia = async (): Promise<TriviaQuestion[]> => {
    const res = await axios.get("https://opentdb.com/api.php?amount=50");
    return res.data.results;
  };

  useEffect(() => {
    fetchTrivia().then((data) => setQuestions(data));
  }, []);

  const categories = Array.from(new Set(questions.map((q) => q.category)));
  const difficulties = ["easy", "medium", "hard"];

  const filtered = questions.filter((q) => {
    const catOk = category === "All" || q.category === category;
    const diffOk = difficulty === "All" || q.difficulty === difficulty;
    return catOk && diffOk;
  });

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">
        Trivia Data Visualizer
      </h1>

      <FilterBar
        categories={categories}
        difficulties={difficulties}
        selectedCategory={category}
        selectedDifficulty={difficulty}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
      />

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-4 overflow-y-auto max-h-[70vh]">
          <QuestionList data={filtered} />
        </div>

        <div className="space-y-6">
          <CategoryChart data={filtered} />
          <DifficultyChart data={filtered} />
        </div>
      </div>
    </div>
  );
}
