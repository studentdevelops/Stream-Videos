import { Magic } from "magic-sdk";



export const newMagic = (key) => {
    return typeof window!= "undefined" && new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY); // ✨
}

const magic = newMagic();
console.log({magic})