import Box from '../../entities/box.entity';
import Manager from '../contracts/manager';
import { State } from '../contracts/state';
import Storage from '../contracts/storage';

export default class BoxManager implements Manager<Box> {
  private boxStorage: Storage<Box>;

  constructor() {}

  async handleState(entity: Box): Promise<State<Box>> {
    const state: State<Box> = {
      value: entity,
      isNew: false,
      hasChanges: false,
    };

    const boxSaved = await this.boxStorage.findById(entity.id);

    if (boxSaved && boxSaved.hasDifference(entity)) {
      this.registerState(entity);

      state.value = boxSaved;
      state.hasChanges = true;
    }

    if (!boxSaved) {
      this.registerState(entity);

      state.isNew = true;
    }

    return state;
  }

  private async registerState(box: Box) {
    await this.boxStorage.save(box);
  }
}
