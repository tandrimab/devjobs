import './globals.css';
import Navbar from './Navbar';

export const metadata = {
  title: 'Devjobs',
  description: 'Platform to find your best matches to the companies',
}

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body>
          <div className='bg-lightGrey'>
            <Navbar />
            {children}
          </div>
      </body>
    </html>
  )
}
