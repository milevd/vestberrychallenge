import React from 'react'

import FintechIcon from "../../assets/img/icons/ico_fintech.svg"
import InsurtechIcon from "../../assets/img/icons/ico_insurtech.svg"
import RoboadvisoryIcon from "../../assets/img/icons/ico_roboadvisory.svg"
import IotIcon from "../../assets/img/icons/ico_iot.svg"

import styles from "./SectorsSection.module.scss"

export default function SectorsSection({companyData}) {

    const countSectorCompanies = (sector) => {

        let res = companyData.filter(company => {
            return company.sector == sector
        })

        return res.length
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h3>Companies by sectors</h3>
            </div>
            <div className={styles.content}>
                <div className={styles.sector}>
                    <h2>{countSectorCompanies("Fintech")}</h2>
                    <h3>Fintech</h3>
                    <FintechIcon />
                </div>
                <div className={styles.sector}>
                    <h2>{countSectorCompanies("Insurtech")}</h2>
                    <h3>Insurtech</h3>
                    <InsurtechIcon />
                </div>
                <div className={styles.sector}>
                    <h2>{countSectorCompanies("Roboadvisory")}</h2>
                    <h3>Roboadvisory</h3>
                    <RoboadvisoryIcon />
                </div>
                <div className={styles.sector}>
                    <h2>{countSectorCompanies("IOT")}</h2>
                    <h3>Iot</h3>
                    <IotIcon />
                </div>
            </div>
        </div>
    )
}
