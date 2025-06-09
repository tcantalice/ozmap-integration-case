import { SyncSituation } from '@prisma/client';
import { isSuccess, SyncStatus } from '../../../enums/sync-status.enum';

export const syncStatusToDatabase = (status: SyncStatus) =>
  isSuccess(status) ? SyncSituation.SUCCESS : SyncSituation.FAIL;
