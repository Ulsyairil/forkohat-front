export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    trash: false,
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
  exportPaginationTrash(state, value) {
    state.pagination.trash = value
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
      const response = await this.$axios.post('/admin/news', {
        page: value.page,
        limit: value.limit,
        order: value.order,
        trash: value.trash,
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
        if (value.trash) {
          context.commit('exportPaginationTrash', value.trash)
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
      const response = await this.$axios.get('/admin/news', {
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
      const payload = new FormData()
      payload.append('title', value.title)
      payload.append('content', value.content)
      payload.append('image', value.image)

      const response = await this.$axios.post('/admin/news/add', payload)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  async edit(context, value) {
    try {
      const payload = new FormData()
      payload.append('id', value.id)
      payload.append('title', value.title)
      payload.append('content', value.content)
      payload.append('image', value.image)
      const response = await this.$axios.put('/admin/news', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  async delete(context, value) {
    try {
      const response = await this.$axios.put('/admin/news/dump', {
        id: value,
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  async restore(context, value) {
    try {
      const response = await this.$axios.put('/admin/news/restore', {
        id: value,
      })
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
      const response = await this.$axios.delete('/admin/news', {
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
