import React, { ReactNode } from 'react'
import style from '@/styles/Card.module.css'

type CardBodyProps = {
    children: ReactNode;
}

const CardBody: React.FC<CardBodyProps> = ({ children }) => {
    return (
        <div  className={`${style.body}`}>{children}</div>
    )
}

export { CardBody }