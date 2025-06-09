import Box from '../entities/box.entity';
import Cable from '../entities/cable.entity';
import Customer from '../entities/customer.entity';
import DropCable from '../entities/drop-cable.entity';

export default interface SourceData {
  boxes: Box[];
  cables: Cable[];
  customers: Customer[];
  dropCables: DropCable[];
}
