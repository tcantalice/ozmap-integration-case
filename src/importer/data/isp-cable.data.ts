export default interface ISPCableData {
  id: number;
  name: string;
  capacity: number;
  boxes_connected: number[];
  type: string;
  path: {
    lat: number;
    lng: number;
  }[];
}
