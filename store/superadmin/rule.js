export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    search: '',
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
  exportPaginationSearch(state, value) {
    state.pagination.search = value
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
   * @param {page, limit, order, search} value
   * @returns
   */
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/rules', {
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

  /**
   *
   * @param {Vuex} context
   * @param {any} value
   * @returns
   */
  async all(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/rules')

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
      const response = await this.$axios.get('/superadmin/rule', {
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
      const payload = {
        rule: value.rule,
        is_superadmin: value.is_superadmin,
        is_admin: value.is_admin,
        is_member: value.is_member,
        is_guest: value.is_guest,
      }
      const response = await this.$axios.post('/superadmin/rule', payload)
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
      const payload = {
        id: value.id,
        rule: value.rule,
        is_superadmin: value.is_superadmin,
        is_admin: value.is_admin,
        is_member: value.is_member,
        is_guest: value.is_guest,
      }
      const response = await this.$axios.put('/superadmin/rule', payload)
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
      const response = await this.$axios.delete('/superadmin/rule', {
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
