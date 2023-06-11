import { HeroApi } from './hero-api.service';

const heroApi = new HeroApi({ apiPrefix: import.meta.env.VITE_API_PREFIX });

export { heroApi };
