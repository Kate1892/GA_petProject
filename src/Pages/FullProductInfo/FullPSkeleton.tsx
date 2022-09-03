import React from 'react'
import ContentLoader from 'react-content-loader'

const FullPSkeleton = () => (
  <ContentLoader
    speed={2}
    width='100%'
    height='100%'
    viewBox='0 0 1024 600'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='8' y='56' rx='0' ry='0' width='676' height='383' />
    <rect x='718' y='149' rx='0' ry='0' width='76' height='17' />
    <rect x='472' y='24' rx='0' ry='0' width='288' height='51' />
    <rect x='718' y='178' rx='0' ry='0' width='105' height='48' />
    <rect x='718' y='241' rx='0' ry='0' width='112' height='45' />
    <rect x='718' y='318' rx='0' ry='0' width='140' height='40' />
  </ContentLoader>
)

export default FullPSkeleton
