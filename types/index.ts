import { type ClientUploadedFileData } from 'uploadthing/types';

import { CartItem } from './cart';
import { Meal } from './meal';

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {
  customProperty?: string;
}

declare global {
  interface User {
    id: string;
    username: string;
    email: string;
  }
}

export type { CartItem, Meal };
