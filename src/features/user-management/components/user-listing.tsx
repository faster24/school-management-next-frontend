import { searchParamsCache } from '@/lib/searchparams';
import { User } from '@/types/school-index';
import { UserManagementTable } from './user-tables';
import { userManagementColumns } from './user-tables/columns';
import { getUsers } from '@/services/user.services';
type UserListingPage = {};

export default async function UserListingPage({ }: UserListingPage) {
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');
    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
    };

    console.log(search)

    const users: User[] = await getUsers(filters);

    return (
        <UserManagementTable
            data={users}
            totalItems={users.length}
            columns={userManagementColumns}
        />
    );
}
