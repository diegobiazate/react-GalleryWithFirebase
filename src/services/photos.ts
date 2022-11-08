import { Photo } from "../types/photo";
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function getAll(){
    let list: Photo[] = [];

    const imagesFolder = ref(storage, 'images');

    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items){
        let photoUrl = await getDownloadURL(photoList.items[i]);

        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        })
    }

    return list;
}

export async function uploadPhoto(file: File){
    if(['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)){
        let nameFile = uuidv4();
        let newFile = ref(storage, `images/${nameFile}`)

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo;

    } else {
        return new Error('Tipo de arquivo não permitido!');
    }
}