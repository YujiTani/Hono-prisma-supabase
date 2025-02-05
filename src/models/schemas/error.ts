import { z } from "@hono/zod-openapi";

/**
 * エラーレスポンスのスキーマ
 */
export const ErrorResponse = z
  .object({
    message: z.string(),
    stackTrace: z.string().optional(),
  })
  .openapi("ErrorResponse");
