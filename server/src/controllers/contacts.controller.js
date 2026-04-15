import * as contactsService from '../services/contacts.service.js'

export async function getAllContacts(req, res) {
  try {
    const contacts = await contactsService.getAllContacts()
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getContactById(req, res) {
  try {
    const contact = await contactsService.getContactById(req.params.id)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    res.json(contact)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createContact(req, res) {
  try {
    const newContact = await contactsService.createContact(req.body)
    res.status(201).json(newContact)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteContact(req, res) {
  try {
    const deleted = await contactsService.deleteContact(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Contact not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
