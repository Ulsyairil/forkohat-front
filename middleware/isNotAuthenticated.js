export default async function (ctx) {
  const userLoggedIn = ctx.$auth.loggedIn

  if (!userLoggedIn) {
    return ctx.redirect('/login')
  }
}
