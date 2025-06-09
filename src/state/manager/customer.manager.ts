import { State } from '../../data/state.data';
import { Sync } from '../../data/sync.data';
import Customer from '../../entities/customer.entity';
import { SyncStatus } from '../../enums/sync-status.enum';
import Manager from '../contracts/manager';
import Storage from '../contracts/storage';
import StorageState from '../data/storage-state.data';

export default class CustomerManager implements Manager<Customer> {
  constructor(private customerStorage: Storage<Customer>) {}

  async handleState(entity: Customer): Promise<State<Customer>> {
    const result: State<Customer> = {
      data: entity,
      operation: 'ignored',
    };

    const savedState: StorageState<Customer> | null = await this.customerStorage.findById(
      entity.id,
    );

    if (savedState) {
      if (savedState.data.hasDifference(entity)) {
        this.registerState(entity);

        result.operation = 'updated';
      } else {
        result.data = savedState.data;
        result.sync = savedState.sync
          ? {
              lastAttemptSync: savedState.sync.lastAttemptSync,
              lastSyncStatus: savedState.sync.lastSyncStatus,
              syncId: savedState.sync.syncId,
            }
          : result.sync;
      }
    } else {
      this.registerState(entity);

      result.operation = 'created';
    }

    return result;
  }

  async updateSync(entity: Customer, sync: Sync): Promise<void> {
    await this.customerStorage.saveSync(entity.id, {
      lastAttemptSync: new Date(),
      lastSyncStatus: sync.synchronized ? SyncStatus.SUCCESS : SyncStatus.FAIL,
      syncId: sync.syncId,
    });
  }

  private async registerState(customer: Customer) {
    await this.customerStorage.saveData(customer);
  }
}
