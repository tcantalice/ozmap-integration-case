import { type PrismaClient, SyncSituation } from '@prisma/client';
import Customer from '../../entities/customer.entity';
import { SyncStatus } from '../../enums/sync-status.enum';
import prisma from '../../infra/prisma';
import Storage from '../contracts/storage';
import StorageState, { SyncStorageState } from '../data/storage-state.data';

export default class CustomerDatabaseStorage implements Storage<Customer> {
  private client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  async findById(id: number): Promise<StorageState<Customer> | null> {
    const instance = await this.client.customer.findUnique({
      where: { isp_id: id },
    });

    return instance
      ? {
          data: new Customer(
            Number(instance.isp_id),
            instance.code,
            instance.name,
            instance.address,
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

  async saveData(data: Customer): Promise<void> {
    await this.client.customer.upsert({
      create: {
        created_at: new Date(),
        updated_at: new Date(),
        isp_id: data.id,
        address: data.address,
        box: data.connectedTo()!.id,
        name: data.name,
        code: data.code,
      },
      update: {
        address: data.address,
        name: data.name,
        box: data.connectedTo()!.id,
        updated_at: new Date(),
      },
      where: {
        isp_id: data.id,
      },
    });
  }

  async saveSync(id: number, sync: SyncStorageState): Promise<void> {
    await this.client.customer.update({
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
