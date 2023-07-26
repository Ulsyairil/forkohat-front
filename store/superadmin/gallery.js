export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    showed: 'public' || 'private' || 'member',
    data: {},
  },
})

export const mutations = {
  exportPaginationPage(state, value) {
    state.pagination.page = value
  },
  exportPaginationLimit(state, value) {
    state.pagination.limit = value
  },
  exportPaginationOrder(state, value) {
    state.pagination.order = value
  },
  exportPaginationShowed(state, value) {
    state.pagination.showed = value
  },
  exportPaginationData(state, value) {
    state.pagination.data = value
  },
}

export const actions = {
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/galleries', {
        page: value.page,
        limit: value.limit,
        order: value.order,
        showed: value.showed,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationPage', value.page)
        context.commit('exportPaginationLimit', value.limit)
        context.commit('exportPaginationOrder', value.order)
        context.commit('exportPaginationShowed', value.showed)
        context.commit('exportPaginationData', response.data)
      }
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async create(context, value) {
    try {
      const data = new FormData()
      data.append('title', value.title)
      data.append('showed', value.showed)
      data.append('image', value.image)
      const response = await this.$axios.post('/superadmin/gallery', data)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async edit(context, value) {
    try {
      const data = new FormData()
      data.append('id', value.id)
      data.append('title', value.title)
      data.append('showed', value.showed)
      data.append('image', value.image)
      const response = await this.$axios.put('/superadmin/gallery', data)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/superadmin/gallery', {
        data: {
          id: value,
        },
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
