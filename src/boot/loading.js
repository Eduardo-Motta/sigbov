import Vue from 'vue'
import { Loading } from 'quasar'

const loading = (status) => {
  if (status === false) {
    setTimeout(() => {
      Loading.hide()
    }, 150)
  } else {
    Loading.show({
      spinnerColor: 'primary'
    })
  }
}

Vue.prototype.$loading = loading

export default loading
