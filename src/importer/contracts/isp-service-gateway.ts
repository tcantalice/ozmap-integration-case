import ISPIntegrationData from '../isp-integration-data';

export default interface ISPServiceGateway {
  getData(): ISPIntegrationData;
}
