import React, { useEffect, useState, useRef } from 'react'

import { Doughnut } from 'react-chartjs-2';

import styles from "./ChartSection.module.scss"

export default function ChartSection({companyData}) {

    const [colors, setColors] = useState([])
    const [labels, setLabels] = useState([])
    const [investments, setInvestments] = useState([])

    const prevColorsRef = useRef();

    useEffect(() =>{
        prevColorsRef.current = []
    },[])

    useEffect(() => {
        
        setLabels(companyData.map(company => company.name))
        setInvestments(companyData.map(company => company.investmentSize))

        const prevColors = prevColorsRef.current

        let newColors = prevColors

        for(let i=prevColors.length; i<companyData.length; i++){
            newColors.push("#" + Math.floor(Math.random()*16777215).toString(16))
        }

        prevColorsRef.current = newColors

        setColors(newColors)

    }, [companyData])

    const data = {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: investments,
            backgroundColor: colors,
            borderWidth: 0
          },
        ],
      };

    const options = {
        cutout: "60%",
        plugins:{
            cutoutPercentage: 100,
            legend:{
                display: false
            },
        },
        maintainAspectRatio: false
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h3>Companies by sectors</h3>
            </div>
            <div className={styles.content}>
                <div className={styles.chartWrapper}>
                    <Doughnut 
                        data={data} 
                        options={options} 
                        className={styles.chart}
                    />
                    <div className={styles.middleText}>
                        <h2>{companyData.length}</h2>
                        <h3>Companies</h3>
                    </div>
                </div>
                <div className={styles.legendsWrapper}>
                    {labels.map((label, index) => (
                        <div className={styles.legend}>
                            <span style={{backgroundColor: colors[index]}}></span>
                            <h3>{label}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
