export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    data: [],
  },
  all: [],
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
  exportPaginationData(state, value) {
    state.pagination.data = value
  },
  exportAll(state, value) {
    state.all = value
  },
}

export const actions = {
  /**
   *
   * @param {Vuex} context
   * @param {page, limit, order} value
   * @returns
   */
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/programs', {
        page: value.page,
        limit: value.limit,
        order: value.order,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationPage', value.page)
        context.commit('exportPaginationLimit', value.limit)
        context.commit('exportPaginationOrder', value.order)
        context.commit('exportPaginationData', response.data)
      }
      return response
    } catch (error) {
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
  async all(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/programs')

      console.log(response)

      if (response.status == 200) {
        context.commit('exportAll', response.data)
      }

      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  /**
   *
   * @param {Vuex} context
   * @param {id} value
   * @returns
   */
  async get(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/program', {
        params: { id: value },
      })

      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  /**
   *
   * @param {Vuex} context
   * @param {rule} value
   * @returns
   */
  async create(context, value) {
    try {
      const payload = new FormData()
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('image', value.image)
      const response = await this.$axios.post('/superadmin/program', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  /**
   *
   * @param {Vuex} context
   * @param {id, rule} value
   * @returns
   */
  async edit(context, value) {
    try {
      const payload = new FormData()
      payload.append('program_id', value.id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('image', value.image)
      const response = await this.$axios.put('/superadmin/program', payload)
      console.log(payload)
      return response
    } catch (error) {
      console.log(error)
      console.log(error.response)
      return error.response
    }
  },

  /**
   *
   * @param {*} context
   * @param {id: Number} value
   * @returns
   */
  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/superadmin/program', {
        data: { id: value },
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
