import { Box, BoxType, Pole } from '../../entities/box.entity';

export default interface OZMapGateway {
  createBoxResource(box: Box): Promise<Box>;

  createBoxTypeResource(boxType: BoxType): Promise<BoxType>;

  createPoleResource(pole: Pole): Promise<Pole>;
}
