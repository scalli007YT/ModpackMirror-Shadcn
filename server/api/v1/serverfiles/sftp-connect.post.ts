import SftpClient from "ssh2-sftp-client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { connectionUrl, username, password } = body;

  try {
    const url = new URL(connectionUrl);

    const sftp = new SftpClient();
    await sftp.connect({
      host: url.hostname,
      port: Number.parseInt(url.port || "22"),
      username,
      password,
    });

    const fileList = await sftp.list("/");
    await sftp.end();

    return {
      success: true,
      files: fileList,
    };
  }
  catch (err: any) {
    return {
      success: false,
      message: "SFTP connection failed",
      error: err?.message || String(err),
      stack: err?.stack || undefined,
      code: err?.code || undefined,
    };
  }
});
