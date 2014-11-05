module.exports = {
  title: 'JSK Github watcher',
  auth: {
    client_id: process.env['JSK_GITHUB_WATCHER_CLIENT_ID'],
    client_secret: process.env['JSK_GITHUB_WATCHER_CLIENT_SECRET']
  },
  cookie: {
    pass: process.env['JSK_GITHUB_WATCHER_COOKIE_PASS'],
    secret_hash: process.env['JSK_GITHUB_WATCHER_SECRET_HASH']
  },
  orgs: ['jsk-ros-pkg', 'euslisp', 'start-jsk']
};
