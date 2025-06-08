import Cable from '../../entities/cable.entity';
import Manager from '../contracts/manager';
import { State } from '../contracts/state';
import Storage from '../contracts/storage';

export default class CableManager implements Manager<Cable> {
  constructor(private cableStorage: Storage<Cable>) {}

  async handleState(entity: Cable): Promise<State<Cable>> {
    const state: State<Cable> = {
      value: entity,
      hasChanges: false,
      isNew: false,
    };

    const cableState = await this.cableStorage.findById(entity.id);

    if (cableState) {
      if (cableState.hasDifference(entity)) {
        this.cableStorage.save(entity);

        state.hasChanges = true;
      } else {
        state.value = cableState;
      }
    }

    if (!cableState) {
      this.cableStorage.save(entity);

      state.isNew = true;
    }

    return state;
  }
}
