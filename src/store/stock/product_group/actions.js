import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('stock/product-group', {
      params: params
    })

    if (res.data.status) {
      commit('setProductsGroup', res.data.products_group)
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
    const res = await axios.get('stock/product-group/' + id)

    if (res.data.status) {
      commit('setAction', 'update')
      commit('setDialog', true)
      commit('setProductGroup', res.data.product_group)
    } else {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setProductGroup', {})
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

    const res = await axios.post('stock/product-group', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setProductGroup', {})
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

    const res = await axios.put('stock/product-group', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setProductGroup', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}
