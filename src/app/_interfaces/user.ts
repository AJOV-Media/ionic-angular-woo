export default interface User {
  id: number;
  username: string;
  user_display_name: string;
  user_nice_name: string;
  user_email: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}
