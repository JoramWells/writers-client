'use client'

import { useGetAllOrdersQuery } from '@/api/order.api'
import TableContainer from '@/components/custom/table/TableContainer'
import React from 'react'
import { columns } from './column'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const page = () => {

  const {data} = useGetAllOrdersQuery()
  console.log(data)
  const router = useRouter()
  return (
    <div
    className='p-2'
    >
      <TableContainer 
      columns={columns}
      data={data || []}
      search=''
      setSearch={()=>{}}
      title='Orders'
      total={0}
      rightLabel={
        <Button
        size={'sm'}
        onClick={()=>router.push('/orders/add')}
        >NEW</Button>
      }
      />
    </div>
  )
}

export default page