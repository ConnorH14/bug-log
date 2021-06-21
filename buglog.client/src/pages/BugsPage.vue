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
  <div class="add-bug-btn"
       role="button"
       title="Add Bug"
       type="button"
       data-toggle="modal"
       data-target="#bugModal"
       v-if="account.id"
  >
    <h2><i class="mdi mdi-alert-plus"></i></h2>
  </div>
  <BugModal />
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
        AppState.dateSortToggle = true
        bugService.sortDate()
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      sortStatus() {
        bugService.sortStatus()
      },
      sortDate() {
        bugService.sortDate()
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

.add-bug-btn {
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
