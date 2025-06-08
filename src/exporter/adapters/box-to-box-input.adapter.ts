import Box from '../../entities/box.entity';
import { OZMapBoxInputData } from '../data/ozmap-box.data';
import randomId from '../utils/random-id';

export const BoxToBoxInputAdapter = (box: Box): OZMapBoxInputData => ({
  hierarchyLevel: 1,
  implanted: true,
  latitude: box.loc.lat,
  longitude: box.loc.lng,
  name: box.name,
  project: randomId(),
  type: randomId(),
});
