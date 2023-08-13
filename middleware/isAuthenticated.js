export default async function (ctx) {
  const userLoggedIn = ctx.$auth.loggedIn
  if (userLoggedIn) {
    const userDetail = await ctx.$auth.user

    console.log(userDetail)

    if (userDetail.Rule.is_superadmin) {
      return ctx.redirect('/dashboard/superadmin')
    } else if (userDetail.Rule.is_admin) {
      return ctx.redirect('/dashboard/admin')
    } else if (userDetail.Rule.is_member) {
      return ctx.redirect('/dashboard/member')
    } else if (userDetail.Rule.is_guest) {
      //
    } else {
      return
    }
  } else {
    return ctx.redirect('/login')
  }
}
