module.exports = {
  title: 'JSK Github watcher',
  auth: {
    client_id: process.env['JSK_GITHUB_WATCHER_CLIENT_ID'],
    client_secret: process.env['JSK_GITHUB_WATCHER_CLIENT_SECRET']
  },
  orgs: ['jsk-ros-pkg', 'euslisp', 'start-jsk']
};
