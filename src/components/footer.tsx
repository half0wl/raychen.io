import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mb-6 mt-20 flex items-center border-t-2 border-slate-300 pt-4 text-sm text-slate-600 opacity-80">
      <p>
        &copy; <Link href="https://raychen.io">Ray Chen</Link>, 2023. All rights
        reserved.
      </p>
    </footer>
  )
}

export default Footer
