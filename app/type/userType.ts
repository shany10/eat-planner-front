export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  restaurantId: number | null;
  restaurantName: string | null;
}