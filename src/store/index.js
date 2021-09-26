import Vue from 'vue'
import Vuex from 'vuex'

import address from './address'
import animal from './animal'
import app from './app'
import breed from './breed'
import auth from './auth'
import farm from './farm'
import home from './home'
import lot from './lot'
import option from './option'
import pasture from './pasture'
import stockProductGroup from './stock/product_group'
import stockWarehouse from './stock/warehouse'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      address,
      animal,
      app,
      auth,
      breed,
      farm,
      home,
      lot,
      option,
      pasture,
      stockProductGroup,
      stockWarehouse
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
