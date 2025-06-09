import { type PrismaClient, SyncSituation } from '@prisma/client';
import Box from '../../entities/box.entity';
import Customer from '../../entities/customer.entity';
import DropCable from '../../entities/drop-cable.entity';
import Location from '../../entities/vo/location';
import { SyncStatus } from '../../enums/sync-status.enum';
import prisma from '../../infra/prisma';
import Storage from '../contracts/storage';
import StorageState, { SyncStorageState } from '../data/storage-state.data';
import databaseToSyncStatus from './utils/database-to-sync-status';

export default class CustomerDatabaseStorage implements Storage<Customer> {
  private client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  async findById(id: number): Promise<StorageState<Customer> | null> {
    const customerModel = await this.client.customer.findUnique({
      where: { isp_id: id },
    });

    if (!customerModel) return null;

    const customer = new Customer(
      Number(customerModel.isp_id),
      customerModel.code,
      customerModel.name,
      customerModel.address,
    );

    const boxModel = await this.client.box.findUnique({ where: { isp_id: customerModel.box } });

    const cableModel = await this.client.dropCable.findFirst({
      where: { customer: customerModel.isp_id, box: boxModel?.isp_id },
    });

    customer.connectedBy(
      new DropCable(
        Number(cableModel!.isp_id),
        cableModel!.name,
        new Box(
          Number(boxModel!.isp_id),
          boxModel!.name,
          boxModel!.type,
          new Location(boxModel!.location.latitude, boxModel!.location.latitude),
        ),
      ),
    );

    return {
      data: customer,
      sync: customerModel.sync
        ? {
            lastSyncStatus: databaseToSyncStatus(customerModel.sync.ozmap_last_sync_situation),
            lastAttemptSync: customerModel.sync.ozmap_last_sync_date ?? undefined,
            syncId: customerModel.sync.ozmap_id ?? undefined,
          }
        : undefined,
    };
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
