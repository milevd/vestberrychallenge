import React, { useState } from 'react'

import styles from "./TableSection.module.scss"
import Popup from 'components/Popup/Popup';

export default function TableSection({companyData}) {
    
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h3>Companies name</h3>
                <h3>Stage</h3>
                <h3>Sector</h3>
                <h3>Investment size</h3>
            </div>
            <div className={styles.content}>
                {companyData.map(company => (
                    <div className={styles.row}>
                        <h3>{company.name}</h3>
                        <h3>{company.stage}</h3>
                        <h3>{company.sector}</h3>
                        <h3>{company.investmentSize}</h3>
                    </div>
                ))}
                <div className={styles.buttonWrapper}>
                    <button onClick={() => setModalOpen(true)}>Add new company</button>
                </div>
            </div>
            <Popup isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
        </div>
    )
}
