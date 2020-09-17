import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { TotalPagesContext } from '../../context/TotalPagesContext'
import { siteConfig } from '../../site.config'

const SlideshowPage = ({ totalSlidePages, currentSlide, filename }) => {
  const MDXContent = dynamic(() => import(`../../${filename}`))
  return (
    <TotalPagesContext.Provider value={totalSlidePages}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MDXContent />
    </TotalPagesContext.Provider>
  )
}

export async function getStaticProps({ params }) {
  const filename = path.join('slides', `${params.talk}/${params.slide}.mdx`)
  const slidesDirectory = path.join(process.cwd(), `slides/${params.talk}`)
  const mdxFiles = fs.readdirSync(slidesDirectory)
  const totalSlidePages = mdxFiles.length

  return {
    props: {
      totalSlidePages,
      currentSlide: params.slide,
      filename,
    },
  }
}

export async function getStaticPaths() {
  const talksDirectory = path.join(process.cwd(), 'slides')
  const talkDirectories = fs.readdirSync(talksDirectory)

  // Loop through all post files and create array of slugs (to create links)
  const paths = []

  talkDirectories.forEach((talk) => {
    const slidesDirectory = path.join(process.cwd(), `slides/${talk}`)
    const slideFiles = fs.readdirSync(slidesDirectory)

    slideFiles.forEach((filename) => {
      const slide = filename.replace('.mdx', '')

      paths.push({
        params: {
          talk,
          slide,
        },
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export default SlideshowPage
