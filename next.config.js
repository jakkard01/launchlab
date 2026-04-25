/** @type {import('next').NextConfig | ((phase: string) => import('next').NextConfig)} */
module.exports = (_phase, { defaultConfig }) => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    ...defaultConfig,
    // Keep dev artifacts separate so a running dev server cannot corrupt
    // the production build output for this isolated PBIA worktree.
    distDir: isDev ? '.next-dev' : '.next',
  };
};
