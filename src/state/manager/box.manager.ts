import { State } from '../../data/state.data';
import { Sync } from '../../data/sync.data';
import Box from '../../entities/box.entity';
import { SyncStatus } from '../../enums/sync-status.enum';
import Manager from '../contracts/manager';
import Storage from '../contracts/storage';
import StorageState from '../data/storage-state.data';

export default class BoxManager implements Manager<Box> {
  constructor(private boxStorage: Storage<Box>) {}

  async handleState(entity: Box): Promise<State<Box>> {
    const result: State<Box> = {
      data: entity,
      operation: 'ignored',
    };

    const savedState: StorageState<Box> | null = await this.boxStorage.findById(entity.id);

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

  async updateSync(entity: Box, sync: Sync): Promise<void> {
    await this.boxStorage.saveSync(entity.id, {
      lastAttemptSync: new Date(),
      lastSyncStatus: sync.synchronized ? SyncStatus.SUCCESS : SyncStatus.FAIL,
      syncId: sync.syncId,
    });
  }

  private async registerState(box: Box) {
    await this.boxStorage.saveData(box);
  }
}
