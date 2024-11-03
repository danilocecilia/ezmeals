import { type ClientUploadedFileData } from 'uploadthing/types';

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {
  customProperty?: string;
}

declare global {
  interface User {
    id: string;
    username: string;
    email: string;
  }

  // Other globally used types or interfaces
}
