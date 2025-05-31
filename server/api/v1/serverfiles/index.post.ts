import SftpClient from "ssh2-sftp-client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { connectionUrl, username, password, filename, content } = body;

  let url: URL;
  try {
    url = new URL(connectionUrl);
  }
  catch (err: any) {
    return {
      success: false,
      message: "Invalid connection URL",
      error: err?.message || String(err),
    };
  }

  const port = url.port ? Number.parseInt(url.port) : 22;
  if (isNaN(port) || port <= 0 || port > 65535) {
    return {
      success: false,
      message: "Invalid port number",
      error: `Port provided: ${url.port}`,
    };
  }

  const sftp = new SftpClient();

  try {
    await sftp.connect({
      host: url.hostname,
      port,
      username,
      password,
    });
  }
  catch (err: any) {
    return {
      success: false,
      message: "Failed to connect to SFTP server",
      error: err?.message || String(err),
      stack: err?.stack || undefined,
      code: err?.code || undefined,
    };
  }

  try {
    const remotePath = `/${filename}`;
    await sftp.put(Buffer.from(content, "utf-8"), remotePath);
  }
  catch (err: any) {
    await sftp.end();
    return {
      success: false,
      message: "Failed to upload file",
      error: err?.message || String(err),
      stack: err?.stack || undefined,
      code: err?.code || undefined,
    };
  }

  try {
    await sftp.end();
  }
  catch (err: any) {
    return {
      success: false,
      message: "Failed to close SFTP connection properly",
      error: err?.message || String(err),
      stack: err?.stack || undefined,
      code: err?.code || undefined,
    };
  }

  return {
    success: true,
    message: `File "${filename}" created successfully.`,
  };
});
