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
  author: IUserProfile;
};

export type IFaq = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};
export type ICategory = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type IFeedbackData = {
  id: string;
  userId: string;
  serviceId: string;
  comments: string;
  suggestion: string;
  createdAt: string;
  updatedAt: string;
  user: IUserProfile;
  service: IService;
};

export type IAddToCartData = {
  id: string;
  userId: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  user: IUserProfile;
  service: IService;
};
export type IBookingData = {
  id: string;
  userId: string;
  serviceId: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  user: IUserProfile;
  service: IService;
};
