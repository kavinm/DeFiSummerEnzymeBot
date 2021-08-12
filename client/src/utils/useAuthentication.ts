type useAuthenticationValue = [boolean, (arg: string) => void, () => void];

const useAuthentication = (): useAuthenticationValue => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const setAuthentication = (arg: string): void => {
    localStorage.setItem("accessToken", arg);
  };
  const clearAuthentication = () => {
    localStorage.removeItem("accessToken");
  };
  return [isAuthenticated, setAuthentication, clearAuthentication];
};

export default useAuthentication;
