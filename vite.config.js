import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
let _resolve=(dir)=>{
  return path.resolve(dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy:{
      '/api':{
        target:'http://chst.vip',
        rewrite:path=>path.replace(/^\/api/,"")
      }
    }
  },
  resolve:{
    alias:{
      "@":_resolve('src')
    }
  }
})
