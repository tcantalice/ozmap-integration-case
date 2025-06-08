import { State } from '../../data/state.data';
import { Sync } from '../../data/sync.data';

export default interface Manager<Entity> {
  handleState(entity: Entity): Promise<State<Entity>>;

  updateSync(entity: Entity, syncData: Sync): Promise<void>;
}
