export const fileUpload = async(file) => {
    
    if(!file) throw new Error ('no tenemos ningún archivo a subir')
    
    const cloudUrl='https://api.cloudinary.com/v1_1/cristiancasd/upload'
    const formData=new FormData();
    formData.append('upload_preset','journal-app')
    formData.append('file',file);

    try{
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body:formData
        });

        //console.log('respuesta ', resp)

        if (!resp.ok) throw new Error('No se pudo subir la imagen ')
        const cloudResp= await resp.json();
        return cloudResp.secure_url;


    }catch(error){
        //console.log(error);
        const msg= {error:{message:error.message}}
        console.log(msg)
        return(msg)
        //throw new Error(error.message);
    }
}
