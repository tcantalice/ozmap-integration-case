import { SyncSituation } from '@prisma/client';
import { isSuccess, SyncStatus } from '../../../enums/sync-status.enum';

export default (status: SyncStatus) =>
  isSuccess(status) ? SyncSituation.SUCCESS : SyncSituation.FAIL;
