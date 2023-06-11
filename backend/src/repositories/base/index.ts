import { CollectionName, supabase } from '@config';
import { v4 as uuidV4 } from 'uuid';
import { ModelInsertTypes, ModelUpdateTypes } from '@config/types/models';

class BaseRepository {
  private collectionName: CollectionName;

  constructor(collectionName: CollectionName) {
    this.collectionName = collectionName;
  }

  generateId() {
    return uuidV4();
  }

  async getAll(itemPerPage: number, page: number, columns?: string | undefined) {
    const { count, error: countError } = await supabase.from(this.collectionName).select('count', { count: 'exact' });

    if (countError) {
      throw countError;
    } else if (typeof count !== 'number') {
      throw {
        message: 'cannot get count of all row',
      };
    }

    let rangeEnd = itemPerPage * page;
    if (count < rangeEnd) {
      rangeEnd = count;
    }

    const { data, error } = await supabase
      .from(this.collectionName)
      .select(columns || '*')
      .range(itemPerPage * (page - 1), rangeEnd - 1)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { data, page, totalNumber: count };
  }

  async getById(id: string, columns?: string | undefined) {
    const { data, error } = await supabase
      .from(this.collectionName)
      .select(columns || '*')
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  async create(dataToCreate: ModelInsertTypes) {
    const id = this.generateId();
    const nowDate = new Date().toDateString();

    const { error } = await supabase
      .from(this.collectionName)
      .insert({ id, ...dataToCreate, updated_at: nowDate, created_at: nowDate });

    if (error) {
      throw error;
    }

    return dataToCreate;
  }

  async update(id: string, dataToUpdate: ModelUpdateTypes) {
    const nowDate = new Date().toDateString();
    const { error } = await supabase
      .from(this.collectionName)
      .update({ ...dataToUpdate, updated_at: nowDate })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return dataToUpdate;
  }

  async delete(id: string) {
    const { error } = await supabase.from(this.collectionName).delete().eq('id', id);

    if (error) {
      throw error;
    }

    return id;
  }
}

export default BaseRepository;
