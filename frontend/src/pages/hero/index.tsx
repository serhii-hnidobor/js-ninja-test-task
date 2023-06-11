import { useAppDispatch, useAppSelector } from '@hooks';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { getHeroById } from '@store/hero/actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { DataStatus } from '@common';
import { createToastNotification, PageLoader, Superpowers, Typography } from '@components/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

export default function () {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useDeepCompareEffect(() => {
    dispatch(getHeroById(id || ''));
  }, [dispatch, id]);

  const heroesData = useAppSelector((state) => {
    return state.hero;
  });

  const { dataStatus, error, curHero } = heroesData;

  useEffect(() => {
    if (error || dataStatus === DataStatus.REJECTED) {
      createToastNotification({ type: 'error', message: error || 'unknown error', title: 'load heroes error' });
    }
  }, [error, dataStatus]);

  if (dataStatus === DataStatus.PENDING) {
    return <PageLoader />;
  }

  if (!curHero) {
    return null;
  }

  const { Images, nickname, catch_phrase, superpowers, origin_description, real_name } = curHero;

  return (
    <div className={'flex justify-center'}>
      <div className={'max-w-[900px] p-5'}>
        <div className={'flex justify-center mb-[20px]'}>
          {Images && (
            <Swiper
              pagination={{
                type: 'progressbar',
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mx-auto"
            >
              {Images.map((src, index) => {
                return (
                  <SwiperSlide key={`${src}-${index}`}>
                    <img src={src} alt={'hero image'} className={'w-full h-full object-cover'} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
        <div className={'text-white flex flex-col items-center '}>
          <div className={'flex flex-col gap-[30px] w-[500px]'}>
            <div className={'flex flex-col gap-[5px]'}>
              <Typography as={'h1'} styleName={'body1Bold'} align={'center'}>{`${nickname} (${real_name})`}</Typography>
              <Typography as={'h2'} styleName={'body2Bold'} align={'center'}>
                {catch_phrase}
              </Typography>
            </div>
            <div className={'flex flex-col gap-[5px]'}>
              <Typography as={'h3'} styleName={'body1Bold'} align={'center'}>
                description:
              </Typography>
              <Typography as={'span'} styleName={'body3Regular'}>
                {origin_description}
              </Typography>
            </div>
            <div className={'flex flex-col gap-[5px]'}>
              <Typography as={'h3'} styleName={'body1Bold'} align={'center'}>
                superpowers:
              </Typography>
              <div className={'flex gap-[15px] flex-wrap'}>
                {superpowers?.map((superpower, index) => (
                  <Superpowers key={`${id}-${superpower}-${index}`}>{superpower}</Superpowers>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
