import DropCable from '../../entities/drop-cable.entity';
import { OZMapCableInputData } from '../data/ozmap-cable.data';
import randomId from '../utils/random-id';

export const DropCableToCableInputAdapter = (dropCable: DropCable): OZMapCableInputData => ({
  externalId: dropCable.id,
  hierarchyLevel: 2,
  implanted: true,
  name: dropCable.name,
  poles: [],
  project: randomId(),
  type: randomId(),
  boxA: dropCable.box.synchId!,
});
