import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment"
export default defineConfig({
  plugins: [react()
    ,//EnvironmentPlugin("all")
    EnvironmentPlugin([
      'REACT_APP_FIREBASE_APIKEY',
      'REACT_APP_FIREBASE_AUTHDOMAIN',
      'REACT_APP_FIREBASE_PROJECTID',
      'REACT_APP_FIREBASE_STORAGEBUCKET',
      'REACT_APP_FIREBASE_MESSAGINGSENDERID',
      'REACT_APP_FIREBASE_APPID',
    ])
  ]
})

/*
export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    //process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
      // To access env vars here use process.env.TEST_VAR
      plugins: [react()
        ,//EnvironmentPlugin("all")
        EnvironmentPlugin([
          'REACT_APP_FIREBASE_APIKEY',
          'REACT_APP_FIREBASE_AUTHDOMAIN',
          'REACT_APP_FIREBASE_PROJECTID',
          'REACT_APP_FIREBASE_STORAGEBUCKET',
          'REACT_APP_FIREBASE_MESSAGINGSENDERID',
          'REACT_APP_FIREBASE_APPID',
        ])
      ]
    });
}
*/
/*
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()
    ,//EnvironmentPlugin("all")
    EnvironmentPlugin([
      'VITE_FIREBASE_AUTHDOMAIN',
  'VITE_FIREBASE_PROJECTID',
  'VITE_FIREBASE_STORAGEBUCKET',
  'VITE_FIREBASE_MESSAGINGSENDERID',
  'VITE_FIREBASE_APPID',
    ])
  ]
})*/


