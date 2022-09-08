export const state = () => ({
  gallery: null,
})

export const mutations = {
  updateGallery(state, value) {
    state.gallery = value
  },
}

export const actions = {
  async list(context, value, option) {
    const token = this.$cookies.get('forkohat-session')
    const config = {
      headers: {
        common: {
          Authorization: `${token.type} ${token.token}`,
        }
      },
    }

    try {
      const response = await this.$axios.post('/admin/galleries', value, config)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
