import { Axios, AxiosResponse, isAxiosError } from 'axios';
import { ClientRequest } from 'node:http';
import ISPServiceGateway from '../contracts/isp-service-gateway';
import {
  ISPBoxData,
  ISPCableData,
  ISPCustomerData,
  ISPDropCableData,
} from '../isp-integration-data';

class RequestError extends Error {
  constructor(
    message: string,
    cause: Error,
    private requestData: object,
  ) {
    super(message, { cause });
  }

  getContext(): object {
    return { request: this.requestData };
  }
}

class ResponseError extends Error {
  constructor(
    message: string,
    cause: Error,
    private statusHttp: number,
    private responseData: object,
    private requestData: object,
  ) {
    super(message, { cause });
  }

  getContext(): object {
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

export default class ISPServiceHttpGateway implements ISPServiceGateway {
  private __httpClient: Axios; // TODO: abstrair uso do Axios

  constructor(url: string) {
    this.__httpClient = new Axios({
      baseURL: url,
    });
  }

  getBoxes(): Promise<ISPBoxData[]> {
    return this.makeHttpRequest<ISPBoxData[]>('/boxes');
  }

  getCables(): Promise<ISPCableData[]> {
    return this.makeHttpRequest<ISPCableData[]>('/cables');
  }

  getDropCables(): Promise<ISPDropCableData[]> {
    return this.makeHttpRequest<ISPDropCableData[]>('/drop_cables');
  }

  getCustomers(): Promise<ISPCustomerData[]> {
    return this.makeHttpRequest<ISPCustomerData[]>('/customers');
  }

  private async makeHttpRequest<ResponseData>(path: string): Promise<ResponseData> {
    return this.__httpClient
      .get<ResponseData>(path)
      .then((response: AxiosResponse<ResponseData>) => response.data)
      .catch((err: any) => this.handleError(err));
  }

  private handleError(err: any): never {
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
