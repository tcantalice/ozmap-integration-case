import { State } from '../../data/state.data';
import { Sync } from '../../data/sync.data';
import DropCable from '../../entities/drop-cable.entity';
import { SyncStatus } from '../../enums/sync-status.enum';
import Manager from '../contracts/manager';
import Storage from '../contracts/storage';
import StorageState from '../data/storage-state.data';

export default class DropCableManager implements Manager<DropCable> {
  constructor(private dropCableStorage: Storage<DropCable>) {}

  async handleState(entity: DropCable): Promise<State<DropCable>> {
    const result: State<DropCable> = {
      data: entity,
      operation: 'ignored',
    };

    const savedState: StorageState<DropCable> | null = await this.dropCableStorage.findById(
      entity.id,
    );

    if (savedState) {
      result.data = savedState.data;
      result.sync = savedState.sync
        ? {
            lastAttemptSync: savedState.sync.lastAttemptSync,
            lastSyncStatus: savedState.sync.lastSyncStatus,
            syncId: savedState.sync.syncId,
          }
        : result.sync;
    } else {
      this.registerState(entity);

      result.operation = 'created';
    }

    return result;
  }

  async updateSync(entity: DropCable, sync: Sync): Promise<void> {
    await this.dropCableStorage.saveSync(entity.id, {
      lastAttemptSync: new Date(),
      lastSyncStatus: sync.synchronized ? SyncStatus.SUCCESS : SyncStatus.FAIL,
      syncId: sync.syncId,
    });
  }

  private async registerState(dropCable: DropCable) {
    await this.dropCableStorage.saveData(dropCable);
  }
}
