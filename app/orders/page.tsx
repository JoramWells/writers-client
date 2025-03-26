'use client'

import { useGetAllOrdersQuery } from '@/api/order.api'
import React from 'react'

const page = () => {

  const {data} = useGetAllOrdersQuery()
  console.log(data)
  return (
    <div>Dashboard</div>
  )
}

export default page