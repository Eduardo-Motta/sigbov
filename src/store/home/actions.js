import axios from 'boot/axios'
import loading from 'boot/loading'

export const find = async ({ commit }, params) => {
  try {
    loading(true)

    const res = await axios.get('home', {
      params: params
    })

    if (res.data.status) {
      commit('setFarm', res.data.farm)
      commit('setAddress', res.data.address)
      commit('setPasture', res.data.pasture)
      commit('setAnimal', res.data.animal)
      commit('setAnimalBreed', res.data.animal_breed)
      commit('setStockAlert', res.data.stock_alert)
    }

    return res.data
  } catch (err) {
    return err
  } finally {
    loading(false)
  }
}
