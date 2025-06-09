module.exports = {
  '**/*.(ts|tsx|js)': (filenames) => [
    `pnpm eslint --fix ${filenames.join(' ')}`,
  ],

  '**/*.(md|json)': (filenames) =>
    `pnpm prettier --write ${filenames.join(' ')}`,
};
