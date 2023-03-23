
export const getEnvVariables = () => {
    //import.meta.env;
    return {
        VITE_API_CLOUD_NAME: process.env.VITE_API_CLOUD_NAME,
        VITE_API_API_KEY: process.env.VITE_API_API_KEY,
        VITE_API_API_SECRET: process.env.VITE_API_API_SECRET,

        VITE_FIREBASE_APIKEY: import.meta.env.VITE_FIREBASE_APIKEY,
        VITE_FIREBASE_AUTHDOMAIN: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
        VITE_FIREBASE_PROJECTID: import.meta.env.VITE_FIREBASE_PROJECTID,
        VITE_FIREBASE_STORAGEBUCKET: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
        VITE_FIREBASE_MESSAGINGSENDERID: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
        VITE_FIREBASE_APPID: import.meta.env.VITE_FIREBASE_APPID,

       // VITE_API_CLOUD_NAME: import.meta.env.VITE_API_CLOUD_NAME,
        //VITE_API_API_KEY: import.meta.env.VITE_API_API_KEY,
        //VITE_API_API_SECRET: import.meta.env.VITE_API_API_SECRET,


        //VITE_API_URL_NEST_DEV: import.meta.env.VITE_API_URL_NEST_DEV,
        //VITE_API_URL_NODE_DEV: import.meta.env.VITE_API_URL_NODE_DEV,
        //VITE_API_STAGE: import.meta.env.VITE_API_STAGE,

        //...import.meta.env
    }
} 

