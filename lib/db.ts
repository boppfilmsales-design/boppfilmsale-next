import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("缺少 TURSO_DATABASE_URL 或 TURSO_AUTH_TOKEN 环境变量");
}

export const db = createClient({ url, authToken });

// 通用查询（带兜底：数据库连接失败时返回空数组，避免页面 500）
export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  try {
    const rs = await db.execute({ sql, args: params });
    return rs.rows as T[];
  } catch (e) {
    console.error("[db.query] 查询失败：", e);
    return [];
  }
}

// 写操作（INSERT/UPDATE），用于灌示例数据
export async function execute(sql: string, params: any[] = []) {
  return await db.execute({ sql, args: params });
}
