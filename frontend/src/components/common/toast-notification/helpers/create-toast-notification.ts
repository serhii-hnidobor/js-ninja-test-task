import { ToastNotification, ToastNotificationParams } from '../toast-notification';
import { toast } from 'react-toastify';

const createToastNotification = (props: ToastNotificationParams) => {
  const { type = 'default', durationMs } = props;

  toast(ToastNotification(props), {
    position: 'bottom-right',
    autoClose: durationMs || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    type: type,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export { createToastNotification };
