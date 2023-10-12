module.exports = {
  apps: [
    {
      name: 'forkohat-front',
      exec_mode: 'cluster',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      instances: '1',
      wait_ready: true,
      autorestart: true,
      max_restarts: 1,
      watch: true,
      error_file: 'logs/forkohat-front/err.log',
      out_file: 'logs/forkohat-front/out.log',
      log_file: 'logs/forkohat-front/combined.log',
      time: true,
    },
  ],
}
