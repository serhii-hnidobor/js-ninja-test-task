import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from 'shared/build';
import { useAppSelector } from '@hooks';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '@common';

export default function () {
  const session = useAppSelector(({ auth }) => auth.session);

  if (session) {
    return <Navigate to={AppRoutes.ROOT} />;
  }

  return (
    <div className={'flex justify-center'}>
      <div className={'w-[500px]'}>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]} />
      </div>
    </div>
  );
}
