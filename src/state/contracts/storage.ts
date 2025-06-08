export default interface Storage<Entity> {
  save(entity: Entity): Promise<void>;

  findById(id: number): Promise<Entity | null>;
}
