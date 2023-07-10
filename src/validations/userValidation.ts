import { z } from 'zod';

export const userSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  address: z.string().min(5).max(100),
  zip_code: z.string().max(7), // DE => 5, UK => (7 + space), US => 5
  city: z.string().min(1).max(85), // check README.md for the shortest and longest place name
  country: z.string().min(2).max(32), // LEN(Saint Vincent and the Grenadines) => 32
});
