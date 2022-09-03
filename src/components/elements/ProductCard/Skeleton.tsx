import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox='0 0 300 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='70' y='270' rx='0' ry='0' width='230' height='50' />
    <rect x='200' y='330' rx='0' ry='0' width='100' height='21' />
    <rect x='0' y='6' rx='0' ry='0' width='300' height='200' />
    <rect x='40' y='215' rx='0' ry='0' width='280' height='50' />
  </ContentLoader>
)

export default Skeleton
