<template>
  <q-layout
    :class="this.$q.screen.xs || this.$q.screen.sm ? 'bg-white' : 'bg-grey-1'"
  >

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutAuth'
}
</script>
