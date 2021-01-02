import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    isAuthenticated: false
  },
  mutations: {
    setUserProfile(state, val, authState) {
      state.isAuthenticated = !state.isAuthenticated
      state.userProfile = val
    }
  },
  actions: {
    async register({ dispatch}, form) {
      // sign up user
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user profile object
      await fb.usersCollection.doc(user.uid).set({
        name: form.name
      })

      // fetch user profile
      dispatch('fetchUserProfile', user)
    },
    async login({ dispatch }, form) {
      // sign in user
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile
      commit('setUserProfile', userProfile.data())

      // change route or redirect
      router.push('/dashboard')
    },
    async logout({ commit }) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/')
    }
  },
  modules: {
  }
})
