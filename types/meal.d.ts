export interface Meal {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: {
    name: string;
    size: number;
    key: string;
    lastModified: number;
    serverData: {
      uploadedBy: string;
    };
    url: string;
    appUrl: string;
    customId: null;
    type: string;
    fileHash: string;
  }[];
  portionSize: string;
  preparationTime: null;
  allergens: string[];
  notes: string;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  side: boolean;
}
