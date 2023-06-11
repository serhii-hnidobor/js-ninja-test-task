import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, HeroData } from '@common';
import { ActionType } from './common';
import { AxiosResponse } from 'axios';
import { AllHeroResponseDto } from 'shared/build';

const getHeroes = createAsyncThunk<AxiosResponse<AllHeroResponseDto>, number, AsyncThunkConfig>(
  ActionType.GET_HEROES,
  async (page, { extra }) => {
    const { heroApi } = extra;

    return heroApi.getHeroes(page);
  },
);

const getHeroById = createAsyncThunk<AxiosResponse<HeroData[]>, string, AsyncThunkConfig>(
  ActionType.GET_HERO,
  async (id, { extra }) => {
    const { heroApi } = extra;

    return heroApi.getById(id);
  },
);

const deleteHero = createAsyncThunk<AxiosResponse<string>, string, AsyncThunkConfig>(
  ActionType.DELETE,
  async (id, { extra }) => {
    const { heroApi } = extra;

    return heroApi.removeHero(id);
  },
);

const heroCreate = createAsyncThunk<
  AxiosResponse<HeroData>,
  Omit<HeroData, 'created_at' | 'updated_at' | 'id'>,
  AsyncThunkConfig
>(ActionType.CREATE, async (data, { extra }) => {
  const { heroApi } = extra;

  return heroApi.create(data);
});

const heroUpdate = createAsyncThunk<AxiosResponse<HeroData>, Partial<HeroData> & { id: string }, AsyncThunkConfig>(
  ActionType.UPDATE,
  async (data, { extra }) => {
    const { heroApi } = extra;

    return heroApi.update(data);
  },
);

export { getHeroes, deleteHero, getHeroById, heroUpdate, heroCreate };
