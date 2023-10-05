import Layout from '@/components/Layout';
import 'tailwindcss/tailwind.css';
import classnames from "classnames";


export default function Home() {
  const wrapperClasses = classnames()
  return (
    
    <div className='text-black bg-sky-400'>
      <Layout>
        Home
      </Layout>
    </div>
  
  )
}
