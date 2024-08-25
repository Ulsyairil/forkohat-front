module.exports = {
  apps: [
    {
      name: 'forkohat-web',
      exec_mode: 'cluster',
      instances: 1,
      script: 'node_modules/nuxt/bin/nuxt.js',
      env_production: {
        args: 'start',
      },
      env_development: {
        script: '--watch',
      },
      wait_ready: true,
      autorestart: true,
      max_restarts: 1,
      watch: false,
      time: true,
      error_file: '.logs/err.log',
      out_file: '.logs/out.log',
      merge_logs: false,
      log_type: "json",
    },
  ],
}
