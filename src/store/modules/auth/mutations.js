export default {
  setUserId (state, payload) {
    state.token = payload.token
    state.userId = payload.userId
  }
}
