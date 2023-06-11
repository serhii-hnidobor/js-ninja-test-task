import { CircleLoader } from 'react-spinners';
import { cx } from 'class-variance-authority';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isNonOpacityBack?: boolean;
}

export default function ({ isNonOpacityBack }: Props) {
  useEffect(() => {
    document.body.classList.add('disable-scroll');
    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, []);

  return createPortal(
    <div
      className={cx(
        'w-screen h-full overflow-hidden  fixed left-0 top-0 flex justify-center items-center flex-col text-black z-[10000]',
        !isNonOpacityBack && 'backdrop-blur backdrop-brightness-90',
        isNonOpacityBack && '',
        'text-2xl font-serif font-bold',
      )}
    >
      <CircleLoader color="#158FFF" loading size={135} />
    </div>,
    document.body,
  );
}
