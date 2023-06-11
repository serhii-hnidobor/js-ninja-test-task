import { useDispatch } from 'react-redux';

import { AppDispatch } from '@common';

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch as default };
