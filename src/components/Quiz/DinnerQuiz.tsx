"use client";

import { useState } from "react";
import type { Quiz } from "@/data/quizzes";

export default function DinnerQuiz({
  allQuizzes,
  initialIndex,
}: {
  allQuizzes: Quiz[];
  initialIndex: number;
}) {
  const [quiz, setQuiz] = useState<Quiz>(allQuizzes[initialIndex]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const switchQuiz = (id: string) => {
    const found = allQuizzes.find((q) => q.id === id);
    if (found) {
      setQuiz(found);
      setSelected(new Set());
      setShowResults(false);
      setGenerateError("");
      setIsGenerated(false);
    }
  };

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generateNewQuiz = async () => {
    setGenerating(true);
    setGenerateError("");
    try {
      const res = await fetch("/api/quiz/generate", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate quiz");
      }
      const newQuiz: Quiz = await res.json();
      setQuiz(newQuiz);
      setSelected(new Set());
      setShowResults(false);
      setIsGenerated(true);
    } catch (err) {
      setGenerateError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setGenerating(false);
    }
  };

  const calculateProfile = () => {
    const selectedItems = quiz.items.filter((item) => selected.has(item.id));
    const tagCounts: Record<string, number> = {};

    selectedItems.forEach((item) => {
      item.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    let bestMatch = "";
    let bestScore = -1;

    for (const [key, profile] of Object.entries(quiz.profiles)) {
      const score = profile.matchTags.reduce(
        (sum, tag) => sum + (tagCounts[tag] || 0),
        0,
      );
      if (score > bestScore) {
        bestScore = score;
        bestMatch = key;
      }
    }

    if (!bestMatch) {
      bestMatch = Object.keys(quiz.profiles)[0];
    }

    return bestMatch;
  };

  const getRecommendations = (profileKey: string) => {
    const profile = quiz.profiles[profileKey];
    return quiz.items
      .filter(
        (item) =>
          !selected.has(item.id) &&
          item.tags.some((t) => profile.matchTags.includes(t)),
      )
      .slice(0, 3);
  };

  const quizPicker = (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <select
        value={isGenerated ? "" : quiz.id}
        onChange={(e) => switchQuiz(e.target.value)}
        className="rounded-card border border-gray-200 bg-white px-3 py-2 text-sm text-body-color shadow-subtle hover:border-primary/40 focus:border-primary focus:outline-none"
      >
        {isGenerated && (
          <option value="" disabled>
            {quiz.title}
          </option>
        )}
        {allQuizzes.map((q) => (
          <option key={q.id} value={q.id}>
            {q.title}
          </option>
        ))}
      </select>
      <button
        onClick={generateNewQuiz}
        className="text-sm text-body-color underline hover:text-primary"
      >
        Generate New Quiz
      </button>
    </div>
  );

  const profileKey = showResults ? calculateProfile() : null;
  const profile = profileKey ? quiz.profiles[profileKey] : null;
  const recommendations = profileKey ? getRecommendations(profileKey) : [];

  // Loading state while generating
  if (generating) {
    return (
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-card border border-gray-200 bg-white p-12 shadow-card">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                <h2 className="font-serif text-2xl font-bold text-black">
                  Generating a new quiz...
                </h2>
                <p className="text-body-color">
                  This takes a few seconds. Hang tight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showResults && profile) {
    return (
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-card border border-gray-200 bg-white p-8 shadow-card">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <svg
                    className="h-8 w-8 text-yellow"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <h1 className="font-serif text-3xl font-bold text-black">
                    Your Result
                  </h1>
                </div>

                <div className="rounded-card bg-primary/10 p-6">
                  <h2 className="mb-3 font-serif text-2xl font-bold text-primary">
                    {profile.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-body-color">
                    {profile.description}
                  </p>
                </div>
              </div>

              {/* Traits + Count */}
              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div className="rounded-card bg-gray-50 p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-black">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Your Traits
                  </h3>
                  <ul className="space-y-2">
                    {profile.traits.map((trait, i) => (
                      <li
                        key={i}
                        className="flex items-center text-body-color"
                      >
                        <span className="mr-3 h-2 w-2 rounded-full bg-primary" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-card bg-gray-50 p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-black">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Your Picks
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {selected.size}
                  </p>
                  <p className="text-body-color">
                    out of {quiz.items.length} items
                  </p>
                  {selected.size >= 20 && (
                    <p className="mt-2 font-semibold text-primary">
                      Impressive range!
                    </p>
                  )}
                  {selected.size >= 10 && selected.size < 20 && (
                    <p className="mt-2 font-semibold text-primary">
                      Great taste!
                    </p>
                  )}
                  {selected.size > 0 && selected.size < 10 && (
                    <p className="mt-2 font-semibold text-primary">
                      Quality over quantity!
                    </p>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="mb-8 rounded-card bg-gray-50 p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-black">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    You Might Also Like
                  </h3>
                  <div className="grid gap-3">
                    {recommendations.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-card border border-gray-200 bg-white p-4"
                      >
                        <h4 className="font-semibold text-black">
                          {item.name}
                        </h4>
                        <p className="text-sm text-body-color">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col items-center gap-4 text-center">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setSelected(new Set());
                  }}
                  className="rounded-card bg-primary px-6 py-3 font-semibold text-white shadow-btn transition-colors hover:bg-primary/90"
                >
                  Try Again
                </button>
                {quizPicker}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-[120px] pt-[60px]">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-card border border-gray-200 bg-white p-8 shadow-card">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="text-4xl">🍽</span>
                <h1 className="font-serif text-3xl font-bold text-black">
                  {quiz.title}
                </h1>
              </div>
              <p className="text-lg text-body-color">{quiz.subtitle}</p>
              <p className="mt-2 text-sm text-body-color">
                Tap the items that resonate with you.
              </p>
            </div>

            {/* Progress */}
            <div className="mb-6 rounded-card bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-body-color">
                  {selected.size} of {quiz.items.length} selected
                </span>
                <div className="h-2 w-32 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-300"
                    style={{
                      width: `${(selected.size / quiz.items.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Error message */}
            {generateError && (
              <div className="mb-6 rounded-card border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
                {generateError}
              </div>
            )}

            {/* Items Grid */}
            <div className="mb-8 grid gap-3">
              {quiz.items.map((item) => {
                const isSelected = selected.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`cursor-pointer rounded-card border-2 p-4 transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-gray-200 bg-white hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black">
                          {item.name}
                        </h3>
                        <p className="text-sm text-body-color">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit + Switch */}
            <div className="flex flex-col items-center gap-4 text-center">
              <button
                onClick={() => setShowResults(true)}
                disabled={selected.size === 0}
                className={`rounded-card px-8 py-4 text-lg font-semibold transition-colors ${
                  selected.size > 0
                    ? "bg-primary text-white shadow-btn hover:bg-primary/90"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
              >
                {selected.size === 0
                  ? "Select at least one item to continue"
                  : "Reveal My Result"}
              </button>
              {quizPicker}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
