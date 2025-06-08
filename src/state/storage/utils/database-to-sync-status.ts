import { SyncSituation } from '@prisma/client';
import { SyncStatus } from '../../../enums/sync-status.enum';

export default (situation: SyncSituation) =>
  situation === SyncSituation.SUCCESS ? SyncStatus.SUCCESS : SyncStatus.FAIL;
