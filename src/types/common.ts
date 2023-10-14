export interface IMeta {
  size: number;
  page: number;
  total: number;
  totalPage: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IUserProfile = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  contactNo: string;
  address: string;
  profileImg: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export type IService = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type IBlogPost = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string;
    email: string;
    password: string;
    role: string;
    contactNo: string;
    address: string;
    profileImg: string;
    createdAt: string;
    updatedAt: string;
  };
};



