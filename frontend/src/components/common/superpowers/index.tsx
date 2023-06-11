import { HTMLAttributes } from 'react';
import { cx } from 'class-variance-authority';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: string;
}

export default function ({ children, className, ...restContainerProps }: Props) {
  const baseClassName =
    'mb-[4px] ml-0 mr-[2px] mt-0 inline-block rounded-[1px] bg-[#f5f8fb] p-[3px] px-[7px] pb-[4px] text-[#0969da] transition-all  hover:bg-[#eaf1f7]';

  return (
    <div className={cx(baseClassName, className)} {...restContainerProps}>
      {children}
    </div>
  );
}
