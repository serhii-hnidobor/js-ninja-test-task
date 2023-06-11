import { Database } from 'shared/build';

type Hero = Database['public']['Tables']['Hero']['Row'];
type HeroInsertDataType = Database['public']['Tables']['Hero']['Insert'];
type HeroUpdateDataType = Database['public']['Tables']['Hero']['Update'];

type ModelInsertTypes = Omit<HeroInsertDataType, 'id' | 'updated_at' | 'created_at'>;
type ModelUpdateTypes = Omit<HeroUpdateDataType, 'id' | 'updated_at' | 'created_at'>;

export { ModelInsertTypes, ModelUpdateTypes, HeroUpdateDataType, HeroInsertDataType, Hero };
