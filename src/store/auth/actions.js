import axios from 'boot/axios'
import Hashids from 'hashids'

const hashids = new Hashids()

export const signin = async ({ commit }, body) => {
  try {
    const res = await axios.post('auth/signin', body)

    if (res.data.status) {
      localStorage.setItem('sigbov:email', body.email)
      localStorage.setItem('sigbov:token', res.data.value.token)
      localStorage.setItem('sigbov:room', hashids.encode(res.data.value.account))

      commit('farm', res.data.value.farm)
      commit('name', res.data.value.name)

      axios.defaults.headers.authorization = 'Bearer ' + res.data.value.token
    }
    return res.data
  } catch (err) {
    return err
  }
}
