import './globals.css';
import Navbar from './Navbar';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Devjobs',
  description: 'Platform to find your best matches to the companies',
}

export default async function Layout({ children, modal }) {
  const session = await getServerSession();

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
      </body>
    </html>
  )
}
