import type SourceData from '../data/source.data';
import Box from '../entities/box.entity';
import Cable from '../entities/cable.entity';
import Customer from '../entities/customer.entity';
import OZMapExporter from '../exporter/ozmap-exporter';
import ISPImporter from '../importer/isp-importer';
import { Logger } from '../observability/contracts/logger';
import ObservabilityProvider from '../observability/provider';
import StateManager from '../state/contracts/manager';
import StateManagerProvider from '../state/providers/state-manager.provider';

export default class IntegrationController {
  private readonly boxStateManager: StateManager<Box>;
  private readonly cableStateManager: StateManager<Cable>;
  private readonly customerStateManager: StateManager<Customer>;

  private readonly logger: Logger;

  constructor(
    private readonly importer: ISPImporter,
    private readonly exporter: OZMapExporter,
  ) {
    this.boxStateManager = StateManagerProvider.getBoxManager();
    this.cableStateManager = StateManagerProvider.getCableManager();
    this.customerStateManager = StateManagerProvider.getCustomerManager();

    this.logger = ObservabilityProvider.logger();
  }

  async run(): Promise<void> {
    this.logger.debug('Starting running controller');

    const sourceData = await this.importer.import();

    await this.handleBoxes(sourceData);
    await this.handleCables(sourceData);
    this.handleCustomers(sourceData);

    this.logger.debug('Finishing running controller');
  }

  async handleBoxes(sourceData: SourceData) {
    this.logger.debug(`Total of boxes to handle: ${sourceData.boxes.length}`);

    await Promise.allSettled(
      sourceData.boxes.map(async (box: Box) => {
        const state = await this.boxStateManager.handleState(box);

        if (state.operation === 'created' || state.operation === 'updated') {
          const sync = await this.exporter.syncBox(box);

          await this.boxStateManager.updateSync(box, sync);
        }
      }),
    );
  }

  async handleCables(sourceData: SourceData) {
    this.logger.debug(`Total of cables to handle: ${sourceData.cables.length}`);

    await Promise.all(
      sourceData.cables.map(async (cable: Cable) => {
        const state = await this.cableStateManager.handleState(cable);

        if (state.operation === 'created' || state.operation === 'updated') {
          const sync = await this.exporter.syncCable(cable);

          await this.cableStateManager.updateSync(cable, sync);
        }
      }),
    );
  }

  handleCustomers(sourceData: SourceData) {
    sourceData.customers.forEach(async (customer: Customer) => {
      const state = await this.customerStateManager.handleState(customer);

      if (state.operation === 'created' || state.operation === 'updated') {
        const sync = await this.exporter.syncCustomer(customer);

        await this.customerStateManager.updateSync(customer, sync);
      }
    });
  }
}
