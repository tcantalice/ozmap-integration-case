export enum SyncStatus {
  SUCCESS,
  FAIL,
}

export const isSuccess = (status: SyncStatus) => status === SyncStatus.SUCCESS;
