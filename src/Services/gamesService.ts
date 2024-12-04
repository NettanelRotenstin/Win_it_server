import gameModel from "../Models/gameModel"
import IGame from "../types/interfaces/IGame"

export const allGamesService = async () => {
    try {
        const games = await gameModel.find({}).populate('games')
        return games
    } catch (error) {
        console.log(`can't register`)
    }
}

export const addGameService = async (game: IGame) => {
    try {
        const { teamA, teamB, dateOfGame, ended, scoreA, scoreB, bets } = game
        const newGame =  new gameModel({teamA, teamB, dateOfGame, ended, scoreA, scoreB, bets})
        return await newGame.save()
    } catch (error) {
        console.log(error)
    }
    
}
 