export interface OZMapPropertyInput {
  address: string;
  box?: string;
  drop?: string;
  client: {
    code: string;
    name: string;
  };
}

export interface OZMapPropertyOutput {
  id: string;
  client: string;
}
