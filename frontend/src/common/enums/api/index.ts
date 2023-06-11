import { ApiPath } from 'shared/build';

enum DataStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export { ApiPath, DataStatus };
