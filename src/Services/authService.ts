import { compare, hash } from "bcrypt"
import registerDTO from "../types/DTO/registerDTO"
import userModel from "../Models/userModel"
import { sign } from "jsonwebtoken"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import teams from '../DB/teams.json'
import teamModel from "../Models/teamModel"
import games from '../DB/games.json'
import e from "express"
import gameModel from "../Models/gameModel"
import bets from '../DB/bets.json'
import { bet } from "../Controllers/betController"
import betModel from "../Models/betModel"

export const registerService = async (user: registerDTO) => {
    try {
        const encryptPass: string = await hash(user.password, 10)
        const { username } = user
        const dbNewUser = new userModel({ username, password: encryptPass })
        return await dbNewUser.save()
    } catch (error) {
        console.log(`can't register`)
    }
}


export const loginService = async (user: registerDTO) => {
    try {
        const userFromDB = await userModel.findOne({ username: user.username })
        if (!userFromDB) throw new Error(`user not found`)
        const match = await compare(user.password, userFromDB.password)
        if (!match) throw new Error('incorrect details')
        const token = await jwt.sign({
            userId: userFromDB._id,
            password: userFromDB.password
        }, process.env.SECRET_KEY!)
        return { ...userFromDB, token, password: "****" }
    } catch (error) {
        console.log(error)
    }
}

 

export const ceedBets = () => {
    try {
        bets.map(async (t) => {
            const newGame = new betModel(t)
            await newGame.save()
        })
    } catch (error) {
        console.log(error)
    }
}

 
// export const ceed = async () => {
//     try {
//         org.map(async (or) => {
//             const newOrg = new OrganizasionModel(or);
//             await newOrg.save();
//         });
//         msl.map(async (ms) => {
//             const newMsl = new MissileModel(ms);
//             await newMsl.save();
//         });
//     } catch (error) {
//         console.log("error in ceed")
//     }
// }