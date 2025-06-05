export interface ISPCableData {
  id: number;
  name: string;
  capacity: number;
  boxes_connected: number[];
  path: {
    lat: number;
    lng: number;
  }[];
}

export interface ISPDropCableData {
  id: number;
  name: string;
  box_id: number;
  customed_id: 1;
}

export interface ISPBoxData {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
}

export interface ISPCustomerData {
  id: number;
  code: string;
  name: string;
  address: string;
  box_id: number;
}

export default interface ISPIntegrationData {
  cables: ISPCableData[];
  drop_cables: ISPDropCableData[];
  boxes: ISPBoxData[];
  customers: ISPCustomerData[];
}
