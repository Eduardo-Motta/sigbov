import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('farm', {
      params: params
    })

    if (res.data.status) {
      commit('setFarms', res.data.farms)
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}

export const findById = async ({ commit }, id) => {
  try {
    const res = await axios.get('farm/' + id)

    if (res.data.status) {
      commit('setAction', 'update')
      commit('setDialog', true)
      commit('setFarm', res.data.farm)
    } else {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setFarm', {})
    }

    return res.data
  } catch (err) {
    commit('setDialog', false)

    return err
  }
}

export const create = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.post('farm', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setFarm', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}

export const update = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.put('farm', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setFarm', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}

export const remove = async ({ commit }, id) => {
  try {
    loading(true)

    const res = await axios.delete('farm/' + id)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setFarm', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}
