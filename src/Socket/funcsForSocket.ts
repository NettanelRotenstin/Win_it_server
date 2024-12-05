import userModel from "../Models/userModel"

export const historyBetsOfUser = async (userId:string)=>{
    try {
        const user = await userModel.findById(userId)
        return user?.history
    } catch (error) {
        console.log(error)
        return error
    }
}