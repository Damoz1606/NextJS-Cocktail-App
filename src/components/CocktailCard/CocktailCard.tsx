import React, { useState } from 'react'
import { Card, CardBody } from '../Card'
import { SearchBox } from '../SearchBox'
import { ProfilePhoto } from '../ProfilePhoto'
import style from '@/styles/Cocktail.module.css'
import { config } from '@/config/config'
import { getCocktails } from '@/api/cocktail-api'

const CocktailCard: React.FC = () => {

    const [load, setLoad] = useState<boolean>(true);
    const [cocktail, setCocktail] = useState<any | null>(null);

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string>("");

    const search = async (value: string) => {
        setLoad(true);
        try {
            const response = await getCocktails(value);
            if (response.drinks) {
                const responseCocktail = response.drinks[0];
                const responseIngredients = [];

                setCocktail(responseCocktail);
                for (const key in responseCocktail) {
                    if (key.startsWith("strIngredient") && responseCocktail[key]) {
                        const count = key.split("strIngredient")[1];
                        const measure = responseCocktail[`strMeasure${count}`] ? `${responseCocktail[`strMeasure${count}`]} - ` : "";
                        responseIngredients.push(`${measure.toLocaleLowerCase()}${responseCocktail[key]}`);
                    }
                }
                setIngredients(responseIngredients);
                setInstructions(responseCocktail.strInstructions);
            } else {
                setCocktail(null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    }

    return (
        <Card>
            <CardBody>
                <div className={style.container}>
                    <div style={{ height: 47, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <SearchBox
                            onSearch={search} />
                    </div>
                    {
                        cocktail ?
                            <>
                                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <ProfilePhoto
                                        source={cocktail.strDrinkThumb}
                                        text={cocktail.strDrink}
                                        load={load} />
                                </div>
                                <div className={style.cocktail_features}>
                                    <h4 className={style.title}>Ingredients</h4>
                                    <div className={`${style.ingredient_box}`}>
                                        {
                                            ingredients.map((e, i) => (
                                                <p className={`${style.text} ${style.ingredient}`} key={i}>{e}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={style.cocktail_features}>
                                    <h4 className={style.title}>Instruction</h4>
                                    <p className={`${style.text}`}>{instructions}</p>
                                </div>
                            </> :
                            <>
                                <div className={style.not_found} style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                    <div className={style.text}>
                                        <h4>Please look for a Cocktail</h4>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export { CocktailCard }