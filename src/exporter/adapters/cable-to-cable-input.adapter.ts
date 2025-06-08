import Cable from '../../entities/cable.entity';
import { OZMapCableInputData } from '../data/ozmap-cable.data';
import randomId from '../utils/random-id';

export const CableToCableInputAdapter = (cable: Cable): OZMapCableInputData => ({
  externalId: cable.id,
  hierarchyLevel: 1,
  implanted: true,
  name: cable.name,
  poles: cable.path.locations.map((loc) => ({ lat: loc.lat, lng: loc.lng })),
  project: randomId(),
  type: randomId(),
  boxA: cable.connectionA.synchId!,
  boxB: cable.connectionB.synchId!,
});
