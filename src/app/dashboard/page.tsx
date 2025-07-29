import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/authOptions';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/auth/sign-in');
  }
  return redirect('/dashboard/overview');
}
