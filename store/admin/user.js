export const state = () => ({
  pagination: {
    page: 1,
    limit: 10,
    order: 'desc',
    trash: false,
    search: '',
    data: '',
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
  exportPaginationTrash(state, value) {
    state.pagination.trash = value
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
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/admin/users', {
        page: value.page,
        limit: value.limit,
        order: value.order,
        trash: value.trash,
        search: value.search,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationPage', value.page)
        context.commit('exportPaginationLimit', value.limit)
        context.commit('exportPaginationOrder', value.order)
        context.commit('exportPaginationTrash', value.trash)
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
      const response = await this.$axios.get('/admin/users')

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

  async get(context, value) {
    try {
      const response = await this.$axios.get('/admin/user', {
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
      const payload = {
        rule_id: value.rule_id,
        fullname: value.fullname,
        username: value.username,
        email: value.email,
        password: value.password,
      }
      const response = await this.$axios.post('/admin/user', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async edit(context, value) {
    try {
      const payload = {
        user_id: value.user_id,
        rule_id: value.rule_id,
        fullname: value.fullname,
        username: value.username,
        email: value.email,
      }
      const response = await this.$axios.put('/admin/user', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async editPassword(context, value) {
    try {
      const payload = {
        user_id: value.user_id,
        password: value.password,
        confirm_password: value.confirm_password,
      }
      const response = await this.$axios.put('/admin/user/password', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async delete(context, value) {
    try {
      const response = await this.$axios.put('/admin/user/dump', {
        id: value,
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async restore(context, value) {
    try {
      const response = await this.$axios.put('/admin/user/restore', {
        id: value,
      })
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/admin/user', {
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
