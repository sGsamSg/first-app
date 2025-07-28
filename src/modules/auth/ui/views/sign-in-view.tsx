"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BrandPage } from "@/modules/auth/ui/views/brand-page";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// 1. Zod Schema
const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export const SignInView = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setEmailError("");
      setPasswordError("");
      setIsLoading(true);
      
      const { data: result, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
        rememberMe: true
      }, {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          console.log("Better Auth Error:", ctx.error);
          const errorMessage = ctx.error.message || "Failed to sign in. Please try again.";
          
          // Parse error message to determine which field has the error
          if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("user")) {
            setEmailError(errorMessage);
          } else if (errorMessage.toLowerCase().includes("password") || errorMessage.toLowerCase().includes("credentials")) {
            setPasswordError(errorMessage);
          } else {
            // Default to password error for general authentication failures
            setPasswordError(errorMessage);
          }
        },
      });

      if (error) {
        console.log("Better Auth Error:", error);
        const errorMessage = error.message || "Failed to sign in. Please try again.";
        
        // Parse error message to determine which field has the error
        if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("user")) {
          setEmailError(errorMessage);
        } else if (errorMessage.toLowerCase().includes("password") || errorMessage.toLowerCase().includes("credentials")) {
          setPasswordError(errorMessage);
        } else {
          // Default to password error for general authentication failures
          setPasswordError(errorMessage);
        }
      }
      
    } catch (err) {
      setPasswordError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setEmailError("");
      setPasswordError("");
      setIsLoading(true);
      
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
        newUserCallbackURL: "/welcome"
      });
      
    } catch (err) {
      setPasswordError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side (Logo + Description) */}
      <BrandPage />
      {/* Right Side (Form) */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to continue
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative text-center text-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-t w-full" />
              </div>
              <span className="relative bg-background px-2 z-10 text-muted-foreground">
                or
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            <div className="text-center text-sm pt-4">
              Don't have an account?{" "}
              <a href="/sign-up" className="underline underline-offset-4 text-primary">
                Sign up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};