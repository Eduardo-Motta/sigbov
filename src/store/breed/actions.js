import axios from 'boot/axios'

export const getBreeds = async ({ commit }) => {
  try {
    const res = await axios.get('breed')

    return res.data
  } catch (err) {
    return err
  }
}
