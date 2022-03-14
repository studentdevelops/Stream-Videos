
import { Magic } from '@magic-sdk/admin';
import jwt from "jsonwebtoken"

export const magicAdmin = new Magic(process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY);

