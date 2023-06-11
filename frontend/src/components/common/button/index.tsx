import { buttonVariants } from './cva-variants';
import { typographyVariants, TypographyVariantsType } from '@components/common/typography/cva-variants';
import { ReactNode } from 'react';
import { getButtonTypographyVariant } from './helper/get-button-typography-variant';
import { ButtonHTMLProps, ButtonIntentType, ButtonSizeType, ButtonStateType } from './type/button';
import { cx } from 'class-variance-authority';

interface ButtonProps extends ButtonHTMLProps {
  size?: ButtonSizeType;
  intent?: ButtonIntentType;
  invertedColor?: boolean;
  children: ReactNode;
  ariaLabel: string;
  disabled?: boolean;
  textColor?: NonNullable<TypographyVariantsType['color']>;
  textAlign?: NonNullable<TypographyVariantsType['align']>;
  type?: 'reset' | 'button' | 'submit';
  textTransform?: NonNullable<TypographyVariantsType['textTransform']>;
}

const Button = ({
  className,
  children,
  size,
  intent,
  disabled = false,
  textAlign,
  textTransform,
  ariaLabel,
  ...restButtonProps
}: ButtonProps) => {
  // if it's text button font style must be always body2bold
  if (intent === 'textPrimary' || intent === 'textSecondary') {
    size = 'big';
  }

  let state: ButtonStateType;

  if (disabled) {
    state = 'disabled';
    // disable animation for disabled button
  } else {
    state = 'base';
  }

  const typographyStyleName = getButtonTypographyVariant(size);
  let buttonClassName = buttonVariants({
    size,
    intent,
    state: state,
  });

  buttonClassName = cx([
    typographyVariants({
      align: textAlign,
      textTransform,
      styleName: typographyStyleName,
    }),
    buttonClassName,
  ]);

  if (className && className.length) {
    buttonClassName = cx([buttonClassName, className]);
  }

  return (
    <button {...restButtonProps} className={buttonClassName} disabled={disabled} aria-label={ariaLabel}>
      <span className={'block'}>{children}</span>
    </button>
  );
};

export { Button as default, type ButtonProps };
