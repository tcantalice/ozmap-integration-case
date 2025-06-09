import OZMapSDK, { Box as OZBox, Cable as OZCable, Property as OZProperty } from '@ozmap/ozmap-sdk';
import { isAxiosError } from 'axios';
import { ClientRequest } from 'http';
import OZMapGateway from '../contracts/ozmap-gateway';
import { OZMapBoxInputData, OZMapBoxOutputData } from '../data/ozmap-box.data';
import { OZMapCableInputData, OZMapCableOutputData } from '../data/ozmap-cable.data';
import { OZMapPropertyInputData, OZMapPropertyOutputData } from '../data/ozmap-property.data';

class RequestError extends Error {
  constructor(
    message: string,
    cause: Error,
    private data: Record<string, any>,
  ) {
    super(message, { cause });
  }

  getContext(): Record<string, any> {
    return { data: this.data };
  }
}

class ResponseError extends Error {
  constructor(
    message: string,
    cause: Error,
    private statusHttp: number,
    private responseData: Record<string, any>,
    private requestData: Record<string, any>,
  ) {
    super(message, { cause });
  }

  getContext(): Record<string, any> {
    return {
      status: this.statusHttp,
      response: this.responseData,
      request: this.requestData,
    };
  }
}

class UnknowIntegrationError extends Error {
  constructor(message: string, cause: Error) {
    super(message, { cause });
  }
}

export default class OZMapSDKGateway implements OZMapGateway {
  private readonly sdk: OZMapSDK;

  constructor(url: string, apiKey: string) {
    this.sdk = new OZMapSDK(url, {
      apiKey,
    });
  }

  async createBoxResource(data: OZMapBoxInputData): Promise<OZMapBoxOutputData> {
    return this.sdk.box
      .create({
        implanted: data.implanted,
        boxType: data.type,
        name: data.name,
        hierarchyLevel: data.hierarchyLevel,
        coords: [data.latitude, data.longitude],
        project: data.project,
      })
      .then((box: OZBox) => ({ id: box.id as string }))
      .catch((err) => this.handleError(err));
  }

  async createCable(data: OZMapCableInputData): Promise<OZMapCableOutputData> {
    return this.sdk.cable
      .create({
        cableType: data.type,
        project: data.project,
        implanted: data.implanted,
        hierarchyLevel: data.hierarchyLevel,
        poles: data.poles,
        boxA: data.boxA,
        boxB: data.boxB,
        name: data.name,
      })
      .then((cable: OZCable) => ({ id: cable.id as string }))
      .catch((err) => this.handleError(err));
  }

  async createProperty(data: OZMapPropertyInputData): Promise<OZMapPropertyOutputData> {
    return this.sdk.property
      .create({
        project: data.project,
        address: data.address,
        box: data.box,
        client: {
          code: data.client.code,
          name: data.client.name,
          external_id: data.client.externalId,
          implanted: data.client.implanted,
        },
      })
      .then((property: OZProperty) => ({
        id: property.id as string,
        client: {
          id: property.client.id as string,
          code: data.client.code,
        },
      }))
      .catch((err) => this.handleError(err));
  }

  private handleError(err: any): never {
    // Esse tratamento de erro foi feito com base no código construído
    // no SDK, porém não garante um tratamento fiel aos possíveis erros

    if (isAxiosError(err)) {
      if (err.response) {
        const response = err.response;
        const request = err.request as ClientRequest;

        throw new ResponseError(
          'ISP data request not successful',
          err,
          response.status,
          response.data as object,
          { headers: request.getHeaders(), host: request.host, path: request.path },
        );
      } else if (err.request) {
        const request = err.request as ClientRequest;

        throw new RequestError('Attempt to request ISP failed', err, {
          headers: request.getHeaders(),
          host: request.host,
          path: request.path,
        });
      }
    }

    throw new UnknowIntegrationError('An unknown error occurs during the integration attempt', err);
  }
}
