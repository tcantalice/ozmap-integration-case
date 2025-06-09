import SourceData from '../data/source.data';
import Box from '../entities/box.entity';
import Cable from '../entities/cable.entity';
import Customer from '../entities/customer.entity';
import DropCable from '../entities/drop-cable.entity';
import Location from '../entities/vo/location';
import { Logger } from '../observability/contracts/logger';
import ObservabilityProvider from '../observability/provider';
import ISPServiceGateway from './contracts/isp-service-gateway';
import {
  type ISPBoxData,
  type ISPCableData,
  type ISPCustomerData,
  type ISPDropCableData,
} from './data';

export default class ISPImporter {
  private readonly logger: Logger;

  constructor(private readonly gateway: ISPServiceGateway) {
    this.logger = ObservabilityProvider.logger();
  }

  async import(): Promise<SourceData> {
    const data = await this.fetchData();

    this.logger.debug('Imported data', {
      boxes: data.boxes.length,
      cables: data.cables.length,
      dropCables: data.dropCables.length,
      customers: data.customers.length,
    });

    const boxes = this.convertISPFormatToBoxes(data.boxes),
      cables = this.convertISPFormatToCables(data.cables, boxes),
      dropCables = this.convertISPFormatToDropCables(data.dropCables, boxes),
      customers = this.convertISPFormatToCustomers(data.customers, dropCables);

    return { boxes, cables, dropCables, customers };
  }

  private async fetchData(): Promise<{
    boxes: ISPBoxData[];
    cables: ISPCableData[];
    dropCables: ISPDropCableData[];
    customers: ISPCustomerData[];
  }> {
    // TODO: Refatorar implementação para garantir segurança na importação
    return Promise.all([
      this.gateway.getBoxes(),
      this.gateway.getCustomers(),
      this.gateway.getCables(),
      this.gateway.getDropCables(),
    ]).then((data) => ({
      boxes: data[0],
      customers: data[1],
      cables: data[2],
      dropCables: data[3],
    }));
  }

  private convertISPFormatToBoxes(data: ISPBoxData[]): Box[] {
    return data.map(
      (box: ISPBoxData) =>
        new Box(Number(box.id), box.name, box.type, new Location(box.lat, box.lng)),
    );
  }

  private convertISPFormatToCables(data: ISPCableData[], boxes: Box[]): Cable[] {
    return data.map((data: ISPCableData) => {
      const [connectionA, connectionB] = boxes.filter((box: Box) =>
        data.boxes_connected.includes(box.id),
      );

      const cable = new Cable(Number(data.id), data.name, Number(data.capacity), data.type);

      cable.connectA(connectionA);
      cable.connectB(connectionB);

      return cable;
    });
  }

  private convertISPFormatToDropCables(data: ISPDropCableData[], boxes: Box[]): DropCable[] {
    return data.map(
      (cable: ISPDropCableData) =>
        new DropCable(Number(cable.id), cable.name, boxes.find((box) => box.id === cable.box_id)!),
    );
  }

  private convertISPFormatToCustomers(
    data: ISPCustomerData[],
    dropCables: DropCable[],
  ): Customer[] {
    return data.map((customer: ISPCustomerData) => {
      const converted = new Customer(
          Number(customer.id),
          customer.code,
          customer.name,
          customer.address,
        ),
        dropCable = dropCables.find((cable) => cable.box.id === customer.box_id)!;

      converted.connectedBy(dropCable);

      return converted;
    });
  }
}
