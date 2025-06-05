import { Axios } from 'axios';
import ISPServiceGateway from '../contracts/isp-service-gateway';
import ISPIntegrationData from '../isp-integration-data';

export default class ISPServiceHttpGateway implements ISPServiceGateway {
  private __httpClient: Axios; // TODO: abstrair uso do Axios

  constructor(url: string) {
    this.__httpClient = new Axios({
      baseURL: url,
    });
  }

  getData(): ISPIntegrationData {
    return {
      boxes: [],
      cables: [],
      customers: [],
      drop_cables: [],
    };
  }
}
