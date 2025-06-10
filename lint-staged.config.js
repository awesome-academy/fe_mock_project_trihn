module.exports = {
  "**/fe/**/*.{ts,tsx,js}": (filenames) => [
    `pnpm eslint --fix ${filenames.join(" ")}`,
  ],

  "**/fe/**/*.{md,json}": (filenames) =>
    `pnpm prettier --write ${filenames.join(" ")}`,
};
