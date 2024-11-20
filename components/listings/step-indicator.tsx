"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-0 top-[15px] h-0.5 w-full bg-muted"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{
            width: `${
              ((steps.findIndex((step) => step.id === currentStep)) /
                (steps.length - 1)) *
              100
            }%`,
          }}
        />
      </div>

      <ul className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCurrent = currentStep === step.id;
          const isComplete =
            steps.findIndex((s) => s.id === currentStep) > index;

          return (
            <li
              key={step.id}
              className="flex flex-col items-center"
            >
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  isComplete && "border-primary bg-primary text-primary-foreground",
                  !isCurrent && !isComplete && "border-muted-foreground bg-background"
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium">{step.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}