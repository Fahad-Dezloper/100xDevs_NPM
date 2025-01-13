#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
  .name('create-my-structure')
  .description('Generate a custom folder structure')
  .argument('<project-name>', 'Name of the project folder')
  .action((projectName) => {
    const targetPath = path.join(process.cwd(), projectName); // Target directory
    const templatePath = path.join(__dirname, 'template');   // Path to the template

    try {
      // Copy the template to the target location with a filter to exclude unwanted files
      fs.copySync(templatePath, targetPath, {
        dereference: true,
        filter: (src) => {
          const basename = path.basename(src);
          return !basename.includes('node_modules') && !basename.includes('.pnpm');
        },
      });
      console.log(`Project '${projectName}' created successfully at ${targetPath}`);
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  });

program.parse(process.argv);
