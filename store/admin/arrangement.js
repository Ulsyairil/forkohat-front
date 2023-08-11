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
  async pagination(context, value) {
    try {
      const response = await this.$axios.post('/admin/arrangements', {
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

  async all(context, value) {
    try {
      const response = await this.$axios.get('/admin/arrangements', {
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

  async get(context, value) {
    try {
      const response = await this.$axios.get('/admin/arrangement', {
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
      const payload = new FormData()
      payload.append('program_id', value.program_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('image', value.image)
      const response = await this.$axios.post('/admin/arrangement', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async edit(context, value) {
    try {
      const payload = new FormData()
      payload.append('id', value.id)
      payload.append('program_id', value.program_id)
      payload.append('title', value.title)
      payload.append('description', value.description)
      payload.append('image', value.image)
      const response = await this.$axios.put('/admin/arrangement', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/admin/arrangement', {
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
