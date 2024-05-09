import './globals.css';
import Navbar from './Navbar';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import ToastContainerWrapper from '@/components/ToastContainerWrapper';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Devjobs',
  description: 'Platform to find your best matches to the companies',
}

export default async function Layout({ children, modal }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className='bg-lightGrey'>
            <Navbar />
            {children}
            {modal}
          </div>
        </SessionProvider>
        <ToastContainerWrapper />
      </body>
    </html>
  )
}
