import React from 'react'
import style from '@/styles/Loader.module.css'

type BounceProps = {
    border?: {
        size?: number | string;
    }, dot?: {
        size?: number | string;
    }
}

const Bounce: React.FC<BounceProps> = ({
    border = {
        size: "32px"
    },
    dot = {
        size: "6px"
    }
}) => {
    return (
        <div className={`${style.loader_bounce}`} style={{ width: border.size, height: border.size }}>
            <span className={style.border} style={{ width: border.size, height: border.size }}></span>
            <span className={style.dot} style={{ width: dot.size, height: dot.size, top: `calc(50% - ${dot.size}/2)`, left: `calc(50% - ${dot.size}/2)` }}></span>
        </div>
    )
}

export { Bounce }