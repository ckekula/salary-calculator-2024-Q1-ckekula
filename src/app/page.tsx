"use client";

import InputCard from "@/components/inputCard/InputCard";
import OutputCard from "@/components/outputCard/OutputCard";
import { useState } from "react";
import { Results } from "@/lib/types";

export default function Home() {
  const [results, setResults] = useState<Results | null>(null);

  const handleUpdate = (data: Results) => {
    console.log("Updated results:", data);
    setResults(data);
  };

  return (
    <div className="flex mt-[142px] mb-[142px] space-x-6">
      <InputCard onUpdate={handleUpdate} />
      <OutputCard results={results} />
    </div>
  );
}
