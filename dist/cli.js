#!/usr/bin/env node
import {
  __require,
  startProxyServer
} from "./cli-r9cx3891.js";

// bin/cli.ts
import { createRequire } from "module";
import { exec as execCallback } from "child_process";
import { promisify } from "util";
var require2 = createRequire(import.meta.url);
var { version } = require2("../package.json");
var args = process.argv.slice(2);
if (args.includes("--version") || args.includes("-v")) {
  console.log(version);
  process.exit(0);
}
if (args.includes("--help") || args.includes("-h")) {
  console.log(`meridian v${version}

Local Anthropic API powered by your Claude Max subscription.

Usage: meridian [options]

Options:
  -v, --version   Show version
  -h, --help      Show this help

Environment variables:
  MERIDIAN_PORT                     Port to listen on (default: 3456)
  MERIDIAN_HOST                     Host to bind to (default: 127.0.0.1)
  MERIDIAN_PASSTHROUGH              Enable passthrough mode (tools forwarded to client)
  MERIDIAN_IDLE_TIMEOUT_SECONDS     Idle timeout in seconds (default: 120)

See https://github.com/rynfar/meridian for full documentation.`);
  process.exit(0);
}
var exec = promisify(execCallback);
process.on("uncaughtException", (err) => {
  console.error(`[PROXY] Uncaught exception (recovered): ${err.message}`);
});
process.on("unhandledRejection", (reason) => {
  console.error(`[PROXY] Unhandled rejection (recovered): ${reason instanceof Error ? reason.message : reason}`);
});
var port = parseInt(process.env.MERIDIAN_PORT ?? process.env.CLAUDE_PROXY_PORT ?? "3456", 10);
var host = process.env.MERIDIAN_HOST ?? process.env.CLAUDE_PROXY_HOST ?? "127.0.0.1";
var idleTimeoutSeconds = parseInt(process.env.MERIDIAN_IDLE_TIMEOUT_SECONDS ?? process.env.CLAUDE_PROXY_IDLE_TIMEOUT_SECONDS ?? "120", 10);
async function runCli(start = startProxyServer, runExec = exec) {
  try {
    const { stdout } = await runExec("claude auth status", { timeout: 5000 });
    const auth = JSON.parse(stdout);
    if (!auth.loggedIn) {
      console.error("\x1B[31m✗ Not logged in to Claude.\x1B[0m Run: claude login");
      process.exit(1);
    }
    if (auth.subscriptionType !== "max") {
      console.error(`\x1B[33m⚠ Claude subscription: ${auth.subscriptionType || "unknown"} (Max recommended)\x1B[0m`);
    }
  } catch {
    console.error("\x1B[33m⚠ Could not verify Claude auth status. If requests fail, run: claude login\x1B[0m");
  }
  const proxy = await start({ port, host, idleTimeoutSeconds });
  proxy.server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      process.exit(1);
    }
  });
}
if (__require.main == __require.module) {
  await runCli();
}
export {
  runCli
};
