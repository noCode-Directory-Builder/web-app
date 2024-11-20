"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface WizardStepsProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
  completedSteps: string[];
}

export function WizardSteps({
  steps,
  currentStep,
  onStepClick,
  completedSteps,
}: WizardStepsProps) {
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
              (completedSteps.length / (steps.length - 1)) * 100
            }%`,
          }}
        />
      </div>

      <ul className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <li
              key={step.id}
              className="flex flex-col items-center"
            >
              <button
                onClick={() => onStepClick(step.id)}
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isCurrent && !isCompleted && "border-muted-foreground bg-background"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              <span className="mt-2 text-sm font-medium">{step.title}</span>
              <span className="text-xs text-muted-foreground">
                {step.description}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}