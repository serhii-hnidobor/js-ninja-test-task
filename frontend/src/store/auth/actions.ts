import { createAction } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { Session } from '@supabase/supabase-js';

const sessionChange = createAction(ActionType.SESSION_CHANGE, (newSession: Session | null) => {
  return {
    payload: {
      session: newSession,
    },
  };
});

const signOut = createAction(ActionType.SIGN_OUT, () => {
  return {
    payload: {
      session: null,
    },
  };
});

export { sessionChange, signOut };
