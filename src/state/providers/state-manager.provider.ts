import Box from '../../entities/box.entity';
import Cable from '../../entities/cable.entity';
import Manager from '../contracts/manager';
import BoxManager from '../manager/box.manager';
import CableManager from '../manager/cable.manager';
import CustomerManager from '../manager/customer.manager';
import StorageProvider from './state-storage.provider';

export default abstract class StateManagerProvider {
  static getBoxManager(): Manager<Box> {
    return new BoxManager(StorageProvider.getBoxStorage());
  }

  static getCableManager(): Manager<Cable> {
    return new CableManager(StorageProvider.getCableStorage());
  }

  static getCustomerManager(): Manager<Customer> {
    return new CustomerManager(StorageProvider.getCustomerStorage());
  }
}
