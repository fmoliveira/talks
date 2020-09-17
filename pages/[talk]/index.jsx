import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function index() {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${router.query.talk}/1`)
  })
  return <div />
}
