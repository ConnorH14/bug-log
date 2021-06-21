<template>
  <div class="modal fade"
       id="editBugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="editBugModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editBugModalLabel">
            Edit Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editBug">
            <label for="bug-title" class="sr-only">Bug Title</label>
            <input type="text"
                   name="bug-title"
                   id="bug-title"
                   placeholder="Bug Title"
                   class="mb-3 w-100"
                   v-model="state.bugData.title"
            >
            <br>
            <label for="bug-title" class="sr-only">Bug Description</label>
            <input type="text"
                   name="bug-description"
                   id="bug-description"
                   placeholder="Bug Description"
                   class="mb-3 w-100"
                   v-model="state.bugData.description"
            >
            <button type="button" class="btn btn-danger mr-3" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-dark">
              Edit Bug
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { bugService } from '../services/BugService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import $ from 'jquery'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      bugData: {}
    })
    return {
      state,
      async editBug(event) {
        try {
          await bugService.editBug(route.params.id, state.bugData)
          event.target.reset()
          $('#editBugModal').modal('hide')
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
