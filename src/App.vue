<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  sockets: {
    connect: function () {
      const room = localStorage.getItem('sigbov:room')

      if (room) {
        this.$socket.emit('room', `room${room}`)
      }
    }
  }
}
</script>
