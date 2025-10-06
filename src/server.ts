import { app } from './app';
import { env } from './env';
import { logger } from './logger';

app.listen(env.PORT, () => {
  logger.info(`TinyTasks API listening on http://localhost:${env.PORT}`);
});
