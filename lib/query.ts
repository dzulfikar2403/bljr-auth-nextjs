'use server'
import { query } from "./db";

export const getUserByEmail = async (email:string) => {
    const user = await query(`select * from users where email ilike $1`,[email]);
    return user?.rows
}