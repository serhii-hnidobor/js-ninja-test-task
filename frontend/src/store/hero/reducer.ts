import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus, HeroData } from '@common';
import { deleteHero, getHeroById, getHeroes, heroCreate, heroUpdate } from '@store/hero/actions';

type State = {
  dataStatus: DataStatus;
  heroes: HeroData[] | null;
  curHero: HeroData | null;
  error: string | undefined;
  page: number;
  totalNumber: number | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  heroes: null,
  error: undefined,
  curHero: null,
  totalNumber: null,
  page: 1,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getHeroes.fulfilled, (state, { payload }) => {
    const { data, page, totalNumber } = payload.data;

    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;
    state.heroes = data;
    state.totalNumber = totalNumber;
    state.page = page;
  });

  builder.addCase(deleteHero.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;

    const { heroes } = state;

    state.heroes = heroes?.filter(({ id }) => id !== payload.data) || null;
  });

  builder.addCase(getHeroById.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;

    state.curHero = payload.data[0];
  });

  builder.addCase(getHeroById.pending, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;

    state.curHero = null;
  });

  builder.addCase(getHeroes.pending, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.error = undefined;

    state.heroes = null;
  });

  builder.addMatcher(
    isAnyOf(deleteHero.pending, heroUpdate.pending, heroCreate.pending, heroUpdate.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
      state.error = undefined;
    },
  );

  builder.addMatcher(
    isAnyOf(
      getHeroes.rejected,
      deleteHero.rejected,
      getHeroById.rejected,
      heroUpdate.rejected,
      heroCreate.rejected,
      heroUpdate.rejected,
    ),
    (state, { error }) => {
      const { message: errorMessage } = error;
      state.dataStatus = DataStatus.REJECTED;
      state.error = errorMessage;
    },
  );
});

export { reducer };
