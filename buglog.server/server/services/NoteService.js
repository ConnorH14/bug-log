import { dbContext } from '../db/DbContext'

class NoteService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator').execPopulate()
    return note
  }

  async edit(id, body) {
    const note = await dbContext.Notes.findByIdAndUpdate(id, body)
    await note.populate('creator')
    return note
  }

  async delete(id) {
    await dbContext.Notes.findByIdAndRemove(id)
    return 'Deleted'
  }
}

export const noteService = new NoteService()
