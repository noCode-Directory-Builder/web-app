"use client";

import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UsageCreditsProps {
  used: number;
  total: number;
  planName: string;
}

export function UsageCredits({ used, total, planName }: UsageCreditsProps) {
  const percentage = (used / total) * 100;
  const remaining = total - used;
  const isLow = remaining <= total * 0.2; // Less than 20% remaining

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Directory Credits</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{remaining}</span>
          <span className="text-sm text-muted-foreground">of {total} remaining</span>
        </div>
        
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {used} of {total} directories used in your {planName} plan
          </p>
        </div>

        {isLow && (
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard/settings?tab=billing">
                Upgrade Plan
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}