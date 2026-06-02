import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create Supabase client with retry configuration for transient failures
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
  global: {
    headers: {
      'x-client-info': 'learning-dashboard',
    },
  },
  // Note: Supabase JS client has built-in retry logic for network errors
  // Additional retry logic is implemented in server actions for better control
});

/**
 * Retry utility for database operations with exponential backoff
 * Handles transient connection failures gracefully
 * 
 * @param operation - Async function to retry
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param baseDelay - Base delay in milliseconds (default: 1000)
 * @returns Result of the operation
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if error is retryable (network/connection errors)
      const isRetryable = isTransientError(lastError);

      // Don't retry if it's not a transient error or we've exhausted retries
      if (!isRetryable || attempt === maxRetries) {
        throw lastError;
      }

      // Calculate exponential backoff delay: baseDelay * 2^attempt
      const delay = baseDelay * Math.pow(2, attempt);
      
      // Add jitter to prevent thundering herd (±25% randomization)
      const jitter = delay * 0.25 * (Math.random() * 2 - 1);
      const delayWithJitter = Math.max(0, delay + jitter);

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delayWithJitter));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError || new Error("Operation failed after retries");
}

/**
 * Determines if an error is transient and should be retried
 * 
 * @param error - Error to check
 * @returns true if error is transient, false otherwise
 */
function isTransientError(error: Error): boolean {
  const message = error.message.toLowerCase();
  
  // Network and connection errors that are typically transient
  const transientPatterns = [
    'network',
    'timeout',
    'connection',
    'econnrefused',
    'enotfound',
    'etimedout',
    'fetch failed',
    'failed to fetch',
    'socket hang up',
    'econnreset',
  ];

  return transientPatterns.some((pattern) => message.includes(pattern));
}
