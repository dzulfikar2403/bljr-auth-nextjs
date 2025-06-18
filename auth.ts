
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import { compare } from 'bcryptjs'
import { edgeSql } from "./lib/edge-db";
import config from "./lib/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    
    providers: [
        GitHub({
            clientId: config.env.github.clientId,
            clientSecret: config.env.github.clientSecret
        }),
        Credentials({
        name: 'credentials',
        
        authorize: async (credentials) => {
            const email = credentials.email as string | undefined;
            const password = credentials.password as string | undefined;

            if(!email || !password){
                throw new Error('data required')
            }

            const user = await edgeSql`select * from users where email ilike ${email}`

            if(user.length === 0){
                throw new Error('user not exists')
            }

            const isPwValid = await compare(password as string, user[0].password);

            if(!isPwValid){
                throw new Error('invalid password')
            }

            const userData = {
                id: `${user[0].id}` as string,
                name: `${user[0].first_name} ${user[0].last_name}` as string,
                email:  user[0].email as string,
                role: user[0].role as string
            }
            
            return userData
        },
    })
    ],

    pages:{
        signIn: '/sign-in'
    },

    callbacks: {
        jwt: async ({token,user}) => {
            if(user){
                token.role = user.role 
            }

            return token
        },
        
        session: async ({session,token}) => {
            if(token?.role){
                session.user.role = token.role
            }
            
            return session
        },
        signIn: async ({user,account}) => {
            if(account?.type === 'oauth'){
                const {email,name,image,id:providerAccountId} = user;
                
                const userByEmail = await edgeSql`select * from users where email ilike ${email as string}`;
                let dbUser = userByEmail[0]; 
            
                if(userByEmail.length === 0){ // cek jika email not exists|belum ada
                    const res = await edgeSql`
                    insert into users(first_name,last_name,email,password)
                    values(${name as string},'oAuth',${email as string},'')
                    returning *
                    `
                    dbUser = res[0]
                }
                
                user.role = dbUser.role as string; // inject role untuk provider oAuth
            return true
          }else{
            return true
          }
        },
    }
  
})