import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <div>Admin Page</div>;
};
export default AdminPage;
