import BaseRepository from '@repositories/base';
import { CollectionName } from 'shared/build';

const HeroRepository = new BaseRepository(CollectionName.HERO);

export { HeroRepository };
