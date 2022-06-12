import React from 'react'
import styles from './Card.module.css'
const Card = ({HeaderContent,children}) => {

    return (
        <div className={styles.card}>
            <div className={styles.headingWrapper}>
                <h1 className={styles.heading}><span role="img" aria-label={HeaderContent.labelName}>{HeaderContent.symbol}</span>{HeaderContent.title}</h1>
            </div>
            {children}
        </div>
        

    )
}

export default Card