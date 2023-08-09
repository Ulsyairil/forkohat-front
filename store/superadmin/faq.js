export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    search: '',
    data: [],
  },
  get: null,
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
      const response = await this.$axios.post('/superadmin/faqs', {
        page: value.page,
        limit: value.limit,
        order: value.order,
        search: value.search,
      })

      if (response.status == 200) {
        if (value.page) {
          context.commit('exportPaginationPage', value.page)
        }
        if (value.limit) {
          context.commit('exportPaginationLimit', value.limit)
        }
        if (value.order) {
          context.commit('exportPaginationOrder', value.order)
        }
        if (value.search) {
          context.commit('exportPaginationSearch', value.search)
        }

        context.commit('exportPaginationData', response.data)
      }

      console.log(response.data)

      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  async get(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/faq', {
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

  async create(context, value) {
    try {
      const payload = {
        title: value.title,
        description: value.description,
      }

      const response = await this.$axios.post('/superadmin/faq', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  async edit(context, value) {
    try {
      const payload = {
        id: value.id,
        title: value.title,
        description: value.description,
      }
      const response = await this.$axios.put('/superadmin/faq', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/superadmin/faq', {
        data: { id: value },
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
