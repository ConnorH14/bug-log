import { AppState } from '../AppState'
import { api } from './AxiosService'

class NoteService {
  async getNoteFromBug(bugId) {
    const res = await api.get(`/api/bugs/${bugId}/notes`)
    AppState.bugNotes = res.data
  }

  async addNote(body) {
    const res = await api.post('/api/notes', body)
    AppState.bugNotes = [...AppState.bugNotes, res.data]
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    AppState.bugNotes = AppState.bugNotes.filter(b => b.id !== id)
  }
}

export const noteService = new NoteService()
