import { Hono } from "hono";

import * as questUsecase from "@/models/usecases/quests";

// MEMO: RPC 機能を使う場合、routeはメソッドチェーンで記述する
const app = new Hono()
  /**
   * クエスト一覧を取得する
   */
  .get("/", async (c) => {
    try {
      const query = c.req.query("query") ?? "";
      const limit = c.req.query("limit") ? Number(c.req.query("limit")) : 50;
      const offset = c.req.query("offset") ? Number(c.req.query("offset")) : 0;
      const total = await questUsecase.getCount();
      const quests = await questUsecase.getAll({ query, limit, offset });

      if (total === 0) {
        const response: questUsecase.QuestListResponse =
          questUsecase.getQuestListResponse(quests, total, limit, offset);
        return c.json(response, 200);
      }

      const response: questUsecase.QuestListResponse =
        questUsecase.getQuestListResponse(quests, total, limit, offset);
      return c.json(response, 200);
    } catch (_error) {
      throw new Error("Failed to get quest list");
    }
  })
  .post("/", async (c) => {
    try {
      const { name, description, state }: questUsecase.CreateRequest =
        await c.req.json();

      // TODO: バリデーションで対応予定, 一時的に例外で処理している
      if (!name || !description || !state) {
        throw new Error("Invalid request");
      }

      const quest = await questUsecase.create({ name, description, state });
      const response: questUsecase.QuestResponse =
        questUsecase.getQuestResponse(quest);
      return c.json(response, 201);
    } catch (_error) {
      throw new Error("Failed to create quest");
    }
  });
// .get("/:id", async (c) => {
//   const { id } = c.req.param();
//   const quest = await prisma.quest.findUnique({
//     where: { id: Number(id) },
//   });

//   if (!quest) {
//     return c.json({ error: "Quest not found" }, 404);
//   }

//   const response: questUsecase.QuestResponse = {
//     uuid: quest.uuid,
//     name: quest.name,
//     description: quest.description,
//     state: quest.state,
//   };

//   return c.json(response, 200);
// });

export default app;
