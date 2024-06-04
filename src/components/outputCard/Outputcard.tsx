import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import OutputTable from "../outputTable/OutputTable"
import { Results } from "@/lib/types";

interface OutputCardProps {
  results: Results | null;
}

const OutputCard = ({ results }: OutputCardProps) => {
  return (
    <div>
        <Card className="w-[480px] h-[616px] mr-[128px] bg-gray-50 border-card-border">
        <CardHeader>
            <CardTitle>You salary</CardTitle>
        </CardHeader>
        <CardContent>
            <OutputTable results={results}/>
        </CardContent>
        </Card>
    </div>
  )
}

export default OutputCard