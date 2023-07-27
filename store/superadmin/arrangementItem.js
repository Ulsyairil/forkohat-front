export const state = () => ({
  pagination: {
    arrangement_id: null,
    page: 1,
    limit: 10,
    order: 'desc',
    trash: false,
    showed: 'public',
    search: '',
    data: [],
  },
  all: [],
})

export const mutations = {
  exportPaginationArrangementId(state, value) {
    state.pagination.arrangement_id = value
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
  exportPaginationTrash(state, value) {
    state.pagination.trash = value
  },
  exportPaginationShowed(state, value) {
    state.pagination.showed = value
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
   * @param {any} value
   * @returns
   */
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/arrangement/items', {
        arrangement_id: value.arrangement_id,
        page: value.page,
        limit: value.limit,
        order: value.order,
        trash: value.trash,
        showed: value.showed,
        search: value.search,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationArrangementId', value.arrangement_id)
        context.commit('exportPaginationPage', value.page)
        context.commit('exportPaginationLimit', value.limit)
        context.commit('exportPaginationOrder', value.order)
        context.commit('exportPaginationTrash', value.trash)
        context.commit('exportPaginationShowed', value.showed)
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
  async get(context, value) {
    try {
      const response = await this.$axios.get('/superadmin/arrangement/item', {
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
   * @param {any} value
   * @returns
   */
  async create(context, value) {
    try {
      const payload = new FormData()
      payload.append('arrangement_id', value.arrangement_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('file', value.file)
      payload.append('showed', value.showed)
      const response = await this.$axios.post(
        '/superadmin/arrangement/item',
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
   * @param {any} value
   * @returns
   */
  async edit(context, value) {
    try {
      const payload = new FormData()
      payload.append('id', value.id)
      payload.append('arrangement_id', value.arrangement_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('file', value.file)
      payload.append('showed', value.showed)
      const response = await this.$axios.put(
        '/superadmin/arrangement/item',
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
   * @param {any} value
   */
  async delete(context, value) {
    try {
      const response = await this.$axios.put(
        '/superadmin/arrangement/item/dump',
        {
          id: value,
        }
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
   * @param {any} value
   * @returns
   */
  async restore(context, value) {
    try {
      const response = await this.$axios.put(
        '/superadmin/arrangement/item/restore',
        {
          id: value,
        }
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
   * @param {any} value
   * @returns
   */
  async destroy(context, value) {
    try {
      const response = await this.$axios.delete(
        '/superadmin/arrangement/item',
        {
          data: { id: value },
        }
      )
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },
}
