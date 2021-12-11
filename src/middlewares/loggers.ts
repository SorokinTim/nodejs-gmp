import { RequestHandler } from "express";
import winston, { LoggerOptions } from "winston";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(`${req.method}:${req.url} ${JSON.stringify(req.body)}`);
    next();
}

export const winstonLoggerMiddleware = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'HH:mm:ss' }),
                winston.format.printf(info => {
                    return `[${[info.timestamp]}] ${info.method}: ${info.message}; Arguments: ${JSON.stringify(info.arguments)}`;
                }),
            ),
            handleExceptions: true,
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: 'logs/errors.log',
            format: winston.format.json(),
        }),
    ],
} as LoggerOptions);
