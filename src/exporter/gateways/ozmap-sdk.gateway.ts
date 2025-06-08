import OZMapSDK, { Box as OZBox, Cable as OZCable, Property as OZProperty } from '@ozmap/ozmap-sdk';
import OZMapGateway from '../contracts/ozmap-gateway';
import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';
import { OZMapCableInputData, OZMapCableOutputData } from '../data/ozmap-cable.data';
import { OZMapPropertyInputData, OZMapPropertyOutputData } from '../data/ozmap-property.data';

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

  async createCable(data: OZMapCableInputData): Promise<OZMapCableOutputData> {
    const createdCable: OZCable = await this.sdk.cable.create({
      cableType: data.type,
      project: data.project,
      implanted: data.implanted,
      hierarchyLevel: data.hierarchyLevel,
      poles: data.poles,
      boxA: data.boxA,
      boxB: data.boxB,
      name: data.name,
    });

    return { id: createdCable.id as string };
  }

  async createProperty(data: OZMapPropertyInputData): Promise<OZMapPropertyOutputData> {
    const createdProperty: OZProperty = await this.sdk.property.create({
      project: data.project,
      address: data.address,
      box: data.box,
      client: {
        code: data.client.code,
        name: data.client.name,
        external_id: data.client.externalId,
        implanted: data.client.implanted,
      },
    });

    return {
      id: createdProperty.id as string,
      client: {
        id: createdProperty.client.id as string,
        code: data.client.code,
      },
    };
  }
}
