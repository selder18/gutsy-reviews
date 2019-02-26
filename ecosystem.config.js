module.exports = {
  apps: [{
    name: 'gutsyreviews',
    script: 'server/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-191-155-155.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/GutsyReviews.pem',
      ref: 'origin/master',
      repo: 'git@github.com:microdynamicservices/gutsy-reviews',
      path: '/home/ubuntu/gutsyreviews',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production && npm run react-prod'
    }
  }
};