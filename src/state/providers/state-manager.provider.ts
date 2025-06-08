import Box from '../../entities/box.entity';
import Manager from '../contracts/manager';
import BoxManager from '../manager/box.manager';
import StorageProvider from './state-storage.provider';

export default abstract class StateManagerProvider {
  static getBoxManager(): Manager<Box> {
    return new BoxManager(StorageProvider.getBoxStorage());
  }
}
