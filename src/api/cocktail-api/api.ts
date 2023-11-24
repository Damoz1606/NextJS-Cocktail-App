import { config } from "@/config/config";

export const getCocktails = async (value: string) => {
    try {
        const response = await fetch(`${config.api.cocktail}${value}`);
        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}