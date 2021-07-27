export const loadEnv = (env: string) => {
  const v = process.env[env];
  console.log(v);
  if (!v) {
    throw new Error(`${env} not set`);
  }
  return v;
};
