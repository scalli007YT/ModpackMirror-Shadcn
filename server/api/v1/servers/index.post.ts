import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, host, username, password } = body;

  if (!name || !host || !username || !password) {
    return {
      success: false,
      message: "Missing required fields.",
      error: "One or more required fields are missing: name, host, username, password.",
    };
  }

  const filePath = join(process.cwd(), "server", "data", "server_sftp.json");

  try {
    const raw = await readFile(filePath, "utf-8");
    const json = JSON.parse(raw);

    const newServer = {
      id: `${username}.${randomBytes(4).toString("hex")}`,
      name,
      host,
      username,
      password,
    };

    const updatedServers = Array.isArray(json.servers) ? [...json.servers, newServer] : [newServer];

    await writeFile(filePath, JSON.stringify({ servers: updatedServers }, null, 2), "utf-8");

    return {
      success: true,
      data: newServer,
    };
  }
  catch (error: any) {
    return {
      success: false,
      message: "Failed to write server data",
      error: error?.message || String(error),
      stack: error?.stack || undefined,
      code: error?.code || undefined,
    };
  }
});
