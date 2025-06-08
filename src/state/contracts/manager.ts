import { State } from '../../data/state.data';
import { Synch } from '../../data/synch.data';

export default interface Manager<Entity> {
  handleState(entity: Entity): Promise<State<Entity>>;

  updateState(synchData: Synch<Entity>): Promise<State<Entity>>;
}
