import { createStore } from 'vuex'
import AuthModule from './modules/auth/index.js'

const store = createStore({
  modules: {
    auth: AuthModule
  }
})

export default store
