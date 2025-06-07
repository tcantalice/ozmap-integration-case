export interface OZMapPropertyInputData {
  project: string;
  address: string;
  box?: string;
  drop?: string;
  client: {
    externalId: any;
    implanted: boolean;
    code: string;
    name: string;
  };
}

export interface OZMapPropertyOutputData {
  id: string;
  client: {
    id: string;
    code: string;
  };
}
