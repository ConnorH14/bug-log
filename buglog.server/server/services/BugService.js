import { dbContext } from '../db/DbContext'

class BugService {
  async getAll() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }

  async getById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    return bug
  }

  async getNotes(id) {
    const notes = await dbContext.Notes.find({ bug: id }).populate('creator')
    return notes
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    await bug.populate('creator').execPopulate()
    return bug
  }

  async edit(id, body) {
    const editCheck = await dbContext.Bugs.findById(id)
    if (editCheck.closed) {
      return 'not permitted'
    } else {
      await dbContext.Bugs.findByIdAndUpdate(id, body)
      const bug = await dbContext.Bugs.findById(id).populate('creator')
      return bug
    }
  }

  async delete(id, body) {
    await dbContext.Bugs.findByIdAndUpdate(id, body)
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    return bug
  }
}

export const bugService = new BugService()
