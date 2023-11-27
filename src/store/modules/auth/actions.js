export default {
  async login (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },
  async signup (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },
  async auth (context, payload) {
    const mode = payload.mode
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJ8yyUt8n3aNGCEqwsXjyXoUPaYbkEIgY'

    if (mode === 'signup') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ8yyUt8n3aNGCEqwsXjyXoUPaYbkEIgY'
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })
    const responseData = await response.json()

    if (!response.ok) {
      console.log('Failed', responseData)
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
      throw error
    }

    console.log('success', responseData)
    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn
    localStorage.setItem('token', responseData.idToken)

    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    context.commit('setUserId', {
      token: responseData.idToken,
      userId: responseData.localId
    })
  },
  tryLogin (context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    if (token && userId) {
      context.commit('setUserId', {
        token: token,
        userId: userId
      })
    }
  },
  logout (context) {
    context.commit('setUserId', {
      token: null,
      userId: null
    })

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')
  }
}
