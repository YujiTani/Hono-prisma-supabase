import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { every } from "hono/combine";
// import { bearerAuth } from 'hono/bearer-auth'
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";

import routes from "@/routes";

const app = new Hono();

/**
 * 必ず適用するミドルウェアを combine の every でまとめている
 * 認証が失敗した場合、以降のミドルウェアは実行されない
 * https://hono-ja.pages.dev/docs/middleware/builtin/combine
 */
// TODO: カスタマイズ認証を作成して都度改修しやすくしたい
app.use("*", async (c, next) => {
  await every(
    basicAuth({ username: "user", password: "password" }),
    logger(),
    prettyJSON(),
    requestId(),
  )(c, next);
});

app.route("/api", routes);

// エラーハンドリング usecase、repositoryで発生したエラーをここで捕獲、500以外のエラーはここで捕獲しない
app.onError((err, c) => {
  // eslint-disable-next-line no-console
  console.error(err);
  return c.json({ message: "Internal Server Error" }, 500);
});

app.get("/", (c) =>
  c.json({
    message: "Hello Hono!",
  }),
);

app.get("/hello", (c) => c.json({ message: "Hello Hono!" }));

app.get("/post/:id", (c) => {
  const id = c.req.param("id");
  const page = c.req.query("page");
  c.header("Content-Type", "application/json");
  c.header("X-message", "Hi!");
  return c.text(`You want to see ${page} of ${id}`);
});

const posts = [
  {
    id: 1,
    title: "Honoフレームワークを使ってみた",
    content:
      "Honoは軽量で高速なWebフレームワークです。今回はHonoを使って簡単なAPIを作ってみました。",
  },
  {
    id: 2,
    title: "エッジコンピューティングの未来",
    content:
      "エッジコンピューティングは、クラウドコンピューティングの次の革新として注目されています。本記事では、その可能性について探ります。",
  },
  {
    id: 3,
    title: "Web開発のベストプラクティス2024",
    content:
      "最新のWeb開発トレンドとベストプラクティスについて解説します。パフォーマンス、セキュリティ、アクセシビリティの観点から考察します。",
  },
];

app.get("/posts", (c) =>
  c.json({
    requestId: c.req.header("X-Request-Id"),
    posts: [...posts],
  }),
);

app.delete("/posts/:id", (c) => c.text(`${c.req.param("id")} is deleted!`));

export default {
  port: 8787,
  fetch: app.fetch,
};
