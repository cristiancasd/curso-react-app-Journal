import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';
//import { getEnvVariables } from '../../src/helpers/getEnvVariables';


//const {VITE_API_CLOUD_NAME, VITE_API_API_KEY, VITE_API_API_SECRET}=getEnvVariables();


cloudinary.config({
    cloud_name: process.env.VITE_API_CLOUD_NAME,
    api_key: process.env.VITE_API_API_KEY,
    api_secret: process.env.VITE_API_API_SECRET,
    secure: true
});


describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');
        //console.log('********* ',url)


        
       // console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        //.log('imageId',imageId)
        const cloudResp = await cloudinary.api.delete_resources([ 'journal-react/' + imageId ], {
           resource_type: 'image'
        });
        //console.log('cloudResp ****', { cloudResp })
    });

    test('debe de retornar object error.message', async() => {
        const file = new File([], 'foto.jpg');
        const response = await fileUpload( file );
        expect(response.error).toBeDefined();
        expect(response.error.message).toBeDefined();
    });
});