import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputForm from "../inputForm/InputForm";
import Image from "next/image";
import { Button } from "../ui/button";

interface InputCardProps {
  onUpdate: (results: any) => void;
}

const InputCard = ({ onUpdate }: InputCardProps) => {
  return (
    <div>
        <Card className="w-[680px] h-[616px] ml-[128px] bg-gray-50 border-card-border">
          <CardHeader className="mt-[24px]">
            <CardTitle className="flex justify-between">
              <div>
              Calculate your salary
              </div>
              <Button variant="ghost" className="text-brand-color space-x-1 text-sm">
                <Image
                    src="/reset.png"
                    alt="Reset icon"
                    width={24}
                    height={24}
                />
                <div>
                    Reset
                </div>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
              <InputForm onUpdate={onUpdate} />
          </CardContent>
        </Card>
    </div>
  )
}

export default InputCard;
