<template>
  <div v-if="bug" class="container-fluid background">
    <div class="bug-container p-1 m-1 m-lg-5 p-lg-5">
      <div class="row">
        <div class="col-lg-6">
          <button class="btn btn-danger" v-if="(bug.creator.id === account.id) && !bug.closed" @click="closeBug(bug.id)" title="Close Bug">
            Close Bug
          </button>
          <span v-if="bug.closed" class="bug-closed">Bug Closed</span>
        </div>
        <div class="col-lg-6 text-right py-3">
          <span>Reported by: </span>
          <img :src="bug.creator.picture" alt="profile image" width="50" class="rounded-circle mr-2">
          <span>{{ bug.creator.name }}</span>
          <h4 v-if="(!bug.closed) && (bug.creator.id === account.id)">
            <i class="mdi mdi-pen"
               role="button"
               data-toggle="modal"
               data-target="#editBugModal"
               title="edit bug"
            ></i>
          </h4>
        </div>
        <div class="col-lg-12">
          <h1>{{ bug.title }}</h1>
        </div>
        <div class="col-lg-12 mt-5 py-4">
          <div class="bug-description p-2 shadow">
            <p>{{ bug.description }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <h2>Notes:</h2>
        </div>
        <Note v-for="note in notes" :key="note.id" :note="note" :bug="bug" />
      </div>
    </div>
  </div>
  <div v-if="bug">
    <div class="add-note-btn"
         role="button"
         title="Add Note"
         type="button"
         data-toggle="modal"
         data-target="#noteModal"
         v-if="account.id && !bug.closed"
    >
      <h2>
        <i class="mdi mdi-clipboard-plus"></i>
      </h2>
    </div>
  </div>
  <NoteModal />
  <EditBugModal />
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      if (route.params.id) {
        try {
          await bugService.getBugById(route.params.id)
          await noteService.getNoteFromBug(route.params.id)
        } catch (error) {
          Notification.toast(error)
        }
      }
    })
    return {
      bug: computed(() => AppState.bugDetails),
      notes: computed(() => AppState.bugNotes),
      account: computed(() => AppState.account),
      async closeBug(id) {
        try {
          if (await Notification.confirmAction()) {
            await bugService.closeBug(id)
          }
        } catch (error) {
          Notification.toast(error)
        }
      }

    }
  }
}
</script>

<style scoped>
.background {
  background-color: var(--dark);
  width: 100vw;
}

.bug-container {
  border: 5px solid #1f1d1d;
  outline: 2px solid #b9b8b8;
  background-color: #e4dcdc;
}

.bug-description {
  background-color: #f3ecec;
  border: 2px solid #03032b;
  border-radius: 5px;
}

.bug-closed {
  background-color: #500d0d;
  padding: 5px;
  border-radius: 5px;
  color: #eeebeb;
}

.add-note-btn {
  padding-top: 5px;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 10;
  background-color: #0cbe7abb;
  border-radius: 50%;
  color: var(--primary);
  text-align: center;
  -webkit-text-stroke: 1px black;
}

</style>
