import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const Axios = axios.create({
  baseURL: '/api',
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('sigbov:token'),
    room: 'room' + localStorage.getItem('sigbov:room')
  }
})

function getColor (type) {
  let color = ''

  switch (type) {
    case 'error':
      color = 'negative'
      break

    case 'info':
      color = 'info'
      break

    case 'success':
      color = 'positive'
      break

    case 'warning':
      color = 'warning'
      break

    default:
      color = 'blue-grey-8'
      break
  }

  return color
}

Axios.interceptors.response.use((res) => {
  const { type, value } = res.data

  if (['error', 'info', 'success', 'warning'].indexOf(type) !== -1) {
    window.notify = Notify.create({
      html: true,
      message: String(value.message).replace('\n', '<br>'),
      position: 'top',
      badgeColor: 'white',
      badgeTextColor: 'secondary',
      timeout: 1500,
      type: getColor(type)
    })
  }

  return res
}, (err) => {
  if (!err.response) {
    window.notify = Notify.create({
      html: true,
      message: 'Erro de comunicação com o servidor.<br>Por favor, atualize a página e tente novamente.',
      type: 'negative'
    })
  } else if (err.response.status === 401) {
    localStorage.removeItem('sigbov:token')
    localStorage.removeItem('sigbov:room')

    this.$router.push('/login')
  } else if (err.response.status === 403) {
    window.notify = Notify.create({
      html: true,
      message: 'Usuário sem permissão.',
      type: 'negative'
    })
  } else if (err.response.status === 404) {
    window.notify = Notify.create({
      html: true,
      message: 'Requisição não encontrada.',
      type: 'negative'
    })
  }

  return Promise.reject(err)
})

Vue.prototype.$axios = Axios

export default Axios
