"use client";

import { useState } from "react";
import { CreditCard, Package, Receipt, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const plans = [
  {
    name: "Basic",
    price: "$9",
    features: [
      "Up to 100 listings",
      "Basic analytics",
      "Email support",
      "Standard features",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: "$29",
    features: [
      "Unlimited listings",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    features: [
      "Everything in Pro",
      "Custom branding",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
    ],
  },
];

const transactions = [
  {
    id: "INV-001",
    date: "2024-03-01",
    amount: "$29.00",
    status: "successful",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-002",
    date: "2024-02-01",
    amount: "$29.00",
    status: "successful",
    description: "Pro Plan - Monthly",
  },
  {
    id: "INV-003",
    date: "2024-01-01",
    amount: "$29.00",
    status: "failed",
    description: "Pro Plan - Monthly",
  },
];

export function BillingForm() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpgrade = async (planName: string) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdating(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Pro Plan</h3>
              <p className="text-sm text-muted-foreground">
                Billed monthly
              </p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Usage this month</span>
              <span>85/100 listings</span>
            </div>
            <Progress value={85} />
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Payment Method</h4>
            <div className="flex items-center space-x-4">
              <div className="p-2 border rounded-md">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">
                  Expires 12/2024
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the best plan for your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? "border-primary" : undefined}>
                {plan.popular && (
                  <Badge className="absolute top-4 right-4">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">{plan.price}</span>
                    /month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current || isUpdating}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your recent transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.status === "successful" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">Successful</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="text-destructive">Failed</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}