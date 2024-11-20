"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
      router.replace('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-8">
              <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
                <Globe className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DirectoryBuilder</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <Button 
                className="w-full transition-all duration-200 hover:scale-[1.02]" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <div className="text-center space-y-2">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline hover:text-primary/90 transition-colors"
                >
                  Forgot your password?
                </Link>
                <div className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/register" 
                    className="text-primary hover:underline hover:text-primary/90 transition-colors font-medium"
                  >
                    Create one now
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Image/Gradient */}
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Build Your Directory
            </h2>
            <p className="text-muted-foreground">
              Create, manage, and grow your directory with our powerful platform. Join thousands of successful directory owners today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}