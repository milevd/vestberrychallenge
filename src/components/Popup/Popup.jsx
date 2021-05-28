import React, { useState, useRef, useEffect } from 'react'

import Modal from 'react-modal';

import {ADD_COMPANY} from "../../graphql/mutations/Company/addCompany"
import {GET_COMPANIES} from "../../graphql/queries/Company/getCompanies"
import {GET_SECTORS} from "../../graphql/queries/Sector/getSectors"
import {GET_STAGES} from "../../graphql/queries/Stage/getStages"
import { useMutation, useQuery } from '@apollo/client';

import AngleDown from "../../assets/img/svg/angle-down.svg"

import styles from "./Popup.module.scss"

export default function Popup({isModalOpen, setModalOpen}) {

    const {loading: loadingStages, error: errorStages, data: sectorsData} = useQuery(GET_SECTORS)
    const {loading: loadingSectors, error: errorSectors, data: stagesData} = useQuery(GET_STAGES)

    const [name, setName] = useState('')
    const [stage, setStage] = useState('')
    const [sector, setSector] = useState('')
    const [investment, setInvestment] = useState(0)

    const [stageOpen, setStageOpen] = useState(false)
    const [sectorOpen, setSectorOpen] = useState(false)

    const stageRef = useRef(null)
    const sectorRef = useRef(null)

    const [addCompany, { error }] = useMutation(ADD_COMPANY, {
        refetchQueries: [
          { query: GET_COMPANIES }
        ]
    });

    useEffect(() => {

        function handleClickOutsideStage(event) {
            if (stageRef.current && !stageRef.current.contains(event.target)) {
                setStageOpen(false)
            }
        }

        function handleClickOutsideSector(event) {
            if (sectorRef.current && !sectorRef.current.contains(event.target)) {
                setSectorOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutsideStage);
        document.addEventListener("click", handleClickOutsideSector);
        return () => {
            document.removeEventListener("click", handleClickOutsideStage);
            document.removeEventListener("click", handleClickOutsideSector);
        };
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault()

        if(!name || !stage || !sector || investment === null){
            alert("Please enter all required values.")
            return
        }

        const req = {
            name,
            stage,
            sector,
            investmentSize: parseInt(investment)
        }

        addCompany({variables: req})

        setName('')
        setStage('')
        setSector('')
        setInvestment(0)

        setModalOpen(false)

        if (error){
            console.log(error)
        }
    }

    if (loadingStages || loadingSectors) {
        return <span>Loading data...</span>
    }
    
    if (errorStages || errorSectors) {
        return (
            <span>
                <pre>
                {JSON.stringify(errorStages ? errorStages : errorSectors, null, 2)}
                </pre>
            </span>
        )   
    }

    const {sectors} = sectorsData
    const {stages} = stagesData 

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
            onAfterOpen={() => setModalOpen(true)}
            open={isModalOpen}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h1>Add new company</h1>
            <form onSubmit={handleSubmit}>
                <p>Company name</p>
                <div className={styles.inputWrapper}>
                    <input type="text" placeholder="Company name" value={name} required onChange={e => setName(e.target.value)}/>
                    <span></span>
                </div>
                <p>Stage</p>
                <div className={styles.inputWrapper} ref={stageRef}>
                    <input type="text" placeholder="Select stage from list" readOnly required value={stage} onClick={() => setStageOpen(true)}/>
                    <AngleDown />
                    {stageOpen &&
                        <div className={styles.dropdown}>
                            {stages.map((stage, index) => (
                                <h3 key={index} onClick={() => {setStage(stage); setStageOpen(false)}}>{stage}</h3>
                            ))}
                        </div>
                    }
                </div>
                <p>Sector</p>
                <div className={styles.inputWrapper} ref={sectorRef}>
                    <input type="text" placeholder="Select sector from list" readOnly required value={sector} onClick={() => setSectorOpen(true)}/>
                    <AngleDown />
                    {sectorOpen &&
                        <div className={styles.dropdown}>
                            {sectors.map((sector, index) => (
                                <h3 key={index} onClick={() => {setSector(sector); setSectorOpen(false)}}>{sector}</h3>
                            ))}
                        </div>
                    }
                </div>
                <p>investment size</p>
                <div className={styles.inputWrapper}>
                    <input type="number" placeholder="Enter amount" value={investment} required onChange={e => setInvestment(e.target.value)}/>
                    <p>EUR</p>
                </div>
                <button>Add new company</button>
            </form>
      </Modal>
    )
}
