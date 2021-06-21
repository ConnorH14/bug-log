<template>
  <div class="row pb-1 pt-1">
    <div class="col-lg-4 bug-title" @click="routeToBug(bug.id)" role="button" title="go to bug">
      {{ bug.title }}
    </div>
    <div class="col-lg-3 bug-name">
      {{ bug.creator.name }}
    </div>
    <div v-if="bug.closed" class="col-lg-2 closed-bug">
      <p>Closed</p>
    </div>
    <div v-else class="col-lg-2 open-bug">
      <p>Open</p>
    </div>
    <div class="col-lg-3 bug-date">
      {{ new Date(bug.updatedAt).toLocaleDateString() }}
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: { bug: { type: Object, required: true } },
  setup() {
    const router = useRouter()
    return {
      routeToBug(id) {
        router.push({ path: '/bug/' + id })
      }
    }
  }
}
</script>

<style>
.closed-bug {
  border-left:3px solid #f11616;
}

.open-bug {
  border-left:3px solid #0ed10e;
}

.bug-title:hover {
  border-left: 3px solid #5c5c5c;
}

</style>
