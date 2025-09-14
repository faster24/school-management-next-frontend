import AccountViewPage from '@/features/account/account-view-page';
import { authOptions } from '@/lib/authOptions';
import { getUserById } from '@/services/user.services';
import { Loader } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard : Account'
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const user = await getUserById(session?.id!); // Here need to add route or fix for teacher and user profile and now just use admin route

  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-screen items-center justify-center'>
          <Loader className='h-10 w-10 animate-spin' />
        </div>
      }
    >
      <AccountViewPage user={user} />;
    </Suspense>
  );
}
