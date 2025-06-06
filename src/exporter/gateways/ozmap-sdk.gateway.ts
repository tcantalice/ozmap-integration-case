import OZMapSDK, { Box as OZBox } from '@ozmap/ozmap-sdk';
import OZMapGateway from '../contracts/ozmap-gateway';
import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';

export default class OZMapSDKGateway implements OZMapGateway {
  private readonly sdk: OZMapSDK;

  constructor(url: string, apiKey: string) {
    this.sdk = new OZMapSDK(url, {
      apiKey,
    });
  }

  async createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData> {
    const createdBox: OZBox = await this.sdk.box.create({
      implanted: data.implanted,
      boxType: data.type,
      name: data.name,
      hierarchyLevel: data.hierarchyLevel,
      coords: [data.latitude, data.longitude],
      project: data.project,
    });

    return { id: createdBox.id as string };
  }
}
