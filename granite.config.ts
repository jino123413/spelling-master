import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'spelling-master',
  web: {
    host: '0.0.0.0',
    port: 3004,
    commands: {
      dev: 'rsbuild dev --host',
      build: 'rsbuild build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '맞춤법 달인',
    icon: 'https://raw.githubusercontent.com/jino123413/app-logos/master/spelling-master.png',
    primaryColor: '#6366F1',
    bridgeColorMode: 'basic',
  },
  webViewProps: {
    type: 'partner',
  },
});
