import { Sync } from '../data/sync.data';
import Box from '../entities/box.entity';
import Cable from '../entities/cable.entity';
import Customer from '../entities/customer.entity';
import { Logger } from '../observability/contracts/logger';
import ObservabilityProvider from '../observability/provider';
import { BoxToBoxInputAdapter } from './adapters/box-to-box-input.adapter';
import { CableToCableInputAdapter } from './adapters/cable-to-cable-input.adapter';
import { CustomerToPropertyInputAdapter } from './adapters/customer-to-property-input.adapter';
import OZMapGateway from './contracts/ozmap-gateway';

export default class OZMapExporter {
  private readonly logger: Logger;

  constructor(private gateway: OZMapGateway) {
    this.logger = ObservabilityProvider.logger();
  }

  async syncCustomer(customer: Customer): Promise<Sync> {
    let result: Sync = { synchronized: false };

    try {
      const {
        client: { id: syncId },
      } = await this.gateway.createProperty(CustomerToPropertyInputAdapter(customer));

      result.syncId = syncId;
    } catch (err) {
      this.logger.warning(`The resource Customer<${customer.id}> has not been synchronized`, {
        customer: customer.id,
        cause: err,
      });
    }

    return result;
  }

  async syncBox(box: Box): Promise<Sync> {
    let result: Sync = { synchronized: false };

    try {
      const { id: syncId } = await this.gateway.createBoxResource(BoxToBoxInputAdapter(box));

      result.syncId = syncId;
    } catch (err) {
      this.logger.warning(`The resource Box<${box.id}> has not been synchronized`, {
        box: box.id,
        cause: err,
      });
    }

    return result;
  }

  async syncCable(cable: Cable): Promise<Sync> {
    let result: Sync = { synchronized: false };

    try {
      const { id: syncId } = await this.gateway.createCable(CableToCableInputAdapter(cable));

      result.syncId = syncId;
    } catch (err) {
      this.logger.warning(`The resource Cable<${cable.id}> has not been synchronized`, {
        cable: cable.id,
        cause: err,
      });
    }

    return result;
  }
}
