import { searchParamsCache } from '@/lib/searchparams';
import { User } from '@/types/school-index';
import { UserManagementTable } from './user-tables';
import { userManagementColumns } from './user-tables/columns';
import { getUsers } from '@/services/user.services';
type UserListingPage = {};

export default async function UserListingPage({}: UserListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const users: User[] = await getUsers();

  return (
    <UserManagementTable
      data={users}
      totalItems={users.length}
      columns={userManagementColumns}
    />
  );
}
