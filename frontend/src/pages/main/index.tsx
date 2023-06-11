import { AppRoutes, DataStatus } from '@common';
import { Button, createToastNotification, PageLoader } from '@components/common';
import HeroCard from '@components/common/hero-card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks';
import { deleteHero, getHeroes } from '@store/hero/actions';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useEffect, useState } from 'react';
import Pagination from '@components/common/pagination';

export default function () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  useDeepCompareEffect(() => {
    dispatch(getHeroes(page));
  }, [dispatch, page]);

  const heroesData = useAppSelector((state) => {
    return state.hero;
  });

  const { dataStatus, error, heroes, totalNumber } = heroesData;

  useEffect(() => {
    if (error || dataStatus === DataStatus.REJECTED) {
      createToastNotification({ type: 'error', message: error || 'unknow error', title: 'load heroes error' });
    }
  }, [error, dataStatus]);

  if (dataStatus === DataStatus.PENDING) {
    return <PageLoader />;
  }

  const handleDelete = (id: string) => {
    dispatch(deleteHero(id));
  };

  return (
    <>
      <div className={'flex flex-col items-center gap-[25px] mb-[30px]'}>
        <div className={'flex gap-[20px] flex-wrap justify-center'}>
          {heroes?.map((data) => {
            return <HeroCard key={data.id} {...data} handleDelete={handleDelete} />;
          })}
        </div>
        {totalNumber && (
          <div>
            <Pagination current={page} onChange={(newValue) => setPage(newValue)} pageSize={5} total={totalNumber} />
          </div>
        )}
      </div>
      <div className={'flex justify-center'}>
        <Button ariaLabel={'add new hero'} onClick={() => navigate(AppRoutes.ADD_HERO)}>
          add hero
        </Button>
      </div>
    </>
  );
}
