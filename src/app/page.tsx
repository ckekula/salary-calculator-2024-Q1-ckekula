"use client"

import InputCard from "@/components/inputCard/InputCard";
import OutputCard from "@/components/outputCard/OutputCard";
import { useState } from "react";

export default function Home() {

  const [results, setResults] = useState(null);

  return (
    <div className="flex mt-[142px] mb-[142px] space-x-6">
      <InputCard onUpdate={(data) => setResults(data)} />
      <OutputCard results={results} />
    </div>
  );
}
