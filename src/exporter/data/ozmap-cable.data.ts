export interface OZMapCableInputData {
  project: string;
  type: string;
  boxA?: string;
  boxB?: String;
  poles: {
    lat: number;
    lng: number;
  }[];
  externalId: any;
}

export interface OZMapCableOutputData {
  id: string;
}
