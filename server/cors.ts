import cors from 'cors';

export const corsConfig = cors({
  methods: ['GET', 'POST', 'DELETE'],
  origin: 'http://localhost:8081',
});
