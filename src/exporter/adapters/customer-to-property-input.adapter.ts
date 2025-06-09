import Customer from '../../entities/customer.entity';
import { OZMapPropertyInputData } from '../data/ozmap-property.data';
import randomId from '../utils/random-id';

export const CustomerToPropertyInputAdapter = (customer: Customer): OZMapPropertyInputData => ({
  address: customer.address,
  project: randomId(),
  box: customer.connectedTo()!.synchId!,
  drop: customer.usedCable()!.synchId!,
  client: {
    code: customer.code,
    externalId: customer.id,
    implanted: true,
    name: customer.name,
  },
});
