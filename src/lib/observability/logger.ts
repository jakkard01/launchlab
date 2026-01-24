type LogContext = Record<string, unknown> & {
  requestId?: string;
};

type LogLevel = "info" | "warn" | "error";

function writeLog(level: LogLevel, message: string, context?: LogContext) {
  const payload = {
    level,
    ts: new Date().toISOString(),
    message,
    ...(context ?? {}),
  };

  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (message: string, context?: LogContext) => writeLog("info", message, context),
  warn: (message: string, context?: LogContext) => writeLog("warn", message, context),
  error: (message: string, context?: LogContext) => writeLog("error", message, context),
};
