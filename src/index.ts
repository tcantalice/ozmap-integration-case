import { load as loadConfig } from './config/loader';
import ObservabilityManager from './observability/manager';
import Service from './service';

function bootstrap(): Service {
  const config = loadConfig();

  ObservabilityManager.init(config);

  return new Service(config);
}

async () => bootstrap().start();
