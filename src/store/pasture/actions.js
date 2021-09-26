import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('pasture', {
      params: params
    })

    if (res.data.status) {
      commit('setPastures', res.data.pastures)
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
    const res = await axios.get('pasture/' + id)

    if (res.data.status) {
      commit('setAction', 'update')
      commit('setDialog', true)
      commit('setPasture', res.data.pasture)
    } else {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setPasture', {})
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

    const res = await axios.post('pasture', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setPasture', {})
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

    const res = await axios.put('pasture', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setPasture', {})
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

    const res = await axios.delete('pasture/' + id)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setPasture', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}
