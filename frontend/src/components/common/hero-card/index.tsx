import { AppRoutes, HeroData, IconName } from '@common';
import { HTMLAttributes } from 'react';
import { cx } from 'class-variance-authority';
import { Icon, Typography } from '@components/common';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  nickname: HeroData['nickname'];
  Images: HeroData['Images'];
  id: string;
} & HTMLAttributes<HTMLDivElement> & {
    handleDelete: (id: string) => void;
  };

export default function ({ id, Images, nickname, handleDelete, className, ...containerHtmlProps }: Props) {
  const navigate = useNavigate();

  return (
    <div className={cx(className, 'w-[250px] rounded-[10px] bg-white p-[19px]')} {...containerHtmlProps}>
      <div className={'mb-[23px] flex items-center justify-between'}>
        {Images && <img src={Images[0]} alt={'hero image'} />}
      </div>
      <div className={'flex flex-col gap-[20px] justify-between'}>
        <div className={'flex justify-end gap-[15px] mb-[10px]'}>
          <Icon
            name={IconName.EDIT}
            onClick={() => {
              navigate(`${AppRoutes.EDIT_HERO_PATH}/${id}`);
            }}
            width={25}
            height={25}
            stroke={'blue'}
            className={'cursor-pointer'}
          />
          <Icon
            name={IconName.TRASH}
            stroke={'blue'}
            hoverStroke={'red'}
            width={25}
            onClick={() => handleDelete(id)}
            height={25}
            className={'cursor-pointer'}
          />
        </div>
        <div className={'mb-[12px] flex flex-col gap-[20px]'}>
          <div>
            <Link to={`${AppRoutes.HERO_PATH}/${id}`} className={'text-blue'}>
              <Typography as={'h2'} styleName={'body2Bold'} className={'cursor-pointer'}>
                {`${nickname}`}
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
