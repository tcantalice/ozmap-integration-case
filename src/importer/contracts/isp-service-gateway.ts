import { ISPBoxData, ISPCableData, ISPCustomerData, ISPDropCableData } from '../data';

export default interface ISPServiceGateway {
  getBoxes(): Promise<ISPBoxData[]>;

  getCustomers(): Promise<ISPCustomerData[]>;

  getDropCables(): Promise<ISPDropCableData[]>;

  getCables(): Promise<ISPCableData[]>;
}
