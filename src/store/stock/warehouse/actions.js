import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('stock/warehouse', {
      params: params
    })

    if (res.data.status) {
      commit('setWarehouses', res.data.warehouses)
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
    const res = await axios.get('stock/warehouse/' + id)

    if (res.data.status) {
      commit('setAction', 'update')
      commit('setDialog', true)
      commit('setWarehouse', res.data.warehouse)
    } else {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setWarehouse', {})
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

    const res = await axios.post('stock/warehouse', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setWarehouse', {})
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

    const res = await axios.put('stock/warehouse', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setWarehouse', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}
