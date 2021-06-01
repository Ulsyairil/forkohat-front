export default async function ({ app, redirect, route, $config }) {
  const token = app.$auth.$storage.getCookie('token')

  console.log(token)
  console.log(route)

  if (token != undefined) {
    const config = {
      headers: {
        Authorization: `${token.type} ${token.token}`,
      },
    }

    let payload = {
      refresh: false,
      refresh_token: token.refreshToken,
    }

    let url = `${$config.baseurl}/user/token`

    let res = await app.$axios.$post(url, payload, config)
    console.log(res)

    if (!res) {
      payload.refresh = true
      res = await app.$axios.$post(url, payload, config)
      console.log(res)

      if (res) {
        app.$auth.$storage.removeCookie('token', true)
        app.$auth.$storage.setCookie('token', res.token, true)
      } else {
        app.$auth.$storage.removeCookie('token', true)
        app.$auth.$storage.removeCookie('user', true)
        return redirect('/login')
      }
    }

    if (route.path == '/login') {
      return redirect('/dashboard')
    }
  }

  if (token == undefined) {
    if (route.path != '/login') {
      return redirect('/login')
    }
  }
}
