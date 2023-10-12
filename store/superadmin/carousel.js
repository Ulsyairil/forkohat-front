export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    search: '',
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
  exportPaginationSearch(state, value) {
    state.pagination.search = value
  },
  exportPaginationData(state, value) {
    state.pagination.data = value
  },
}

export const actions = {
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/carousels', {
        page: value.page,
        limit: value.limit,
        order: value.order,
        search: value.search,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationPage', value.page)
        context.commit('exportPaginationLimit', value.limit)
        context.commit('exportPaginationOrder', value.order)
        context.commit('exportPaginationSearch', value.search)
        context.commit('exportPaginationData', response.data)
      }
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async get(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/carousel', {
        params: { id: value },
      })

      console.log(response)
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
      data.append('description', value.description)
      data.append('showed', value.showed)
      data.append('image', value.image)
      const response = await this.$axios.post('/superadmin/carousel', data)
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
      data.append('description', value.description)
      data.append('showed', value.showed)
      data.append('image', value.image)
      const response = await this.$axios.put('/superadmin/carousel', data)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/superadmin/carousel', {
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
