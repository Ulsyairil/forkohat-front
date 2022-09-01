export const state = () => ({
  gallery: null,
})

export const mutations = {
  updateGallery(state, value) {
    state.gallery = value
  },
}

export const actions = {
  async list(context, value) {
    try {
      const response = await this.$axios.post('/admin/galleries', value , option)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
