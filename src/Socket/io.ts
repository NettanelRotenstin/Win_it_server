import { Socket } from "socket.io";
import betDTO from "../types/DTO/betDto";
import { historyBetsOfUser } from "./funcsForSocket";
import { betService } from "../Services/betService";
 

 export const handelSocketConnection = async (client: Socket) => {
  //when client bet he will get all his bets
  client.on("bet", async (newbet:betDTO) => {
      await betService(newbet)
     client.emit('all-bets',await historyBetsOfUser(newbet.userId))
  });
};