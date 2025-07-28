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

// Zod schema for sign-up
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export const SignUpView = () => {
  const [error, setError] = useState("");
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
      setError("");
      setIsLoading(true);
      
      const { data: result, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/"
      }, {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Failed to sign up. Please try again.");
        },
      });

      if (error) {
        setError(error.message || "Failed to sign up. Please try again.");
      }
      
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError("");
      setIsLoading(true);
      
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/sign-up",
        newUserCallbackURL: "/welcome"
      });
      
    } catch (err) {
      setError("Failed to sign up with Google. Please try again.");
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
              <h2 className="text-2xl font-semibold">Create an account</h2>
              <p className="text-sm text-muted-foreground">
                Sign up to start using MyApp
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

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
                {error && error.includes("already exists") && (
                  <p className="text-sm text-red-500">This email is already registered. Please sign in instead.</p>
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
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? "Signing up..." : "Sign Up"}
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
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            <div className="text-center text-sm pt-4">
              Already have an account?{" "}
              <a href="/sign-in" className="underline underline-offset-4 text-primary">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};