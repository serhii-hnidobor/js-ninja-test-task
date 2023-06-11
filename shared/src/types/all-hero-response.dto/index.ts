import { Hero } from '@/types/data';

interface AllHeroResponseDto {
  data: Hero[];
  page: number;
  totalNumber: number;
}

export { AllHeroResponseDto };
