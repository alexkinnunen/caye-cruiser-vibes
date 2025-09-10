// src/lib/env.ts
import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url("VITE_SUPABASE_URL must be a valid URL"),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(
    1,
    "VITE_SUPABASE_PUBLISHABLE_KEY is required",
  ),
});

// Validate environment variables
function validateEnv() {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    const errors = result.error.errors.map((err) =>
      `${err.path.join(".")}: ${err.message}`
    ).join("\n");
    throw new Error(`Environment validation failed:\n${errors}`);
  }

  return result.data;
}

// Export validated environment variables
export const env = validateEnv();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
