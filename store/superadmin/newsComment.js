export const state = () => ({
  pagination: {
    news_id: null,
    page: 1,
    limit: 10,
    order: 'desc',
    search: '',
    data: [],
  },
  get: null,
})

export const mutations = {
  exportPaginationNewsId(state, value) {
    state.pagination.news_id = value
  },
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
      const response = await this.$axios.post('/superadmin/news/comments', {
        news_id: value.news_id,
        page: value.page,
        limit: value.limit,
        order: value.order,
        search: value.search,
      })

      if (response.status == 200) {
        if (value.news_id) {
          context.commit('exportPaginationNewsId', value.news_id)
        }
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
      const response = await this.$axios.get('/superadmin/news/comment', {
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
        news_id: value.news_id,
        comment: value.comment,
      }
      const response = await this.$axios.post(
        '/superadmin/news/comment',
        payload
      )
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
        news_id: value.news_id,
        comment: value.comment,
      }
      const response = await this.$axios.put(
        '/superadmin/news/comment',
        payload
      )
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
      const response = await this.$axios.delete('/superadmin/news/comment', {
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
