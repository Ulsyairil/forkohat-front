export const actions = {
  async carousels(context, value, option) {
    try {
      const response = await this.$axios.get('/carousels', value)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async news(context, value, option) {
    try {
      const response = await this.$axios.post('/news', value)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async faqs(context, value, option) {
    try {
      const response = await this.$axios.post('/faqs', value)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
