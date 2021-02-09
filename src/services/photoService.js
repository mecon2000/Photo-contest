import { httpService } from './httpService';
const entity = 'photo'
export const photoService = {
    uploadPhotos(photos) {
        // {photoBlob, }photos[0]
        try {
            httpService.post(entity, { delitDis: 'now', name: photos });
        } catch (error) {
            console.error(error)
        }
    }
}