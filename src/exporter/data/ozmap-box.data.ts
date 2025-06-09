export interface OZMapBoxInputData {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  hierarchyLevel: number;
  project: string;
  implanted: boolean;
}

export interface OZMapBoxOutputData {
  id: string;
}
