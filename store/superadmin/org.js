export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'asc',
    search: '',
    data: [],
  },
  data: null,
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
  exportData(state, value) {
    state.data = value
  },
  exportGet(state, value) {
    state.get = value
  },
}

export const actions = {
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/orgs', {
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

  async all(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/orgs')

      if (response.status == 200) {
        context.commit('exportData', response.data)
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
      const response = await this.$axios.get('/superadmin/org', {
        params: { id: value },
      })

      if (response.status == 200) {
        context.commit('exportGet', response.data)
      }

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
        user_id: value.user_id,
        parent_id: value.parent_id,
        area: value.area,
        office: value.office,
        position_name: value.position_name,
      }

      const response = await this.$axios.post('/superadmin/org', payload)
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
        user_id: value.user_id,
        parent_id: value.parent_id,
        area: value.area,
        office: value.office,
        position_name: value.position_name,
      }
      const response = await this.$axios.put('/superadmin/org', payload)
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
      const response = await this.$axios.delete('/superadmin/org', {
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
