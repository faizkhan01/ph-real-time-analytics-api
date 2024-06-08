export const serverConfig = {
  host: process.env.HOST || 'localhost',
  port: (process.env.PORT as unknown as number) || 9000,
  globalPrefix: 'api',
};
