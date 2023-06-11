import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@common';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector as default };
