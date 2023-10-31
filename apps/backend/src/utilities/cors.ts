
const whitelist = ['http://localhost:4200', 'http://localhost:3333'];

export const corsConfig = {
  origin: (origin: any, callback: any): void => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'))
    }
  }
};
