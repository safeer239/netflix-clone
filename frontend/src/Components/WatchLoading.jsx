import React from 'react'

const WatchLoading = () => {
  return (
    <div className='animate-pulse'>
        <div className="bg-gray- rounded-md w-40 mb-4 shimmer"></div>
        <div className="bg-gray- rounded-md w-full h-96 mb-4 shimmer"></div>
        <div className="bg-gray- rounded-md w-3/4 h-6 mb-2 shimmer"></div>
        <div className="bg-gray- rounded-md w-1/2 h-6 mb-4 shimmer"></div>
        <div className="bg-gray- rounded-md w-full h-24 shimmer"></div>
    </div>
  )
}

export default WatchLoading