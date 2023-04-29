import Head from '@/components/head'
import Image from 'next/image'

const Home: React.FC = () => {
  return (
    <>
      <Head title="Ray Chen" description="Random bits of knowledge." slug="/" />
      <Image src="owl.svg" alt="Logo" width={100} height={100} />
    </>
  )
}

export default Home
