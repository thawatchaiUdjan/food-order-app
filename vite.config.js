import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const excludeFolderPlugin = () => {
  return {
    name: 'exclude-folder',
    transform(src, id) {
      if (id.includes('src/assets/foods')) {
        return ''
      }
      return src
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    excludeFolderPlugin(),
  ],
})