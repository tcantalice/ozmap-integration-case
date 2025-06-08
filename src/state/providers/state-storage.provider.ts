import Box from '../../entities/box.entity';
import Cable from '../../entities/cable.entity';
import Customer from '../../entities/customer.entity';
import Storage from '../contracts/storage';
import BoxDatabaseStorage from '../storage/box-database.storage';
import CableDatabaseStorage from '../storage/cable-database.storage';
import CustomerDatabaseStorage from '../storage/customer-database.storage';

export default class StateStorageProvider {
  private static __instance: StateStorageProvider;

  private readonly storageInstances: Record<string, Storage<any>>;

  private constructor() {
    this.storageInstances = {
      box: new BoxDatabaseStorage(),
      customer: new CustomerDatabaseStorage(),
      cable: new CableDatabaseStorage(),
    };
  }

  static init() {
    if (!StateStorageProvider.__instance) {
      StateStorageProvider.__instance = new StateStorageProvider();
    }
  }

  static getBoxStorage(): Storage<Box> {
    return StateStorageProvider.__instance.storageInstances['box'] as Storage<Box>;
  }

  static getCustomerStorage(): Storage<Customer> {
    return StateStorageProvider.__instance.storageInstances['customer'] as Storage<Customer>;
  }

  static getCableStorage(): Storage<Cable> {
    return StateStorageProvider.__instance.storageInstances['cable'] as Storage<Cable>;
  }
}
