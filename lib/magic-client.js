import { Magic } from "magic-sdk";



const newMagic = (key) => {
    return typeof window!= "undefined" && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY); // ✨
}



export const magic = newMagic();

