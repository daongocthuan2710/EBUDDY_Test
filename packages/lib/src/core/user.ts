export interface TUser {
  id: string;
  email: string;
  password?: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: string;
}
