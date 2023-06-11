import { ChangeEvent, useId, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';
import { TextareaAutosizeProps } from 'react-textarea-autosize/dist/declarations/src';

type Props = { onChange: (newValue: string) => void; defaultValue?: string; label: string } & Omit<
  TextareaAutosizeProps,
  'onChange'
>;

export default function ({ className, onChange, label, defaultValue, ...restHtmlProps }: Props) {
  const [value, setValue] = useState(defaultValue || '');

  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) {
      return;
    }

    const { value: newValue } = e.target;

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={clsx('flex flex-col')}>
      <div className={'flex justify-between'}>
        <label className={clsx('mb-[2px] cursor-pointer text-white')} htmlFor={id}>
          <span>{label}</span>
        </label>
      </div>
      <TextareaAutosize
        {...restHtmlProps}
        id={id}
        className={clsx(
          className,
          'focus-visible:border-blue min-h-[150px] p-[15px] shadow-xl focus-visible:border-2 focus-visible:outline-0 !text-black',
        )}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
