function required(name: string) {
  const env = import.meta.env[name];
  console.log(env);
  if (!env) throw new Error(`${name} is not defined in env file`);
  return env;
}

export const env = {
  apiUrl: required("VITE_API_URL")
};
