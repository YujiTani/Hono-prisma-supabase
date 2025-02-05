import { z } from "@hono/zod-openapi";

/**
 * クエストのスキーマ
 */
export const questSchema = z
  .object({
    uuid: z.string().openapi({
      example: "12345678-e29b-41d4-a716-123456789000",
    }),
    name: z.string().openapi({
      example: "Quest Name",
    }),
    description: z.string().optional().openapi({
      example: "Quest Description",
    }),
    state: z.enum(["DRAFT", "READY", "PUBLISHED"]).openapi({
      example: "DRAFT",
    }),
  })
  .openapi("QuestSchema");

/**
 * クエストを作成するためのスキーマ
 */
export const createQuestSchema = z
  .object({
    name: z.string().min(1).openapi({
      example: "Quest Name",
    }),
    description: z.string().optional().openapi({
      example: "Quest Description",
    }),
    state: z.enum(["DRAFT", "READY", "PUBLISHED"]).openapi({
      example: "DRAFT",
    }),
  })
  .openapi("CreateQuestSchema");

/**
 * クエストを更新するためのスキーマ
 */
export const updateQuestSchema = z
  .object({
    uuid: z.string().uuid().min(1).openapi({
      example: "12345678-e29b-41d4-a716-123456789000",
    }),
    name: z.string().min(1).openapi({
      example: "Quest Name",
    }),
    description: z.string().optional().openapi({
      example: "Quest Description",
    }),
    state: z.enum(["DRAFT", "READY", "PUBLISHED"]).openapi({
      example: "DRAFT",
    }),
  })
  .openapi("UpdateQuestSchema");

/**
 * クエストを返すスキーマ
 */
export const questResponseSchema = z
  .object({
    uuid: z.string().uuid().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    state: z.enum(["DRAFT", "READY", "PUBLISHED"]),
  })
  .openapi("QuestResponseSchema");

/**
 * クエスト一覧を返すスキーマ
 */
export const questListResponseSchema = z
  .object({
    quests: z.array(questResponseSchema),
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
  })
  .openapi("QuestListResponseSchema");
