'use server'

import { hash } from "bcryptjs"
import { TSignInSchema, TSignUpSchema } from "@/lib/validation"
import { signIn } from "@/auth"
import { query } from "@/lib/db";

export const loginGithub = async () => await signIn("github",{redirectTo: '/'});

export const login = async (params:TSignInSchema) => {
    try {
        const res = await signIn('credentials',{
            ...params,
            redirect: false,
        })

        if(res.error){
            return {success: false,message: res.error}
        }
        
        return {success: true,message: 'successfully login'}
    } catch (error) {
        console.log(JSON.stringify(error,null,2));
                
        return {success: false,message: 'Invalid Data'}
    }
}

export const register =  async (params:TSignUpSchema) => {
    const {firstName,lastName,email,password,confirmPassword} = params

    if(!firstName || !lastName || !email || !password || !confirmPassword){
        return {success: false,message: 'fill out all field!'}
    }
    
    const user = await query('select * from users where email ilike $1',[email]);
    const isEmailExist = (user?.rows as any[]).length > 0;

    if(isEmailExist){
        return {success: false,message: 'email already exists'}
    }
    
    if(password !== confirmPassword){
        return {success: false,message: 'password and confirm password is not matched'}
    }
    
    const hashPassword = await hash(password,10);
    
    try {
        await query(`
            insert into users(first_name,last_name,email,password)
            values($1,$2,$3,$4)
            returning *
        `,[firstName,lastName,email,hashPassword]);
        
        return {success: true,message: 'data successfully regitered'}
    } catch (error) {
        return {success: false,message: 'signup error'}
    }
}