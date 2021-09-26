import axios from 'boot/axios'

export const getOptions = async ({ commit }, optionId) => {
  try {
    const res = await axios.get('option/' + optionId)

    return res.data
  } catch (err) {
    return err
  }
}
