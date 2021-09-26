import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('animal', {
      params: params
    })

    if (res.data.status) {
      commit('setAnimals', res.data.animals)
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
    const res = await axios.get('animal/' + id)

    if (res.data.status) {
      commit('setAction', 'update')
      commit('setDialog', true)
      commit('setAnimal', res.data.animal)
    } else {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setAnimal', {})
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

    const res = await axios.post('animal', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setAnimal', {})
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

    const res = await axios.put('animal', params)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setAnimal', {})
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

    const res = await axios.delete('animal/' + id)

    if (res.data.status) {
      commit('setAction', '')
      commit('setDialog', false)
      commit('setAnimal', {})
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}

export const getWeighings = async ({ commit }, id) => {
  try {
    const res = await axios.get('animal/weighing/' + id)

    if (res.data.status) {
      commit('setAnimalWeighings', res.data.weighings)
    } else {
      commit('setAnimalWeighings', [])
    }

    return res.data
  } catch (err) {
    return err
  }
}
