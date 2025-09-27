import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { User } from '@/types/school-index';
import UserForm from './user-form';
import { getUserById } from '@/services/user.services';
import { Session } from 'next-auth';

type TUserViewPageProps = {
    userId: string;
};

export default async function UserViewPage({ userId }: TUserViewPageProps) {
    let user: User | null = null;
    let pageTitle = 'Create New User';

    const session: Session | null = await getServerSession(authOptions);

    if (userId !== 'new') {
        const data = await getUserById(Number(userId));
        user = data;
        if (!user) {
            notFound();
        }
        pageTitle = `Edit User`;
    }

    return <UserForm initialData={user} pageTitle={pageTitle} session={session} />;
}
