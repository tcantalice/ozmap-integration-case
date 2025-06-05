import {
  ISPBoxData,
  ISPCableData,
  ISPCustomerData,
  ISPDropCableData,
} from '../isp-integration-data';

export default interface ISPServiceGateway {
  getBoxes(): Promise<ISPBoxData[]>;

  getCustomers(): Promise<ISPCustomerData[]>;

  getDropCables(): Promise<ISPDropCableData[]>;

  getCables(): Promise<ISPCableData[]>;
}
