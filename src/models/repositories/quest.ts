import { PrismaClient } from "@prisma/client";

import type { LimitOffsetRequest } from "@/models/types/common";
import type { CreateRequest } from "@/models/usecases/quests";
import type { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type Quest = Prisma.QuestGetPayload<object>;

/**
 * クエストの総数を取得する
 * @returns クエストの総数
 */
export const count = () =>
  prisma.quest.count({
    where: {
      deletedAt: null,
    },
  });

/**
 * クエスト一覧を取得する
 * @param payload.query クエスト名で検索するクエリ
 * @param payload.limit 取得するクエストの数
 * @param payload.offset 取得するクエストの開始位置
 * @returns クエスト一覧
 */
export const findAll = (payload: LimitOffsetRequest): Promise<Quest[]> =>
  prisma.quest.findMany({
    where: {
      deletedAt: null,
      name: {
        contains: payload.query,
      },
    },
    skip: payload.offset,
    take: payload.limit,
    orderBy: {
      createdAt: "desc",
    },
  });

/**
 * クエストを作成する
 * @param uuid クエストのUUID
 * @param payload クエストのデータ
 * @returns 作成されたクエスト
 */
export const create = (payload: { uuid: string } & CreateRequest) =>
  prisma.quest.create({
    data: {
      ...payload,
    },
  });
