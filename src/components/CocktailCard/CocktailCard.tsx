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
                        const measure: string = responseCocktail[`strMeasure${count}`]
                        responseIngredients.push(`${measure.toLocaleLowerCase()} - ${responseCocktail[key]}`);
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
                                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    Not found cocktail
                                </div>
                            </>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export { CocktailCard }