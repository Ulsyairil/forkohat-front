export const state = () => ({
  darkMode: false,
  defaultDrawer: false,
  dashboardDrawer: true,
  miniVariant: false,
})

export const mutations = {
  updateDarkMode(state, value) {
    state.darkMode = value
  },
  updatDefaulteDrawer(state, value) {
    state.defaultDrawer = value
  },
  updateDashboardDrawer(state, value) {
    state.dashboardDrawer = value
  },
  updateMiniVariant(state, value) {
    state.miniVariant = value
  },
}

export const actions = {
  changeDarkMode(context, value) {
    context.commit('updateDarkMode', value)
  },
  changeDefaultDrawer(context, value) {
    context.commit('updateDefaultDrawer', value)
  },
  changeDashboardDrawer(context, value) {
    context.commit('updateDashboardDrawer', value)
  },
  changeMiniVariant(context, value) {
    context.commit('updateMiniVariant', value)
  },
}
