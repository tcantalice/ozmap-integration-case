import { type PrismaClient, SyncSituation } from '@prisma/client';
import Box from '../../entities/box.entity';
import Location from '../../entities/vo/location';
import { SyncStatus } from '../../enums/sync-status.enum';
import prisma from '../../infra/prisma';
import Storage from '../contracts/storage';
import StorageState, { SyncStorageState } from '../data/storage-state.data';

export default class BoxDatabaseStorage implements Storage<Box> {
  private client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  async findById(id: number): Promise<StorageState<Box> | null> {
    const instance = await this.client.box.findUnique({
      where: { isp_id: BigInt(id) },
    });

    return instance
      ? {
          data: new Box(
            Number(instance.isp_id),
            instance.name,
            instance.type,
            new Location(instance.location.latitude, instance.location.longitude),
          ),
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

  async saveData(data: Box): Promise<void> {
    await this.client.box.upsert({
      create: {
        created_at: new Date(),
        updated_at: new Date(),
        isp_id: data.id,
        location: {
          latitude: data.loc.lat,
          longitude: data.loc.lng,
        },
        name: data.name,
        type: data.type,
      },
      update: {
        location: {
          latitude: data.loc.lat,
          longitude: data.loc.lng,
        },
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
    this.client.box.update({
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
