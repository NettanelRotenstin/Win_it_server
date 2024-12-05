import mongoose from "mongoose";
import gameModel from "../Models/gameModel"
import IGame from "../types/interfaces/IGame"
import '../Models/teamModel'
import '../Models/betModel'


export const allGamesService = async () => {
    try {
        const games = await gameModel.find({}).populate("teamA").populate("teamB").populate("bets")
        return games
    } catch (error) {
        console.log(error)
    }
}

export const addGameService = async (game: IGame) => {
    try {
        const { teamA, teamB, dateOfGame, ended, scoreA, scoreB, bets } = game
        const newGame = new gameModel({ teamA, teamB, dateOfGame, ended, scoreA, scoreB, bets })
        return await newGame.save()
    } catch (error) {
        console.log(error)
    }
}
