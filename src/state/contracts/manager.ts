import { State } from './state';

export default interface Manager<Entity> {
  handleState(entity: Entity): Promise<State<Entity>>;
}
