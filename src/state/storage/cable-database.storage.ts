import { type PrismaClient, SyncSituation } from '@prisma/client';
import Cable from '../../entities/cable.entity';
import { SyncStatus } from '../../enums/sync-status.enum';
import prisma from '../../infra/prisma';
import Storage from '../contracts/storage';
import StorageState, { SyncStorageState } from '../data/storage-state.data';

export default class CableDatabaseStorage implements Storage<Cable> {
  private client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  async findById(id: number): Promise<StorageState<Cable> | null> {
    const instance = await this.client.cable.findUnique({
      where: { isp_id: BigInt(id) },
    });

    return instance
      ? {
          data: new Cable(Number(instance.isp_id), instance.name, instance.capacity, instance.type),
          sync: instance.sync
            ? {
                syncId: instance.sync.ozmap_id ?? undefined,
                lastAttemptSync: instance.sync.ozmap_last_sync_date ?? undefined,
                lastSyncStatus:
                  instance.sync.ozmap_last_sync_situation === SyncSituation.SUCCESS
                    ? SyncStatus.SUCCESS
                    : SyncStatus.FAIL,
              }
            : undefined,
        }
      : null;
  }

  async saveData(data: Cable): Promise<void> {
    await this.client.cable.upsert({
      create: {
        created_at: new Date(),
        updated_at: new Date(),
        isp_id: data.id,
        boxes: [data.connectionA!.id, data.connectionB!.id],
        name: data.name,
        capacity: data.capacity,
        type: data.type,
        paths: data.path.locations.map((location) => ({
          latitude: location.lat,
          longitude: location.lng,
        })),
      },
      update: {
        paths: data.path.locations.map((location) => ({
          latitude: location.lat,
          longitude: location.lng,
        })),
        boxes: [data.connectionA!.id, data.connectionB!.id],
        capacity: data.capacity,
        name: data.name,
        type: data.type,
        updated_at: new Date(),
      },
      where: {
        isp_id: data.id,
      },
    });
  }

  async saveSync(id: number, sync: SyncStorageState): Promise<void> {
    this.client.cable.update({
      data: {
        sync: {
          ozmap_id: sync.syncId!,
          ozmap_last_sync_date: sync.lastAttemptSync!,
          ozmap_last_sync_situation:
            sync.lastSyncStatus === SyncStatus.SUCCESS ? SyncSituation.SUCCESS : SyncSituation.FAIL,
        },
      },
      where: {
        isp_id: id,
      },
    });
  }
}
