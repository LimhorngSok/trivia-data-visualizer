import type { TriviaQuestion } from "../types";

interface Props {
  data: TriviaQuestion[];
}

export default function QuestionList({ data }: Props) {
  if (data.length === 0)
    return <p className="text-center text-gray-500">No questions found.</p>;

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="space-y-4">
      {data.map((q, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 hover:shadow transition bg-gray-50"
        >
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{decodeHtml(q.category)}</span>
            <span className="capitalize">Difficulty: {q.difficulty}</span>
          </div>
          <p
            className="text-gray-900"
            dangerouslySetInnerHTML={{ __html: q.question }}
          />
        </div>
      ))}
    </div>
  );
}
