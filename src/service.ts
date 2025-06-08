import { Config } from './config/types';
import IntegrationController from './core/integration.controller';
import ObservabilityManager from './observability/manager';

export default class Service {
  private readonly controller: IntegrationController;

  constructor(
    config: Config,
    private readonly __observability: ObservabilityManager,
  ) {
    this.controller = new IntegrationController();
  }

  async start(): Promise<void> {
    this.__observability.logger.info('Starting service');
  }
}
