import InputCard from "@/components/inputCard/InputCard";
import Outputcard from "@/components/outputCard/Outputcard";

export default function Home() {
  return (
    <div className="flex mt-[142px] mb-[142px] space-x-6">
      <InputCard/>
      <Outputcard/>
    </div>
  );
}
