export default interface ISPServiceGateway<RawDataFormat extends Object> {
  getData(): RawDataFormat;
}
