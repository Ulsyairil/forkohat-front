export default async function (ctx) {
  const userLoggedIn = ctx.$auth.loggedIn
  if (!userLoggedIn) {
    return ctx.redirect('/login')
  }

  if (userLoggedIn) {
    const userDetail = await ctx.$auth.user

    if (ctx.$auth.strategy.token.status().expired()) {
      return ctx.redirect('/login')
    }

    if (userDetail.Rule.is_superadmin) {
      return ctx.redirect('/dashboard/superadmin')
    } else if (userDetail.Rule.is_admin) {
      return ctx.redirect('/dashboard/admin')
    } else if (userDetail.Rule.is_member) {
      return
    } else if (userDetail.Rule.is_guest) {
      //
    } else {
      return ctx.redirect('/login')
    }
  }
}
