import { extraArgument } from '@store';
import { AppDispatch } from '@common/types/app/app-dispatch';
import { RootState } from '@common/types/app/root-state';

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};

export { type AsyncThunkConfig };
