<template>
  <div class="col-lg-12" v-if="bug && note">
    <div class="note-card shadow my-2">
      <div class="text-right mr-1 mt-1">
        <i v-if="(note.creator.id === account.id) && (!bug.closed)" class="mdi mdi-trash-can" role="button" title="Delete Note" @click="deleteNote(note.id)"></i>
      </div>
      <div class="p-2 p-lg-3">
        <img :src="note.creator.picture" alt="Profile Picture" class="rounded-circle mr-3 mb-2" width="30">
        <span>{{ note.creator.name }}</span>
        <p>{{ note.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { noteService } from '../services/NoteService'

export default {
  props: { note: { type: Object, required: true }, bug: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteNote(id) {
        try {
          if (await Notification.confirmAction()) {
            await noteService.deleteNote(id)
          }
        } catch (error) {
          Notification.toast(error)
        }
      }
    }
  }
}
</script>

<style>
.note-card {
  background-color: #f5f4f4;
}

</style>
