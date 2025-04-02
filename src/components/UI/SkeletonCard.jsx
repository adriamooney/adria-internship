import React from 'react'
import Skeleton from './Skeleton'

function SkeletonCard() {
  return (
    <div className="nft__item">
    <div className="author_list_pp">
        <Skeleton width="55px" height="55px" borderRadius="50%" />
        <i className="fa fa-check"></i>
    </div>
    <Skeleton width="100%" height="174px"  />
    <Skeleton width="80%"  />
    <Skeleton width="50%"  />
  </div>
  )
}

export default SkeletonCard