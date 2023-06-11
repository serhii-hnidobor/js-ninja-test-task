import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppRoutes } from '@common';
import { AddHero, AuthPage, EditHero, Hero, Main } from '@pages';
import { useAppDispatch, useAppSelector } from '@hooks';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useState } from 'react';
import { supabase } from 'shared/build';
import { sessionChange, signOut } from '@store/auth/actions';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button } from '@components/common';

export default function () {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const session = useAppSelector(({ auth }) => auth.session);

  const { pathname } = useLocation();

  useDeepCompareEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(sessionChange(session));
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoading(true);
      dispatch(sessionChange(session));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const isAuthRoute = pathname.includes(AppRoutes.AUTH);

  if (!isAuthRoute && !session) {
    return <Navigate to={AppRoutes.AUTH} />;
  }

  return (
    <div className={'w-screen'}>
      {!isAuthRoute && (
        <div className={'h-[40px] px-[30px] flex justify-end mb-[30px]'}>
          <Button
            ariaLabel={'sign out'}
            onClick={() => {
              dispatch(signOut());
              supabase.auth.signOut();
            }}
          >
            sign out
          </Button>
        </div>
      )}
      <Routes>
        <Route path={AppRoutes.ROOT} element={<Main />} />
        <Route path={AppRoutes.AUTH} element={<AuthPage />} />
        <Route path={AppRoutes.ADD_HERO} element={<AddHero />} />
        <Route path={AppRoutes.EDIT_HERO} element={<EditHero />} />
        <Route path={AppRoutes.HERO} element={<Hero />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
