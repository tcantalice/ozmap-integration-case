import { Config } from './config/types';
import IntegrationController from './core/integration.controller';
import ISPServiceHttpGateway from './importer/gateways/isp-service-http-gateway';
import ISPImporter from './importer/isp-importer';
import ObservabilityManager from './observability/manager';

export default class Service {
  private readonly controller: IntegrationController;

  private running: boolean;
  private shuttingDown: boolean;

  private currentExecution: Promise<void> | null;

  constructor(private readonly __config: Config) {
    this.running = false;
    this.shuttingDown = false;
    this.currentExecution = null;

    const importer = new ISPImporter(new ISPServiceHttpGateway(__config.importer.gateway.url));

    this.controller = new IntegrationController(importer);
  }

  async run(): Promise<void> {
    this.onStart();

    while (this.running) {
      try {
        this.currentExecution = this.controller.run();

        await this.currentExecution;
      } catch (err) {
        ObservabilityManager.logger().error('Error during execution', { error: err });
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
      ObservabilityManager.logger().error('Error during shutdown', { error });
    }
  }

  protected onStart() {
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
