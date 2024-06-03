import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "../ui/card"

function OutputTable() {
  return (
    <div>
    <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Items</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell className="font-medium">Basic Salary</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Gross Earning Salary</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Gross Deduction</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Employee EPF (8%)</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">APIT</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <p>Contribution from the employer</p>
    <Card className="bg-gray-50 border-black flex">
        <CardContent className="text-left">
            Net salary
        </CardContent>
        <CardContent className="text-right">
            $250
        </CardContent>
    </Card>
    <Table>
        <TableBody>
            <TableRow>
                <TableCell className="font-medium">Employer EPF (12%)</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="font-medium">Employer ETF (3%)</TableCell>
                <TableCell className="text-right">$250</TableCell>
            </TableRow>
        </TableBody>        
        <TableFooter>
            <TableRow>
            <TableCell>CTC (Cost to Company)</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
        </TableFooter>
    </Table>
    </div>
  )
}

export default OutputTable