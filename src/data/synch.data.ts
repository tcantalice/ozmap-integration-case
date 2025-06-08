export interface Synch<Entity> {
  synchId?: string;
  synchronized: boolean;
  data: Entity;
}
