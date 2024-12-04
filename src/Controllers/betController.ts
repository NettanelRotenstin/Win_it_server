import { Request, Response } from "express"
import { betService } from "../Services/betService"

export const bet = async(req:Request,res:Response) =>{
    try {
        const result = await betService(req.body)
        res.status(201).json(
            result
        )
    } catch (error) {
        res.json({msg:"faild bet"})
    }
}