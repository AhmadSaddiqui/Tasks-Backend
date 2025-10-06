import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { requestId } from './middlewares/request-id';
import { errorHandler } from './middlewares/error';
import { logger } from './logger';
import { health } from './routes/health';

export const app = express();

// Request correlation + logging
app.use(requestId);
app.use(
  pinoHttp({
    logger,
    customProps: (req) => ({ requestId: (req as any).id }),
  }),
);

// Security + parsing
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Routes
app.use(health);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', path: req.path });
});

// Error handler (last)
app.use(errorHandler);
