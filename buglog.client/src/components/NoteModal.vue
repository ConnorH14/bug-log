<template>
  <div class="modal fade"
       id="noteModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="noteModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="noteModalLabel">
            Add New Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addNote">
            <label for="bug-body" class="sr-only">Note Description</label>
            <input type="text"
                   name="bug-body"
                   id="bug-body"
                   placeholder="Note Description"
                   class="mb-3 w-100"
                   v-model="state.noteData.body"
            >
            <button type="button" class="btn btn-danger mr-3" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-dark">
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { noteService } from '../services/NoteService'
import Notification from '../utils/Notification'
import $ from 'jquery'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      noteData: {
        bug: route.params.id
      }
    })
    return {
      state,
      async addNote(event) {
        try {
          await noteService.addNote(state.noteData)
          event.target.reset()
          $('#noteModal').modal('hide')
        } catch (error) {
          Notification.toast(error)
        }
      }

    }
  }

}
</script>

<style>

</style>
