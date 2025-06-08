import Box from '../../entities/box.entity';
import Storage from '../contracts/storage';
import BoxDatabaseStorage from '../storage/box-database.storage';

export default class StateStorageProvider {
  private static __instance: StateStorageProvider;

  private readonly storageInstances: Record<string, Storage<any>>;

  private constructor() {
    this.storageInstances = {
      box: new BoxDatabaseStorage(),
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
}
