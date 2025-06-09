import { load as loadConfig } from './config/loader';
import ErrorHandler from './error/handler';
import ObservabilityManager from './observability/provider';
import Service from './service';
import StateStorageProvider from './state/providers/state-storage.provider';

async function shutdownGracefully(service: Service, exitCode = 0) {
  try {
    await service.shutdown();
  } catch (error) {
  } finally {
    process.exit(exitCode);
  }
}

function registerListeners(service: Service) {
  process.once('SIGINT', () => shutdownGracefully(service, 0));
  process.once('SIGTERM', () => shutdownGracefully(service, 0));
  process.once('uncaughtException', () => shutdownGracefully(service, 1));
  process.once('unhandledRejection', () => shutdownGracefully(service, 1));
}

async function bootstrap() {
  const config = loadConfig();

  ObservabilityManager.init(config);
  StateStorageProvider.init();

  const errorHandler = new ErrorHandler();

  const service = new Service(config, errorHandler);

  registerListeners(service);

  try {
    await service.run();
  } catch (error) {
    ObservabilityManager.logger().error('Uncaught error in bootstrap', { error });
    await shutdownGracefully(service, 1);
  }
}

bootstrap();
