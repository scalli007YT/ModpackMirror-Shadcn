import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    const filePath = join(process.cwd(), "server", "data", "server_sftp.json");
    const raw = await readFile(filePath, "utf-8");
    const json = JSON.parse(raw);

    if (!Array.isArray(json.servers)) {
      throw new TypeError("Invalid server data format. Expected an array of servers.");
    }

    const updatedServers = json.servers.filter((server: any) => server.id !== id);

    if (updatedServers.length === json.servers.length) {
      return {
        success: false,
        message: `Server with ID ${id} not found.`,
        error: "No server deleted.",
      };
    }

    await writeFile(filePath, JSON.stringify({ servers: updatedServers }, null, 2), "utf-8");

    return {
      success: true,
      message: `Server with ID ${id} deleted.`,
    };
  }
  catch (error: any) {
    return {
      success: false,
      message: "Failed to delete server",
      error: error?.message || String(error),
      stack: error?.stack || undefined,
      code: error?.code || undefined,
    };
  }
});
