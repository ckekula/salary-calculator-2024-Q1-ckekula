"use client"

import { useEffect, useMemo } from "react";
import * as z from "zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { calcEPF, calcETF, calcAPIT, calcNetSalary, calcCTC, calcTax } from "@/lib/calculation";

const formSchema = z.object({
  basicSalary: z.number().default(0),
  earnings: z.array(z.object({
    title: z.string(),
    amount: z.number().default(0),
    includeEPF: z.boolean().optional().default(false),
  })),
  deductions: z.array(z.object({
    title: z.string(),
    amount: z.number().default(0),
    includeEPF: z.boolean().optional().default(false),
  }))
});

interface InputFormProps {
  onUpdate: (results: any) => void;
}

function InputForm({ onUpdate }: InputFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicSalary: 0,
      earnings: [],
      deductions: []
    },
  })

  const { control, register } = form;
  const { fields: earningFields, append: addEarning, remove: removeEarning } = useFieldArray({ control, name: "earnings" });
  const { fields: deductionFields, append: addDeduction, remove: removeDeduction } = useFieldArray({ control, name: "deductions" });

  const basicSalary = useWatch({ control, name: "basicSalary" });
  const earnings = useWatch({ control, name: "earnings" });
  const deductions = useWatch({ control, name: "deductions" });

  const calcResults = useMemo(() => {
    const data = form.getValues();
    console.log("Form values:", data);

    const totalEarnings = data.basicSalary + data.earnings.reduce((acc, earning) => acc + earning.amount, 0);
    const grossDeduction = data.deductions.reduce((acc, deduction) => acc + deduction.amount, 0);
    const grossEarnings = totalEarnings - grossDeduction;
    const totalEarningsForEPF = data.basicSalary + data.earnings.filter(e => e.includeEPF).reduce((acc, earning) => acc + earning.amount, 0);
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const { employeeEPF, employerEPF } = calcEPF(grossSalaryForEPF);
    const employerETF = calcETF(grossSalaryForEPF);
    const { taxRate, taxConstant } = calcTax(grossSalaryForEPF);
    const APIT = calcAPIT(grossEarnings, taxRate, taxConstant);
    const netSalary = calcNetSalary(grossEarnings, employeeEPF, APIT);
    const CTC = calcCTC(grossEarnings, employerEPF, employerETF);

    const results = {
      basicSalary,
      totalEarnings,
      grossDeduction,
      grossEarnings,
      grossSalaryForEPF,
      employeeEPF,
      employerEPF,
      employerETF,
      APIT,
      netSalary,
      CTC
    };

    console.log("Calculation results:", results);

    return results;
  }, [basicSalary, earnings, deductions]);

  useEffect(() => {
    console.log("useEffect - calcResults:", calcResults);
    onUpdate(calcResults);
  }, [calcResults, onUpdate]);

  return (
    <div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="basicSalary"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="text-base font-medium">Basic Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your basic salary"
                  type="number"
                  className="w-[356px] h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {earningFields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`earnings.${index}`}
            render={() => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-medium">Earnings</FormLabel>
                <FormDescription>Allowance, Fixed allowance, bonus, etc</FormDescription>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Pay details (Title)"
                      type="string"
                      className="w-[212px] h-12"
                      {...register(`earnings.${index}.title`)}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Amount"
                      type="number"
                      className="w-[212px] h-12"
                      {...register(`earnings.${index}.amount`, { valueAsNumber: true })}
                    />
                  </FormControl>
                  <Button variant="ghost" onClick={() => removeEarning(index)}>
                    <Image src="/delete.png" alt="Delete earning" width={24} height={24} />
                  </Button>
                  <FormControl>
                    <Checkbox {...register(`earnings.${index}.includeEPF`)} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          variant="ghost"
          className="text-brand-color space-x-1 text-sm"
          onClick={() => addEarning({ title: '', amount: 0, includeEPF: false })}
        >
          <Image src="/add.png" alt="Add earning" width={14} height={14} />
          <div className="">Add new earning</div>
        </Button>
        <Separator className="my-4" />
        {deductionFields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`deductions.${index}`}
            render={() => (
              <FormItem className="mb-6">
                <FormLabel className="text-base font-medium">Deductions</FormLabel>
                <FormDescription>Salary advances, Loan deductions, etc</FormDescription>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Pay details (Title)"
                      type="string"
                      className="w-[212px] h-12"
                      {...register(`deductions.${index}.title`)}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="Amount"
                      type="number"
                      className="w-[212px] h-12"
                      {...register(`deductions.${index}.amount`, { valueAsNumber: true })}
                    />
                  </FormControl>
                  <Button variant="ghost" onClick={() => removeDeduction(index)}>
                    <Image src="/delete.png" alt="Delete deduction" width={24} height={24} />
                  </Button>
                  <FormControl>
                    <Checkbox {...register(`deductions.${index}.includeEPF`)} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          variant="ghost"
          className="text-brand-color space-x-1 text-sm"
          onClick={() => addDeduction({ title: '', amount: 0, includeEPF: false })}
        >
          <Image src="/add.png" alt="Add icon" width={14} height={14} />
          <div className="">Add new deduction</div>
        </Button>
      </Form>
    </div>
  );
}

export default InputForm;