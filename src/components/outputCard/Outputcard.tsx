import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import OutputTable from "../outputTable/OutputTable"


function Outputcard() {
  return (
    <div>
        <Card className="w-[480px] h-[616px] mr-[128px] bg-gray-50 border-card-border">
        <CardHeader>
            <CardTitle>You salary</CardTitle>
        </CardHeader>
        <CardContent>
            <OutputTable/>
        </CardContent>
        </Card>
    </div>
  )
}

export default Outputcard