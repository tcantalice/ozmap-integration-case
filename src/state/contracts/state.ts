export interface State<Entity> {
  hasChanges: boolean;
  isNew: boolean;
  value: Entity;
}
