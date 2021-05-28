import React from 'react'

import {GET_COMPANIES} from '../../graphql/queries/Company/getCompanies'
import {useQuery} from '@apollo/client'

import SectorsSection from 'components/SectorsSection/SectorsSection.jsx'
import ChartSection from 'components/ChartSection/ChartSection'
import TableSection from 'components/TableSection/TableSection'

import styles from "./Page.module.scss"

export const Page = () => {

  const {loading, error, data: companyData} = useQuery(GET_COMPANIES)

  if (loading) {
    return <span>Loading data...</span>
  }

  if (error) {
    return (
      <span>
        <pre>
          {JSON.stringify(error, null, 2)}
        </pre>
      </span>
    )
  }

  const {companies} = companyData

  return (
    <div className={styles.main}>
      <SectorsSection companyData={companies} />
      <ChartSection companyData={companies} />
      <TableSection companyData={companies} />
    </div>
  )
}

export default Page
