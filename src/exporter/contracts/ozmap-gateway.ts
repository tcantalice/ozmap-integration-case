import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';
import { OZMapPropertyInput, OZMapPropertyOutput } from '../data/ozmap-property.data';

export default interface OZMapGateway {
  createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData>;

  createProperty(data: OZMapPropertyInput): Promise<OZMapPropertyOutput>;
}
