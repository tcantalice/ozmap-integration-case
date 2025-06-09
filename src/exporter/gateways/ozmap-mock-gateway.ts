import OZMapGateway from '../contracts/ozmap-gateway';
import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';
import { OZMapCableInputData, OZMapCableOutputData } from '../data/ozmap-cable.data';
import { OZMapPropertyInputData, OZMapPropertyOutputData } from '../data/ozmap-property.data';
import randomId from '../utils/random-id';

export default class OZMapSDKGateway implements OZMapGateway {
  constructor() {}

  async createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData> {
    return { id: randomId() };
  }

  async createCable(data: OZMapCableInputData): Promise<OZMapCableOutputData> {
    return { id: randomId() };
  }

  async createProperty(data: OZMapPropertyInputData): Promise<OZMapPropertyOutputData> {
    return {
      id: randomId(),
      client: {
        id: randomId(),
        code: data.client.code,
      },
    };
  }
}
