import Vue from 'vue'
import crypto from 'crypto'

const encrypt = (password, type) => {
  return crypto.createHash(type).update(password, 'utf8').digest('hex')
}

Vue.prototype.$crypto = encrypt
