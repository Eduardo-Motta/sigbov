import axios from 'boot/axios'

export const getCities = async ({ commit }, state) => {
  try {
    const res = await axios.get('address/city/' + state)

    if (res.data.status) {
      commit('setCities', res.data.cities)
    }

    return res.data
  } catch (err) {
    return err
  }
}

export const getStates = async ({ commit }) => {
  try {
    const res = await axios.get('address/state')

    if (res.data.status) {
      commit('setStates', res.data.states)
    }

    return res.data
  } catch (err) {
    return err
  }
}
