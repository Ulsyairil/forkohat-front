export const state = () => ({
  pagination: {
    program_id: '',
    page: 1,
    limit: 10,
    order: 'desc',
    data: [],
  },
  all: [],
})

export const mutations = {
  exportPaginationProgramId(state, value) {
    state.pagination.program_id = value
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
      const response = await this.$axios.post('/superadmin/arrangements', {
        program_id: value.program_id,
        page: value.page,
        limit: value.limit,
        order: value.order,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationProgramId', value.program_id)
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
      const response = await this.$axios.get('/superadmin/arrangements', {
        params: { program_id: value },
      })

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
      const response = await this.$axios.get('/superadmin/arrangement', {
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
      payload.append('program_id', value.program_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('image', value.image)
      const response = await this.$axios.post(
        '/superadmin/arrangement',
        payload
      )
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
      payload.append('id', value.id)
      payload.append('program_id', value.program_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('image', value.image)
      const response = await this.$axios.put('/superadmin/arrangement', data)
      console.log(response)
      return response
    } catch (error) {
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
      const response = await this.$axios.delete('/superadmin/arrangement', {
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
