import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('lot', {
      params: params
    })

    if (res.data.status) {
      commit('setLots', res.data.lots)
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
    const res = await axios.get('lot/' + id)

    if (res.data.status) {
      commit('setAction', 'update')
      commit('setDialog', true)
      commit('setLot', res.data.lot)
    } else {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setLot', {})
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

    const res = await axios.post('lot', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setLot', {})
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

    const res = await axios.put('lot', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setLot', {})
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

    const res = await axios.delete('lot/' + id)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setLot', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}
