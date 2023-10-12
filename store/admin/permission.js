export const state = () => ({
  pagination: {
    rule_id: '',
    page: 1,
    limit: 10,
    order: 'desc',
    data: [],
  },
  all: [],
})

export const mutations = {
  exportPaginationRuleId(state, value) {
    state.pagination.rule_id = value
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
      const response = await this.$axios.post('/admin/rule/permissions', {
        page: value.page,
        limit: value.limit,
        order: value.order,
      })

      console.log(response)

      if (response.status == 200) {
        context.commit('exportPaginationRuleId', value.rule_id)
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
      const response = await this.$axios.get('/admin/rule/permissions', {
        params: { rule_id: value },
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

  async create(context, value) {
    try {
      const payload = {
        rule_id: value.rule_id,
        program_id: value.program_id,
        arrangement_id: value.arrangement_id,
      }
      const response = await this.$axios.post('/admin/rule/permission', payload)
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
        id: value.id,
        rule_id: value.rule_id,
        program_id: value.program_id,
        arrangement_id: value.arrangement_id,
      }
      const response = await this.$axios.put('/admin/rule/permission', payload)
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  },

  async destroy(context, value) {
    try {
      const response = await this.$axios.delete('/admin/rule/permission', {
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
