import { supabase } from 'shared/build';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import { BASE64_REG_EXP } from '@config';
import isUrlHttp from 'is-url-http';

class Storage {
  constructor() {
    this.uploadBase64Img = this.uploadBase64Img.bind(this);
    this.delete = this.delete.bind(this);
    this.validateBase64 = this.validateBase64.bind(this);
  }

  validateBase64(data: string) {
    const isValid = Boolean(data.match(BASE64_REG_EXP));

    if (!isValid) {
      throw {
        message: 'invalid image data',
      };
    }
  }

  async delete(fileUrl: string) {
    const regex = /\/([\w.-]+)\?/;
    const matches = regex.exec(fileUrl);
    const filename = matches && matches[1];

    const { error, data } = await supabase.storage.from('bucket-name').remove([`public/${filename}`]);

    if (error) {
      throw error;
    }

    return data;
  }

  async uploadMultipleBase64Img(base64Strings: string[]) {
    const uploadedFilesUrl: string[] = [];

    try {
      for (const base64 of base64Strings) {
        if (isUrlHttp(base64)) {
          uploadedFilesUrl.push(base64);
          continue;
        }

        this.validateBase64(base64);

        const uploadedFileUrl = await this.uploadBase64Img(base64);

        uploadedFilesUrl.push(uploadedFileUrl);
      }
      return uploadedFilesUrl;
    } catch (error) {
      for (const uploadedFileUrl of uploadedFilesUrl) {
        await this.delete(uploadedFileUrl);
      }
      throw error;
    }
  }

  async uploadBase64Img(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/webp' });
    const filename = uuid();

    const { error } = await supabase.storage.from('hero-images').upload(`public/${filename}`, blob, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw error;
    }

    const { data: fileUrlData } = supabase.storage.from('hero-images').getPublicUrl(`public/${filename}`);

    return fileUrlData.publicUrl;
  }
}

const storageService = new Storage();

export { storageService };
