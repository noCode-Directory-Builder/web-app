"use client";

import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Package {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular: boolean;
}

interface PackageBuilderProps {
  packages: Package[];
  onChange: (packages: Package[]) => void;
  features: string[];
}

export function PackageBuilder({
  packages,
  onChange,
  features,
}: PackageBuilderProps) {
  const addPackage = () => {
    onChange([
      ...packages,
      {
        name: `Package ${packages.length + 1}`,
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [],
        isPopular: false,
      },
    ]);
  };

  const removePackage = (index: number) => {
    const newPackages = [...packages];
    newPackages.splice(index, 1);
    onChange(newPackages);
  };

  const updatePackage = (index: number, updates: Partial<Package>) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], ...updates };
    onChange(newPackages);
  };

  const toggleFeature = (packageIndex: number, feature: string) => {
    const newPackages = [...packages];
    const currentFeatures = newPackages[packageIndex].features;
    
    if (currentFeatures.includes(feature)) {
      newPackages[packageIndex].features = currentFeatures.filter(f => f !== feature);
    } else {
      newPackages[packageIndex].features = [...currentFeatures, feature];
    }
    
    onChange(newPackages);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Input
                  value={pkg.name}
                  onChange={(e) =>
                    updatePackage(index, { name: e.target.value })
                  }
                  className="font-semibold text-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removePackage(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Monthly Price</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={pkg.monthlyPrice}
                      onChange={(e) =>
                        updatePackage(index, { monthlyPrice: Number(e.target.value) })
                      }
                      className="w-24"
                    />
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Yearly Price</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={pkg.yearlyPrice}
                      onChange={(e) =>
                        updatePackage(index, { yearlyPrice: Number(e.target.value) })
                      }
                      className="w-24"
                    />
                    <span className="text-muted-foreground">/year</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Switch
                  checked={pkg.isPopular}
                  onCheckedChange={(checked) =>
                    updatePackage(index, { isPopular: checked })
                  }
                />
                <span className="text-sm">Popular</span>
              </div>
              {pkg.isPopular && (
                <Badge className="absolute top-2 right-12">Popular</Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => toggleFeature(index, feature)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        pkg.features.includes(feature)
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {pkg.features.includes(feature) && (
                        <Check className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        <Button
          variant="outline"
          className="h-full min-h-[200px]"
          onClick={addPackage}
        >
          <Plus className="h-6 w-6 mr-2" />
          Add Package
        </Button>
      </div>
    </div>
  );
}