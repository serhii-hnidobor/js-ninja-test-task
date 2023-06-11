import axios from 'axios';
import { ApiPath, HeroData } from '@common';
import { getQueryString } from '@helpers';
import { AllHeroResponseDto } from 'shared/build';

type Constructor = {
  apiPrefix: string;
};

class HeroApi {
  #apiPrefix: string;

  constructor({ apiPrefix }: Constructor) {
    this.#apiPrefix = apiPrefix;
  }

  public getHeroes(page: number) {
    return axios.get<AllHeroResponseDto>(getQueryString(`${this.#apiPrefix}${ApiPath.HERO}`, { page }));
  }

  public removeHero(id: string) {
    return axios.delete<string>(`${this.#apiPrefix}${ApiPath.HERO}${ApiPath.ROOT}${id}`);
  }

  public getById(id: string) {
    return axios.get<HeroData[]>(`${this.#apiPrefix}${ApiPath.HERO}${ApiPath.ROOT}${id}`);
  }

  public create(data: Omit<HeroData, 'created_at' | 'updated_at' | 'id'>) {
    return axios.post<HeroData>(`${this.#apiPrefix}${ApiPath.HERO}`, data);
  }

  public update(data: Partial<HeroData> & { id: string }) {
    const { id, ...restData } = data;

    return axios.put(`${this.#apiPrefix}${ApiPath.HERO}${ApiPath.ROOT}${id}`, restData);
  }
}

export { HeroApi };
