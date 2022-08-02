import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadCleanNotes = async(uid='') => {
    if(!uid) throw new Error('El UID del usuario no existe');
    const collectionRef = collection(FirebaseDB,`${uid}/journal/notes` )
    const docs = await getDocs(collectionRef)
    
    const notes=[];

    docs.forEach(async docActual =>{
        console.log(docActual.data());
        (docActual.data().title!=='') 
            ? notes.push({id:docActual.id, ...docActual.data()})
            : await deleteDoc(doc(FirebaseDB,`${uid}/journal/notes/${docActual.id}`));  
    })
    return notes
}
