import axios, { type Axios, AxiosResponse, isAxiosError } from 'axios';
import { ClientRequest } from 'node:http';
import BaseError, { ErrorSeverity } from '../../error/base.error';
import ISPServiceGateway from '../contracts/isp-service-gateway';
import { ISPBoxData, ISPCableData, ISPCustomerData, ISPDropCableData } from '../data';

class RequestError extends BaseError {
  constructor(message: string, cause: Error, requestData: object) {
    super(message, { request: requestData }, cause);
    this.name = 'ISPHttpGatewayRequestError';
  }

  get severity(): ErrorSeverity {
    return 'high';
  }
}

class ResponseError extends BaseError {
  constructor(
    message: string,
    cause: Error,
    statusHttp: number,
    responseData: object,
    requestData: object,
  ) {
    super(message, { status: statusHttp, response: responseData, request: requestData }, cause);

    this.name = 'ISPHttpGatewayResponseError';
  }

  get severity(): ErrorSeverity {
    return 'high';
  }
}

class UnknowIntegrationError extends BaseError {
  constructor(message: string, cause: Error) {
    super(message, undefined, cause);
  }

  get severity(): ErrorSeverity {
    return 'high';
  }
}

export default class ISPServiceHttpGateway implements ISPServiceGateway {
  private __httpClient: Axios; // TODO: abstrair uso do Axios

  constructor(url: string) {
    this.__httpClient = axios.create({
      baseURL: url,
      responseType: 'json',
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
        const config = err.config!;

        throw new RequestError('Attempt to request ISP failed', err, {
          headers: config.headers,
          host: config.baseURL,
          path: config.url,
        });
      }
    }

    throw new UnknowIntegrationError('An unknown error occurs during the integration attempt', err);
  }
}
