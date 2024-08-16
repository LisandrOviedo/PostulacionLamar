module.exports = {
  apps: [
    {
      name: "tthh",
      script: "index.js",
      watch: false,
      ignore_watch: ["node_modules", "public"],
      restart_delay: 1000,
      time: true,
      max_memory_restart: "500M",
    },
  ],
};
