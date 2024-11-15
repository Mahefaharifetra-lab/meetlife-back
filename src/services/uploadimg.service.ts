import { existsSync, promises as fsPromises, writeFileSync } from 'fs';
import path from 'path';

export const generateString = (length: number) => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getBase64FileExtension = (str: string): string => {
  const mymeType = str.split(';')[0].split(':')[1];
  switch (mymeType) {
    // Audio
    case 'audio/aac':
      return 'aac';
    case 'audio/midi':
      return 'midi';
    case 'audio/ogg':
      return 'ogg';
    case 'audio/x-wav':
      return 'wav';
    case 'audio/webm':
      return 'weba';
    case 'audio/3gpp':
      return '3gp';
    case 'audio/3gpp2':
      return '3g2';
    case 'audio/mpeg':
      return 'mp3';
    // Image
    case 'image/bmp':
      return 'bmp';
    case 'image/gif':
      return 'gif';
    case 'image/x-icon':
      return 'ico';
    case 'image/jpeg':
      return 'jpeg';
    case 'image/png':
      return 'png';
    case 'image/svg+xml':
      return 'svg';
    case 'image/tiff':
      return 'tiff';
    case 'image/webp':
      return 'webp';
    case 'image/webp':
      return 'webp';
    // Video
    case 'video/x-msvideo':
      return 'avi';
    case 'video/mpeg':
      return 'mpeg';
    case 'video/ogg':
      return 'ogv';
    case 'video/webm':
      return 'webm';
    case 'video/3gpp':
      return '3gp';
    case 'video/3gpp2':
      return '3g2';
    case 'video/mp4':
      return 'mp4';
  }
  return '';
};

export const uploadBase64File = async ({
  dir,
  base64,
  fileName,
}: {
  dir: string;
  base64: string;
  fileName?: string;
}): Promise<string> => {
  const tmpFilename = fileName
    ? fileName
    : `${generateString(25)}.${getBase64FileExtension(base64)}`;
  const filePath = `data/img/${dir}`;
  // const filePath = path.join(__dirname, '../../public/files', `${dir}`);
  // Convertir les données Base64 en tampon (Buffer)
  const buffer = Buffer.from(base64, 'base64');

  try {
    // Créer le répertoire s'il n'existe pas
    if (!existsSync(filePath))
      await fsPromises.mkdir(filePath, { recursive: true });
    var base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    writeFileSync(`${filePath}/${tmpFilename}`, base64Data, {
      encoding: 'base64',
      flag: 'w',
    });
    return `img/${dir}/${tmpFilename}`;
  } catch (error) {
    throw error;
  }
};
