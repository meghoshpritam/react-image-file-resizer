/* eslint-disable no-param-reassign */

class Resizer {
  static changeHeightWidth(height, maxHeight, width, maxWidth, minWidth, minHeight, keepAspectRatio) {
    if (keepAspectRatio) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
      if (minWidth && width < minWidth) {
        height = Math.round((height * minWidth) / width);
        width = minWidth;
      }
      if (minHeight && height < minHeight) {
        width = Math.round((width * minHeight) / height);
        height = minHeight;
      }
    } else {
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (height > maxHeight) {
        height = maxHeight;
      }
      if (minWidth && width < minWidth) {
        width = minWidth;
      }
      if (minHeight && height < minHeight) {
        height = minHeight;
      }
    }

    return { height, width };
  }

  static resizeAndRotateImage(
    image,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    compressFormat = 'jpeg',
    quality = 100,
    rotation = 0,
    keepAspectRatio = true,
  ) {
    const qualityDecimal = quality / 100;
    const canvas = document.createElement('canvas');

    let { width } = image;
    let { height } = image;

    const newHeightWidth = this.changeHeightWidth(
      height,
      maxHeight,
      width,
      maxWidth,
      minWidth,
      minHeight,
      keepAspectRatio,
    );
    if (rotation && (rotation === 90 || rotation === 270)) {
      canvas.width = newHeightWidth.height;
      canvas.height = newHeightWidth.width;
    } else {
      canvas.width = newHeightWidth.width;
      canvas.height = newHeightWidth.height;
    }

    width = newHeightWidth.width;
    height = newHeightWidth.height;

    if (maxHeight) {
      canvas.height = maxHeight;
      height = maxHeight;
    }
    if (maxWidth) {
      canvas.width = maxWidth;
      width = maxWidth;
    }

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    if (ctx.imageSmoothingEnabled && ctx.imageSmoothingQuality) {
      ctx.imageSmoothingQuality = 'high';
    }

    if (rotation) {
      ctx.rotate((rotation * Math.PI) / 180);
      if (rotation === 90) {
        ctx.translate(0, -canvas.width);
      } else if (rotation === 180) {
        ctx.translate(-canvas.width, -canvas.height);
      } else if (rotation === 270) {
        ctx.translate(-canvas.height, 0);
      } else if (rotation === 0 || rotation === 360) {
        ctx.translate(0, 0);
      }
    }

    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
  }

  static b64toByteArrays(b64Data) {
    const sliceSize = 512;

    const byteCharacters = atob(b64Data.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    return byteArrays;
  }

  static b64toBlob(b64Data, contentType) {
    const byteArrays = this.b64toByteArrays(b64Data);
    const blob = new Blob(byteArrays, { type: contentType, lastModified: new Date() });
    return blob;
  }

  static b64toFile(b64Data, fileName, contentType) {
    const byteArrays = this.b64toByteArrays(b64Data);
    const file = new File(byteArrays, fileName, { type: contentType, lastModified: new Date() });
    return file;
  }

  static createResizedImage(
    file,
    maxWidth,
    maxHeight,
    compressFormat,
    quality,
    rotation,
    responseUriFunc,
    outputType = 'base64',
    minWidth = null,
    minHeight = null,
    keepAspectRatio = true,
  ) {
    const reader = new FileReader();
    if (file) {
      if (file.type && !file.type.includes('image')) {
        throw Error('File Is NOT Image!');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = function () {
            const resizedDataUrl = Resizer.resizeAndRotateImage(
              image,
              maxWidth,
              maxHeight,
              minWidth,
              minHeight,
              compressFormat,
              quality,
              rotation,
              keepAspectRatio,
            );
            const contentType = `image/${compressFormat}`;
            switch (outputType) {
              case 'blob': {
                const blob = Resizer.b64toBlob(resizedDataUrl, contentType);
                responseUriFunc(blob);
                break;
              }
              case 'base64': {
                responseUriFunc(resizedDataUrl);
                break;
              }
              case 'file': {
                const fileName = file.name;
                const fileNameWithoutFormat = fileName.toString().replace(/(png|jpeg|jpg|webp)$/i, '');
                const newFileName = fileNameWithoutFormat.concat(compressFormat.toString());
                const newFile = Resizer.b64toFile(resizedDataUrl, newFileName, contentType);
                responseUriFunc(newFile);
                break;
              }
              default: {
                responseUriFunc(resizedDataUrl);
              }
            }
          };
        };
        reader.onerror = (error) => {
          throw Error(error);
        };
      }
    } else {
      throw Error('File Not Found!');
    }
  }
}
export default {
  imageFileResizer: ({
    file,
    maxWidth,
    maxHeight,
    compressFormat,
    quality,
    rotation,
    keepAspectRatio,
    responseUriFunc,
    outputType,
    minWidth,
    minHeight,
  }) =>
    Resizer.createResizedImage(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      responseUriFunc,
      outputType,
      minWidth,
      minHeight,
      keepAspectRatio,
    ),
};
