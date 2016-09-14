#!/usr/bin/env node
'use strict';

const pkg = require('./package.json');
const packman = require('./src');
const program = require('commander');

console.log(`- unity-packman ${pkg.version}`.bold);

program
  .command('init')
  .description('create packman.json')
  .action(function () {
    packman.init().catch(console.error);
  });

program
  .command('gitignore')
  .description('ensure .gitignore')
  .action(function () {
    packman.gitIgnore().catch(console.error);
  });

program
  .version(pkg.version)
  .command('install [repo...]')
  .description('install dependencies')
  .action(function (repos) {
    if (!repos || repos.length === 0)
      return packman.installAll().catch(console.error);
    return packman.install(repos).catch(console.error);
  });

program.parse(process.argv);

if (process.argv.slice(2).length === 0)
  program.help();
