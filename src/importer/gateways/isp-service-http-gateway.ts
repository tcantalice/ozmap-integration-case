import { Axios } from 'axios';
import ISPServiceGateway from '../contracts/isp-service-gateway';
import ISPIntegrationData from '../isp-integration-data';

class RequestError {
  constructor(private previous: Error) {}
}

class ResponseError {
  constructor(private previous: Error) {}
}

class ConnectionError {
  constructor(private previous: Error) {}
}

export default class ISPServiceHttpGateway implements ISPServiceGateway {
  private __httpClient: Axios; // TODO: abstrair uso do Axios

  constructor(url: string) {
    this.__httpClient = new Axios({
      baseURL: url,
    });
  }

  async getData(): Promise<ISPIntegrationData> {
    let data: ISPIntegrationData;

    try {
      data = await this.requestData();
    } catch (err) {
      throw err;
    }

    return data;
  }

  private async requestData(): Promise<ISPIntegrationData> {
    const response = await this.__httpClient.get<ISPIntegrationData>('/');

    return response.data;
  }
}
