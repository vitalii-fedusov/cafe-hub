import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material", "@mui/system"],
    exclude: []
  },
//   resolve: {
//     alias: {
//       '@mui/styled-engine': '@mui/styled-engine-sc',
//     },
// },
});