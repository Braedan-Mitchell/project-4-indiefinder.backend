import { Router } from 'express'
import * as contactsController from '../controllers/contacts.controller.js'

const router = Router()

router.get('/', contactsController.getAllContacts)
router.get('/:id', contactsController.getContactById)
router.post('/', contactsController.createContact)
router.delete('/:id', contactsController.deleteContact)

export default router
