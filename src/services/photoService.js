import { httpService } from './httpService';
const entity = 'photo'
export const photoService = {
    uploadPhotos(photos) {
        // {photoBlob, }photos[0]
        try {
            return httpService.post(entity, photos);
        } catch (error) {
            console.error(error)
        }
    }
}