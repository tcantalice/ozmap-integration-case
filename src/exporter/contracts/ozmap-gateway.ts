import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';
import { OZMapPropertyInputData, OZMapPropertyOutputData } from '../data/ozmap-property.data';

export default interface OZMapGateway {
  createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData>;

  createProperty(data: OZMapPropertyInputData): Promise<OZMapPropertyOutputData>;

  createCable(data: any): Promise<any>;
}
