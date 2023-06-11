import { HeroInsertDataType, HeroUpdateDataType } from '@config/types/models';
import { HeroRepository } from '@repositories';

class HeroService {
  create(heroData: HeroInsertDataType) {
    return HeroRepository.create(heroData);
  }

  getAll(itemPerPage: number, page: number, columns?: string | undefined) {
    return HeroRepository.getAll(itemPerPage, page, columns);
  }

  getById(id: string, columns?: string | undefined) {
    return HeroRepository.getById(id, columns);
  }

  delete(id: string) {
    return HeroRepository.delete(id);
  }

  update(id: string, dataToUpdate: HeroUpdateDataType) {
    return HeroRepository.update(id, dataToUpdate);
  }
}

const heroService = new HeroService();

export { heroService };
