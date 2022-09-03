import React from 'react'
import ContentLoader from 'react-content-loader'

const StockSkeleton = () => (
  <ContentLoader
    speed={2}
    width='100%'
    height='100%'
    viewBox='0 0 1024 600'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='8' y='56' rx='0' ry='0' width='1000' height='583' />
    <rect x='31' y='519' rx='0' ry='0' width='900' height='51' />
    <rect x='507' y='58' rx='0' ry='0' width='137' height='582' />
  </ContentLoader>
)

export default StockSkeleton
