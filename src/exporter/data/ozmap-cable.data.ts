export interface OZMapCableInputData {
  project: string;
  name: string;
  type: string;
  boxA?: string;
  boxB?: string;
  poles: {
    lat: number;
    lng: number;
  }[];
  externalId: any;
  hierarchyLevel: number;
  implanted: boolean;
}

export interface OZMapCableOutputData {
  id: string;
}
