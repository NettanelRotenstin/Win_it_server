import betModel from "../Models/betModel"
import gameModel from "../Models/gameModel"
import userModel from "../Models/userModel"
import betDTO from "../types/DTO/betDto"
import IBet from "../types/interfaces/IBet"

export const betService = async (bet: betDTO) => {
    try {
        const userFromDb = await userModel.findById(bet.userId)
        const gameFromDb = await gameModel.findById(bet.game)
        userFromDb?.history?.push(bet.bet)
        userFromDb?.save()
        gameFromDb?.gamblers?.push(bet.userId)
        gameFromDb?.save()
    } catch (error) {
        console.log(`can't bet`)
    }
}

 