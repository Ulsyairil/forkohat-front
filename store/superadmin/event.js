export const state = () => ({
  pagination: {
    arrangement_id: null,
    page: 1,
    limit: 10,
    order: 'desc',
    trash: false,
    showed: 'public', // public or member
    search: '',
    data: [],
  },
  get: null,
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
}

export const actions = {
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/superadmin/events', {
        arrangement_id: value.arrangement_id,
        page: value.page,
        limit: value.limit,
        order: value.order,
        trash: value.trash,
        showed: value.showed,
        search: value.search,
      })

      if (response.status == 200) {
        if (value.arrangement_id) {
          context.commit('exportPaginationArrangementId', value.arrangement_id)
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
        if (value.trash) {
          context.commit('exportPaginationTrash', value.trash)
        }
        if (value.showed) {
          context.commit('exportPaginationShowed', value.showed)
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
      const response = await this.$axios.get('/superadmin/event', {
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
      payload.append('arrangement_id', value.arrangement_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('registration_date', value.registration_date)
      payload.append('end_registration_date', value.end_registration_date)
      payload.append('registration_url', value.registration_url)
      payload.append('expired_date', value.expired_date)
      payload.append('showed', value.showed)
      payload.append('image', value.image)

      const response = await this.$axios.post('/superadmin/event', payload)
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
      payload.append('arrangement_id', value.arrangement_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('registration_date', value.registration_date)
      payload.append('end_registration_date', value.end_registration_date)
      payload.append('registration_url', value.registration_url)
      payload.append('expired_date', value.expired_date)
      payload.append('showed', value.showed)
      payload.append('image', value.image)
      const response = await this.$axios.put('/superadmin/event', payload)
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
      const response = await this.$axios.put('/superadmin/event/dump', {
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
      const response = await this.$axios.put('/superadmin/event/restore', {
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
      const response = await this.$axios.delete('/superadmin/event', {
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
