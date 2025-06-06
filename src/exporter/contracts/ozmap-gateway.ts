import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';

export default interface OZMapGateway {
  createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData>;
}
