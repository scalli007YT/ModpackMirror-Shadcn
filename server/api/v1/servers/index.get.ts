import { readFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async () => {
  try {
    const filePath = join(process.cwd(), "server", "data", "server_sftp.json");
    const raw = await readFile(filePath, "utf-8");
    const json = JSON.parse(raw);

    return {
      success: true,
      data: json.servers || [],
    };
  }
  catch (error: any) {
    return {
      success: false,
      message: "Failed to load server data",
      error: error?.message || String(error),
      stack: error?.stack || undefined,
      code: error?.code || undefined,
    };
  }
});
