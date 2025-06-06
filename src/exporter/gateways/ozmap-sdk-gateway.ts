import OZMapSDK from '@ozmap/ozmap-sdk';
import { Box, BoxType, Pole } from '../../entities/box.entity';
import OZMapGateway from '../contracts/ozmap-gateway';

export default class OZMapSDKGateway implements OZMapGateway {
  private readonly sdk: OZMapSDK;

  constructor(url: string, apiKey: string) {
    this.sdk = new OZMapSDK(url, {
      apiKey,
    });
  }

  async createBoxResource(box: Box): Promise<Box> {}

  async createBoxTypeResource(boxType: BoxType): Promise<BoxType> {}

  async createPoleResource(pole: Pole): Promise<Pole> {}
}
