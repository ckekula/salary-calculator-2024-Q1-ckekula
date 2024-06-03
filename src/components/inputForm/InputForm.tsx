"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";

const formSchema = z.object({
  basicSalary: z.number().default(0),
  earnings: z.number().default(0),
  deductions: z.number().default(0),
  epfetf: z.boolean().default(false).optional(),
});

function InputForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            basicSalary: 0,
            earnings: 0,
            deductions: 0
        },
    })

    const handleSubmit = () => {}

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField 
                    control={form.control} 
                    name="basicSalary" 
                    render={(field) => {
                        return <FormItem>
                            <FormLabel>Basic Salary</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder="Your basic salary" 
                                type="number"
                                {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }}/>
                    <FormField 
                    control={form.control} 
                    name="earnings" 
                    render={({field}) => {
                        return <FormItem>
                            <FormLabel>Earnings</FormLabel>
                            <FormDescription>Allowance, Fixed allowance, bonus, etc</FormDescription>
                            <div className="flex space-x-2">
                                <FormControl>
                                    <Input 
                                    placeholder="Pay details (Title)" 
                                    type="string"
                                    {...field} />
                                </FormControl>
                                <FormControl>
                                    <Input 
                                    placeholder="Amount" 
                                    type="number"
                                    {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    }}/>
                    <Button variant="ghost" className="text-add-button space-x-1 text-sm">
                        <Image
                            src="/add.png"
                            alt="Add icon"
                            width={14}
                            height={14}
                        />
                        <div className="">
                            Add new deduction
                        </div>
                    </Button>
                    <Separator className="my-4"/>
                    <FormField 
                    control={form.control} 
                    name="deductions"  
                    render={(field) => {
                        return <FormItem>
                            <FormLabel>Deductions</FormLabel>
                            <FormDescription>Salary advances, Loan deducations, etc</FormDescription>
                            <div className="flex space-x-2">
                                <FormControl>
                                    <Input 
                                    placeholder="Pay details (Title)" 
                                    type="string"
                                    {...field} />
                                </FormControl>
                                <FormControl>
                                    <Input 
                                    placeholder="Amount" 
                                    type="number"
                                    {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    }}/>
                    <Button variant="ghost" className="text-add-button space-x-1 text-sm">
                        <Image
                            src="/add.png"
                            alt="Add icon"
                            width={14}
                            height={14}
                        />
                        <div className="">
                            Add new deduction
                        </div>
                    </Button>
                </form>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default InputForm;