const fs = require('fs')

const { setupHandler } = require('./setup')
const { createIdentityHandler, listIdentityHandler } = require('./identities')
const { ROOT_DIR, IDENTITIES_DIR } = require('./constants')

const prompts = require('prompts')

const initDirs = () => {
  for (dirs of [ROOT_DIR, IDENTITIES_DIR]) {
    if (!fs.existsSync(IDENTITIES_DIR)) fs.mkdirSync(IDENTITIES_DIR)
  }
}

initDirs()

require('yargs')
  .usage('A forum using zeroknowledge authentication')
  .command('setup', 'Download verification keys etc ...', {}, setupHandler)
  .command('identity', 'Manage your identities', yargs => {
    yargs
      .command('create', 'Create a new identity', createIdentityHandler)
      .command('list', 'List existing identities', listIdentityHandler)
      .command('register', 'List existing identities', () => {
        console.info('register an ID')
      })
      .demandCommand()
  })
  .command('view', 'View latest posts')
  .command('post', 'Post a new article')
  .demandCommand().argv

// Setup

// Identity

// Build: Download verification keys etc ...

// Get posts ...

// Post a new article
