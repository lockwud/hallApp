import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from 'config';

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}:${info.message}`)
);

const transport = new DailyRotateFile({
  filename: `${config.get<string>('logConfig.logFolder')}${config.get<string>('logConfig.logFile')}`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
  level: config.get<string>('logConfig.logLevel'),
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;
