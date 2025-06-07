export interface OZMapPropertyInputData {
  address: string;
  box?: string;
  drop?: string;
  client: {
    code: string;
    name: string;
  };
}

export interface OZMapPropertyOutputData {
  id: string;
  client: string;
}
