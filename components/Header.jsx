import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { siteConfig } from '../site.config'

export default function Header({ title, date }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          {siteConfig.name} - {title}
        </title>
        <base target="_blank" />
      </Head>
      <header>
        <div>
          <a href={siteConfig.url}>
            <span>{siteConfig.name}</span>
          </a>{' '}
          —{' '}
          <Link href={`/${router.query.talk}`}>
            <a>{title}</a>
          </Link>
        </div>
        <time>{date}</time>
      </header>
    </>
  )
}
