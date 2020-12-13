interface ITheMovieDB {
  apiKey: string;
}

export default {
  apiKey: process.env.API_KEY || '',
} as ITheMovieDB;
