import React, { useState, useMemo } from 'react'
import {
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import useFetchData from 'src/hooks/api'

function formatDate(dateString) {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is 0-indexed
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

const PMS5003AllPMData = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const { data, loading, error } = useFetchData('pms5003/last24hours')

  const sortedData = useMemo(() => {
    let sortableItems = data?.data ? [...data.data] : []
    return sortableItems
  }, [data])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, itemsPerPage, sortedData])

  const pagination = (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem
        onClick={() => setCurrentPage((page) => page - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </CPaginationItem>
      <CPaginationItem
        onClick={() => setCurrentPage((page) => page + 1)}
        disabled={currentPage * itemsPerPage >= data.length}
      >
        Next
      </CPaginationItem>
    </CPagination>
  )

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  return (
    <>
      <CCardHeader>All PM Data Last 24 Hours</CCardHeader>
      <CCardBody>
        <CTable align="middle" className="mb-0 border" striped hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell className="text-center">PM1.0</CTableHeaderCell>
              <CTableHeaderCell className="text-center">PM2.5</CTableHeaderCell>
              <CTableHeaderCell className="text-center">PM10</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedData.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell>
                  <div>{formatDate(item.createdAt)}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.PM1_0}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.PM2_5}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.PM10}</div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <br />
        {pagination}
      </CCardBody>
    </>
  )
}

export default PMS5003AllPMData
