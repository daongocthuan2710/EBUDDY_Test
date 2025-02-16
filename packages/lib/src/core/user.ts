export interface TUser {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: string;
}
