import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    req.body.creatorId = req.userInfo.id
    try {
      const note = await noteService.create(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    req.body.creatorId = req.userInfo.id
    try {
      const note = await noteService.edit(req.params.id, req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const note = await noteService.delete(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
