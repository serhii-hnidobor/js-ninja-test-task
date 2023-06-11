import { SVGProps } from 'react';
import { IconName } from '@common';
import { iconBoxVariants, IconBoxVariantType, iconVariants, IconVariantsType } from './cva-variants/cva-variants';

import { ReactComponent as CloseIcon } from '@assets/icon/close.svg';
import { ReactComponent as ArrowDown } from '@assets/icon/arrow-down.svg';
import { ReactComponent as ThreeDots } from '@assets/icon/three-dots.svg';
import { ReactComponent as RightArrow } from '@assets/icon/right-arrow.svg';
import { ReactComponent as Trash } from '@assets/icon/trash.svg';
import { ReactComponent as ChevronRight } from '@assets/icon/chevron-right.svg';
import { ReactComponent as Edit } from '@assets/icon/edit.svg';

import { cx } from 'class-variance-authority';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  intent?: NonNullable<IconBoxVariantType['intent']>;
  fill?: NonNullable<IconVariantsType['fill']>;
  className?: string;
  hoverStroke?: NonNullable<IconVariantsType['hoverStroke']>;
  hoverFill?: NonNullable<IconVariantsType['hoverFill']>;
  stroke?: NonNullable<IconVariantsType['stroke']>;
  strokeWidth?: NonNullable<IconVariantsType['strokeWidth']>;
}

const Icon = ({
  width = '20',
  height = '20',
  intent,
  fill,
  name,
  className,
  stroke,
  strokeWidth,
  hoverStroke,
  hoverFill,
  ...restSvgProps
}: IconProps) => {
  let iconClassName = iconVariants({
    fill,
    stroke,
    intent,
    strokeWidth,
    hoverStroke,
    hoverFill,
  });

  if (className && className.length) {
    iconClassName = cx([className, iconClassName]);
  }

  const iconBoxClassName = iconBoxVariants({ intent });

  switch (name) {
    case IconName.CLOSE: {
      return (
        <span className={iconBoxClassName}>
          <CloseIcon {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }
    case IconName.THREE_DOTS: {
      return (
        <span className={iconBoxClassName}>
          <ThreeDots {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }
    case IconName.ARROW_DOWN: {
      return (
        <span className={iconBoxClassName}>
          <ArrowDown {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }

    case IconName.RIGHT_ARROW: {
      return (
        <span className={iconBoxClassName}>
          <RightArrow {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }
    case IconName.LEFT_ARROW: {
      return (
        <span className={iconBoxClassName}>
          <RightArrow {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }

    case IconName.TRASH: {
      return (
        <span className={iconBoxClassName}>
          <Trash {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }

    case IconName.CHEVRON_RIGHT: {
      return (
        <span className={iconBoxClassName}>
          <ChevronRight {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }

    case IconName.EDIT: {
      return (
        <span className={iconBoxClassName}>
          <Edit {...restSvgProps} width={width} height={height} className={iconClassName} />
        </span>
      );
    }

    default: {
      const check: never = name;
      throw new Error(check);
    }
  }
};

export { Icon, type IconProps };
