type LogFields = Record<string, unknown>;
export declare const withClaudeLogContext: <T>(context: LogFields, fn: () => T) => T;
export declare const claudeLog: (event: string, extra?: LogFields) => void;
export {};
//# sourceMappingURL=logger.d.ts.map