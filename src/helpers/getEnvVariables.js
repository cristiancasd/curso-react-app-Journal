
export const getEnvVariables = () => {
    //import.meta.env;
    return {
        VITE_API_CLOUD_NAME: process.env.VITE_API_CLOUD_NAME,
        VITE_API_API_KEY: process.env.VITE_API_API_KEY,
        VITE_API_API_SECRET: process.env.VITE_API_API_SECRET,

       // VITE_API_CLOUD_NAME: import.meta.env.VITE_API_CLOUD_NAME,
        //VITE_API_API_KEY: import.meta.env.VITE_API_API_KEY,
        //VITE_API_API_SECRET: import.meta.env.VITE_API_API_SECRET,


        //VITE_API_URL_NEST_DEV: import.meta.env.VITE_API_URL_NEST_DEV,
        //VITE_API_URL_NODE_DEV: import.meta.env.VITE_API_URL_NODE_DEV,
        //VITE_API_STAGE: import.meta.env.VITE_API_STAGE,

        //...import.meta.env
    }
} 

