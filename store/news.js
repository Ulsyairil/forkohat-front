export const actions = {
  
    async get(context, value) {
      try {
        const response = await this.$axios.get('/news', {
          params: { id: value },
        })
  
        console.log(response)
        return response
      } catch (error) {
        console.log(error)
        console.log(error.response)
        return error.response
      }
    },
  }