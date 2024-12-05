import { compare, hash } from "bcrypt"
import registerDTO from "../types/DTO/registerDTO"
import userModel from "../Models/userModel"
import { sign } from "jsonwebtoken"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import teamModel from "../Models/teamModel"
import e from "express"
import gameModel from "../Models/gameModel"
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

 

 
 
 