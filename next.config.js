const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
})
module.exports = withMDX({
  target: 'serverless',
  // Pick up MDX files in the /pages/ directory
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
})
