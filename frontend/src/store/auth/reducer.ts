import { createReducer } from '@reduxjs/toolkit';
import { sessionChange, signOut } from './actions';
import { Session } from '@supabase/supabase-js';

interface InitState {
  session: null | Session;
}

const initialState: InitState = {
  session: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(sessionChange, (state, { payload }) => {
    state.session = payload.session;
  });

  builder.addCase(signOut, (state, { payload }) => {
    state.session = payload.session;
  });
});

export { reducer };
