import { z } from "zod";

export const candidateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().nullable().optional(),
  title: z.string().min(1, "Job title is required").max(100, "Job title must be less than 100 characters"),
  experience: z.number().int("Experience must be a whole number").min(0, "Experience cannot be negative").max(50, "Experience cannot exceed 50 years"),
  location: z.string().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  status: z.enum(["active", "inactive", "placed"]),
  skills: z.string().nullable().optional(),
  appliedAt: z.string().datetime("Invalid date format"),
  createdAt: z.string().datetime("Invalid date format"),
  updatedAt: z.string().datetime("Invalid date format"),
});

// Schema for creating a new candidate
export const createCandidateSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().nullable().optional(),
  title: z.string().min(1, "Job title is required").max(100, "Job title must be less than 100 characters"),
  experience: z.number().int("Experience must be a whole number").min(0, "Experience cannot be negative").max(50, "Experience cannot exceed 50 years"),
  location: z.string().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  status: z.enum(["active", "inactive", "placed"]),
  skills: z.string().nullable().optional(),
});

// Schema for updating a candidate
export const updateCandidateSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters").optional(),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters").optional(),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").optional(),
  phone: z.string().nullable().optional(),
  title: z.string().min(1, "Job title is required").max(100, "Job title must be less than 100 characters").optional(),
  experience: z.number().int("Experience must be a whole number").min(0, "Experience cannot be negative").max(50, "Experience cannot exceed 50 years").optional(),
  location: z.string().min(1, "Location is required").max(100, "Location must be less than 100 characters").optional(),
  status: z.enum(["active", "inactive", "placed"]).optional(),
  skills: z.string().nullable().optional(),
});

// Type exports
export type Candidate = z.infer<typeof candidateSchema>;
export type CreateCandidate = z.infer<typeof createCandidateSchema>;
export type UpdateCandidate = z.infer<typeof updateCandidateSchema>;