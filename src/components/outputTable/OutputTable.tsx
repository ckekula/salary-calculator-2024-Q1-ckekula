import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "../ui/card";
import { Results } from "@/lib/types";

interface OutputTableProps {
  results: Results | null;
}

const OutputTable = ({ results }: OutputTableProps) => {
  const formatCurrency = (value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  if (!results) {
    return <div className="text-center py-4">No data available. Please fill in the form to see the results.</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Items</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="min-h-6">
            <TableCell className="font-normal">Basic Salary</TableCell>
            <TableCell className="text-right">{formatCurrency(results.totalEarnings)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-normal">Gross Earnings</TableCell>
            <TableCell className="text-right">{formatCurrency(results.grossEarnings)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-normal">Gross Deduction</TableCell>
            <TableCell className="text-right">{formatCurrency(results.grossDeduction)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-normal">Employee EPF (8%)</TableCell>
            <TableCell className="text-right">{formatCurrency(results.employeeEPF)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-normal">APIT</TableCell>
            <TableCell className="text-right">{formatCurrency(results.APIT)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Card className="bg-gray-50 border-card-border flex justify-between items-center w-[448px] h-[56px] p-4">
        <CardContent className="text-base font-semibold">
          Net Salary (Take Home)
        </CardContent>
        <CardContent className="text-base font-semibold">
          {formatCurrency(results.netSalary)}
        </CardContent>
      </Card>
      <p className="text-sm font-semibold text-text-secondary mt-4">Contribution from the employer</p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-normal">Employer EPF (12%)</TableCell>
            <TableCell className="text-right">{formatCurrency(results.employerEPF)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-normal">Employer ETF (3%)</TableCell>
            <TableCell className="text-right">{formatCurrency(results.employerETF)}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>CTC (Cost to Company)</TableCell>
            <TableCell className="text-right">{formatCurrency(results.CTC)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default OutputTable;