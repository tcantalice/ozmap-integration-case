import { Config } from './config/types';
import IntegrationController from './core/integration.controller';
import ISPServiceHttpGateway from './importer/gateways/isp-service-http-gateway';
import ISPImporter from './importer/isp-importer';
import ObservabilityManager from './observability/manager';

export default class Service {
  private readonly controller: IntegrationController;

  constructor(config: Config) {
    const importer = new ISPImporter(new ISPServiceHttpGateway(config.importer.gateway.url));

    this.controller = new IntegrationController(importer);
  }

  async start(): Promise<void> {
    ObservabilityManager.logger().info('Starting service');
  }
}
