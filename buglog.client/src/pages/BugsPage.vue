<template>
  <div class="container-fluid background">
    <div class="bug-container my-lg-5 shadow">
      <div class="row">
        <div class="col-lg-12">
          <div class="mr-lg-5 ml-lg-5 mt-3 mb-3 mt-lg-5 mb-lg-5 px-lg-5">
            <div class="row mb-4 table-headers">
              <div class="col-lg-4">
                <h1 class="table-title">
                  Bug
                </h1>
              </div>
              <div class="col-lg-3">
                <h1 class="table-title">
                  Reported By
                </h1>
              </div>
              <div class="col-lg-2">
                <h1 class="table-title" role="button" @click="sortStatus">
                  Status <i id="status-icon" class="mdi mdi-arrow-right-drop-circle"></i>
                </h1>
              </div>
              <div class="col-lg-3">
                <h1 class="table-title" role="button" @click="sortDate">
                  Date Modified <i id="date-icon" class="mdi mdi-arrow-right-drop-circle"></i>
                </h1>
              </div>
            </div>
            <Bug v-for="(bug, index) in bugs" :key="bug.id" :bug="bug" :class="'style-' + ((index % 2))" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { bugService } from '../services/BugService'
export default {
  setup() {
    watchEffect(async() => {
      try {
        await bugService.getAllBugs()
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
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
      },
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
  }
}
</script>

<style scoped lang="scss">
.background {
  background-color: var(--dark);
  width: 100vw;
}

.bug-container {
  border: 5px solid #1f1d1d;
  outline: 2px solid #b9b8b8;
  background-color: #e4dcdc;
}

.table-title {
  font-size: 1.25vw;
  user-select: none;
}

.style-0 {
  background-color: #eeeaea;
}

.style-1 {
  background-color: #dad6d6;
}

@media screen and (min-width: 1300px) {
  .bug-container {
    margin-right: 200px;
    margin-left: 200px;
  }
}

@media screen and (max-width: 991px) {
  .table-headers {
    display: none;
  }
  .bug-container {
    border: none;
    outline: none;
    background-color: var(--dark);
  }
}
</style>
