import { Router } from 'express'
import * as gamesController from '../controllers/games.controller.js'

const router = Router()

router.get('/', gamesController.getAllGames)
router.get('/:id', gamesController.getGameById)
router.post('/', gamesController.createGame)
router.put('/:id', gamesController.updateGame)
router.delete('/:id', gamesController.deleteGame)

export default router
