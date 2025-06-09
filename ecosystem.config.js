module.exports = {
  apps: [
    {
      name: 'ozmap-integration',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
    },
  ],
};
