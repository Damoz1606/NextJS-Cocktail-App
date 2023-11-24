import Image from 'next/image';
import React, { useState } from 'react'
import style from '@/styles/ProfilePhoto.module.css'
import { Bounce } from '../Loader';

type ProfilePhotoProps = {
    source: string;
    text: string;
    load: boolean;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ source, text, load }) => {

    return (
        <div className={`${style.container} ${load ? style.load : ""}`}>
            <div className={style.image_container}>
                <Image width={250} height={250} style={{ borderRadius: '100%' }} src={source} alt={''} />
            </div>
            <div className={`${style.tag}`}>
                <div className={style.loader}>
                    <Bounce />
                </div>
                <p className={`${style.cocktail_name}`}>{load ? "Loading..." : text}</p>
            </div>
        </div >
    )
}

export { ProfilePhoto }