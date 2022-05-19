export const state = () => ({
  account: null,
})

export const mutations = {
  updateAccount(state, value) {
    state.account = value
  },
}

export const actions = {
  async login(context, value) {
    try {
      const response = await this.$axios.post('/login', value)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
