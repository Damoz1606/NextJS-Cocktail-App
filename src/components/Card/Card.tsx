import React, { ReactNode } from 'react'
import style from '@/styles/Card.module.css'

type CardProps = {
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className={`${style.card}`}>{children}</div>
    )
}

export { Card }