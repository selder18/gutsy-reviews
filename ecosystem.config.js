module.exports = {
  apps: [{
    name: 'gutsyreviews',
    script: 'server/index.js'
    
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-58-86-122.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/GutsyReviews.pem',
      ref: 'origin/master',
      repo: 'git@github.com:microdynamicservices/gutsy-reviews',
      path: '/home/ubuntu/gutsyreviews',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}