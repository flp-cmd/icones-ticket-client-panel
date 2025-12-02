import Compressor from 'compressorjs';

export const compressImage = async (file: File): Promise<File> => {
  return new Promise(function (resolve, reject) {
    new Compressor(file, {
      quality: 0.8,
      success(result) {
        resolve(result as File);
      },
      error() {
        reject(file);
      },
    });
  });
};
