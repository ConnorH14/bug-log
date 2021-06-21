import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugService {
  async getAllBugs() {
    const res = await api.get('/api/bugs')
    AppState.bugs = res.data
  }

  async getBugById(id) {
    const res = await api.get('/api/bugs/' + id)
    AppState.bugDetails = res.data
  }

  async addBug(data) {
    const res = await api.post('api/bugs', data)
    AppState.bugs = [...AppState.bugs, res.data]
    AppState.dateSortToggle = true
    return res.data.id
  }

  async editBug(id, body) {
    const res = await api.put('api/bugs/' + id, body)
    AppState.bugDetails = res.data
  }

  async closeBug(id) {
    await api.delete('api/bugs/' + id)
    this.getBugById(id)
  }

  sortStatus() {
    if (AppState.statusSortToggle) {
      document.getElementById('status-icon').classList.remove('mdi-arrow-up-drop-circle')
      document.getElementById('status-icon').classList.remove('mdi-arrow-right-drop-circle')
      document.getElementById('status-icon').classList.add('mdi-arrow-down-drop-circle')
      AppState.statusSortToggle = false
      AppState.bugs.sort(function(a, b) {
        if (a.closed < b.closed) { return -1 }
        if (a.closed > b.closed) { return 1 }
        return 0
      })
    } else {
      document.getElementById('status-icon').classList.remove('mdi-arrow-down-drop-circle')
      document.getElementById('status-icon').classList.remove('mdi-arrow-right-drop-circle')
      document.getElementById('status-icon').classList.add('mdi-arrow-up-drop-circle')
      AppState.statusSortToggle = true
      AppState.bugs.sort(function(a, b) {
        if (a.closed < b.closed) { return 1 }
        if (a.closed > b.closed) { return -1 }
        return 0
      })
    }
  }

  sortDate() {
    if (AppState.dateSortToggle) {
      document.getElementById('date-icon').classList.remove('mdi-arrow-up-drop-circle')
      document.getElementById('date-icon').classList.remove('mdi-arrow-right-drop-circle')
      document.getElementById('date-icon').classList.add('mdi-arrow-down-drop-circle')
      AppState.dateSortToggle = false
      AppState.bugs.sort(function(a, b) {
        if (a.updatedAt < b.updatedAt) { return 1 }
        if (a.updatedAt > b.updatedAt) { return -1 }
        return 0
      })
    } else {
      document.getElementById('date-icon').classList.remove('mdi-arrow-down-drop-circle')
      document.getElementById('date-icon').classList.remove('mdi-arrow-right-drop-circle')
      document.getElementById('date-icon').classList.add('mdi-arrow-up-drop-circle')
      AppState.dateSortToggle = true
      AppState.bugs.sort(function(a, b) {
        if (a.updatedAt < b.updatedAt) { return -1 }
        if (a.updatedAt > b.updatedAt) { return 1 }
        return 0
      })
    }
  }
}

export const bugService = new BugService()
