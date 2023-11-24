import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import style from '@/styles/SearchBox.module.css'

type SearchBoxProps = {
    onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {

    const [activeSearch, setActiveSearch] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (!activeSearch) {
            setValue(value);
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSearch]);


    const handleClick = () => {
        if (!activeSearch) {
            setActiveSearch(true);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(value);
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return (
        <div onClick={handleClick} className={`${style.container} ${activeSearch ? style.active : ""} ${style.button_type}`}>
            <div className={`${style.search}`}>
                <svg className={`w-6 h-6 ${style.cloud}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
            <form onSubmit={handleSubmit}>
                <input onInput={handleInput} type="text" name="cocktailname" placeholder='Cocktail name' value={value} />
            </form>
            <button onClick={() => setActiveSearch(false)} className={`${style.close}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export { SearchBox }