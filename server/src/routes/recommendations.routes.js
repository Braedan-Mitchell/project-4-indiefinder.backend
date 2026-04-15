import { Router } from 'express'
import * as recommendationsController from '../controllers/recommendations.controller.js'

const router = Router()

router.get('/', recommendationsController.getAllRecommendations)
router.get('/:id', recommendationsController.getRecommendationById)
router.post('/', recommendationsController.createRecommendation)
router.put('/:id', recommendationsController.updateRecommendation)
router.delete('/:id', recommendationsController.deleteRecommendation)

export default router
