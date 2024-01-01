import { Image } from 'react-native-compressor';

export const ResizeImage = async(uri) => {
    const result = await Image.compress(uri);
    return result;
}
