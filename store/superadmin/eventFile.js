export const state = () => ({
  pagination: {
    event_id: null,
    page: 1,
    limit: 10,
    order: 'desc',
    data: [],
  },
  get: null,
})

export const mutations = {
  exportPaginationEventId(state, value) {
    state.pagination.event_id = value
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
  exportPaginationData(state, value) {
    state.pagination.data = value
  },
  exportGetData(state, value) {
    state.get = value
  },
}

export const actions = {
  /**
   *
   * @param {Vuex} context
   * @param {any} value
   * @returns
   */
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/event/file', {
        event_id: value.event_id,
        page: value.page,
        limit: value.limit,
        order: value.order,
      })

      if (response.status == 200) {
        if (value.event_id) {
          context.commit('exportPaginationEventId', value.event_id)
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

  /**
   *
   * @param {Vuex} context
   * @param {any} value
   * @returns
   */
  async get(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/event/file', {
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

  /**
   *
   * @param {Vuex} context
   * @param {any} value
   * @returns
   */
  async create(context, value) {
    try {
      const payload = new FormData()
      payload.append('event_id', value.event_id)
      payload.append('title', value.title)
      payload.append('file', value.file)

      const response = await this.$axios.post(
        '/superadmin/event/file/add',
        payload
      )
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  /**
   *
   * @param {Vuex} context
   * @param {any} value
   * @returns
   */
  async edit(context, value) {
    try {
      const payload = new FormData()
      payload.append('id', value.id)
      payload.append('event_id', value.event_id)
      payload.append('title', value.title)
      payload.append('file', value.file)
      const response = await this.$axios.put('/superadmin/event/file', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  /**
   *
   * @param {Vuex} context
   * @param {any} value
   * @returns
   */
  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/superadmin/event/file', {
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
