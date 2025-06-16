import Link from "next/link"

export default function Header() {
  return (
    <header className="flex justify-between w-full max-w-2xl px-4 mx-auto mt-8 sm:pt-16">
      <Link href="/" className="no-underline">
        <h1 className="title">Meri Leeworthy</h1>
      </Link>
      <nav>
        <ul className="mt-8 text-right font-title">
          <li>
            <Link href="/work" className="no-underline">
              Work
            </Link>
          </li>
          <li>
            <a href="/Meri_Leeworthy_Resume.pdf" className="no-underline">
              Resume
            </a>
          </li>
          <li>
            <a
              href="https://github.com/meri-leeworthy"
              className="no-underline">
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/meri-leeworthy-4a6b7a133/"
              className="no-underline">
              LinkedIn
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
