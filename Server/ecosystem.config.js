module.exports = {
  apps: [
    {
      name: "tthh",
      script: "index.js",
      watch: ".",
      ignore_watch: ["node_modules"],
      restart_delay: 1000,
      time: true,
      max_memory_restart: "500M",
    },
  ],
};
