import { Router } from "express"
import { bet } from "../Controllers/betController"

const router = Router()
 
router.post('/',bet)

export default router