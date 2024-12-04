import betModel from "../Models/betModel"
import gameModel from "../Models/gameModel"
import userModel from "../Models/userModel"
import betDTO from "../types/DTO/betDto"

export const betService = async (bet: betDTO) => {
    try {
        const userFromDb = await userModel.findById(bet.userId)
        const gameFromDb = await gameModel.findById(bet.game)
        const betFromDb = await betModel.findById(bet.bet)
        
    } catch (error) {
        console.log(`can't register`)
    }
}

// export default interface betDTO{
//     userId:string
//     game:string
//     bet:string
// }