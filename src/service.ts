import { Config } from './config/types';
import IntegrationController from './core/integration.controller';
import ErrorHandler from './error/handler';
import OZMapMockGateway from './exporter/gateways/ozmap-mock-gateway';
import OZMapExporter from './exporter/ozmap-exporter';
import ISPServiceHttpGateway from './importer/gateways/isp-service-http-gateway';
import ISPImporter from './importer/isp-importer';
import ObservabilityManager from './observability/provider';

export default class Service {
  private readonly controller: IntegrationController;

  private running: boolean;
  private shuttingDown: boolean;

  private currentExecution: Promise<void> | null;

  constructor(
    private readonly __config: Config,
    private readonly __errorHandler: ErrorHandler,
  ) {
    this.running = false;
    this.shuttingDown = false;
    this.currentExecution = null;

    const importer = new ISPImporter(new ISPServiceHttpGateway(__config.importer.gateway.url));
    const exporter = new OZMapExporter(new OZMapMockGateway());

    this.controller = new IntegrationController(importer, exporter);
  }

  async run(): Promise<void> {
    await this.onStart();

    while (this.running) {
      try {
        this.currentExecution = this.controller.run();

        await this.currentExecution;
      } catch (err) {
        this.__errorHandler.handle(err);
      }

      await this.delay();
    }
  }

  async shutdown() {
    if (this.shuttingDown) return;

    this.shuttingDown = true;

    try {
      if (this.currentExecution) {
        await this.currentExecution;
      }

      await this.onFinish();
    } catch (error) {
      this.__errorHandler.handle(error);
    }
  }

  protected async onStart() {
    ObservabilityManager.logger().info('Starting service');

    this.running = true;
  }

  protected async onFinish() {
    ObservabilityManager.logger().info('Stopping service');

    this.running = false;
  }

  private delay(): Promise<unknown> {
    return new Promise((res) => setTimeout(res, this.intervalMiliseconds));
  }

  get intervalMiliseconds(): number {
    return this.__config.service.interval * 60 * 1000;
  }
}
