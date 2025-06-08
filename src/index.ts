import { load as loadConfig } from './config/loader';
import ObservabilityManager from './observability/manager';
import Service from './service';

async function shutdownGracefully(service: Service, exitCode = 0) {
  try {
    await service.shutdown();
  } catch (error) {
  } finally {
    process.exit(exitCode);
  }
}

function registerListeners(service: Service) {
  process.on('SIGINT', () => shutdownGracefully(service, 0));
  process.on('SIGTERM', () => shutdownGracefully(service, 0));
}

async function bootstrap() {
  const config = loadConfig();

  ObservabilityManager.init(config);

  const service = new Service(config);

  registerListeners(service);

  try {
    await service.run();
  } catch (error) {
    ObservabilityManager.logger().error('Uncaught error in bootstrap', { error });
    await shutdownGracefully(service, 1);
  }
}

bootstrap();
