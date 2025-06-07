import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';
import { OZMapCableInputData, OZMapCableOutputData } from '../data/ozmap-cable.data';
import { OZMapPropertyInputData, OZMapPropertyOutputData } from '../data/ozmap-property.data';

export default interface OZMapGateway {
  createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData>;

  createProperty(data: OZMapPropertyInputData): Promise<OZMapPropertyOutputData>;

  createCable(data: OZMapCableInputData): Promise<OZMapCableOutputData>;
}
