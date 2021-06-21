<template>
  <div class="modal fade"
       id="bugModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="bugModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bugModalLabel">
            Add New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addBug">
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
              Submit Bug
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
import { useRouter } from 'vue-router'
import $ from 'jquery'

export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      bugData: {}
    })
    return {
      state,
      async addBug(event) {
        try {
          const id = await bugService.addBug(state.bugData)
          event.target.reset()
          $('#bugModal').modal('hide')
          router.push({ path: '/bug/' + id })
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
