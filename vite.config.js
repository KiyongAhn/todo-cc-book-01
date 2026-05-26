import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages는 https://<user>.github.io/todo-cc-book-01/ 하위에서 서빙됨
export default defineConfig({
  base: '/todo-cc-book-01/',
  plugins: [react()],
});
