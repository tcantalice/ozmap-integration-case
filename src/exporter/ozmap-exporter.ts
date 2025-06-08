import Box from '../entities/box.entity';
import Cable from '../entities/cable.entity';
import Customer from '../entities/customer.entity';
import DropCable from '../entities/drop-cable.entity';
import { BoxToBoxInputAdapter } from './adapters/box-to-box-input.adapter';
import { CableToCableInputAdapter } from './adapters/cable-to-cable-input.adapter';
import { CustomerToPropertyInputAdapter } from './adapters/customer-to-property-input.adapter';
import { DropCableToCableInputAdapter } from './adapters/drop-cable-to-cable-input.adapter';
import OZMapGateway from './contracts/ozmap-gateway';

export default class OZMapExporter {
  constructor(private gateway: OZMapGateway) {}

  async synchCustomer(customer: Customer): Promise<Customer> {
    const result = await this.gateway.createProperty(CustomerToPropertyInputAdapter(customer));

    customer.synchronize(result.client.id);

    return customer;
  }

  async synchBox(box: Box): Promise<Box> {
    const result = await this.gateway.createBoxResource(BoxToBoxInputAdapter(box));

    box.synchronize(result.id);

    return box;
  }

  async synchDropCable(cable: DropCable): Promise<DropCable> {
    const result = await this.gateway.createCable(DropCableToCableInputAdapter(cable));

    cable.synchronize(result.id);

    return cable;
  }

  async synchCable(cable: Cable): Promise<Cable> {
    const result = await this.gateway.createCable(CableToCableInputAdapter(cable));

    cable.synchronize(result.id);

    return cable;
  }
}
