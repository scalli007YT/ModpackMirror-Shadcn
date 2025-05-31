import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, name, host, username, password } = body;

  if (!id || !name || !host || !username || !password) {
    return {
      success: false,
      message: "Missing required fields.",
      error: "One or more required fields are missing: id, name, host, username, password.",
    };
  }

  const filePath = join(process.cwd(), "server", "data", "server_sftp.json");

  try {
    const raw = await readFile(filePath, "utf-8");
    const json = JSON.parse(raw);

    if (!Array.isArray(json.servers)) {
      return {
        success: false,
        message: "Invalid data format.",
        error: "Expected servers to be an array.",
      };
    }

    const index = json.servers.findIndex((server: any) => server.id === id);

    if (index === -1) {
      return {
        success: false,
        message: "Server with the given ID not found.",
        error: `No server found with id: ${id}`,
      };
    }

    json.servers[index] = {
      id,
      name,
      host,
      username,
      password,
    };

    await writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

    return {
      success: true,
      data: json.servers[index],
    };
  }
  catch (error: any) {
    return {
      success: false,
      message: "Failed to update server data",
      error: error?.message || String(error),
      stack: error?.stack || undefined,
      code: error?.code || undefined,
    };
  }
});
