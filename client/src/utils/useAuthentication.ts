type useAuthenticationValue = [
  boolean,
  (args: { vaultAddress: string; privateKey: string }) => void,
  { vaultAddress: string; privateKey: string },
  () => void
];

const useAuthentication = (): useAuthenticationValue => {
  const isAuthenticated =
    !!localStorage.getItem("vaultAddress") &&
    !!localStorage.getItem("privateKey");
  const setAuthentication = (args: {
    vaultAddress: string;
    privateKey: string;
  }): void => {
    localStorage.setItem("vaultAddress", args.vaultAddress);
    localStorage.setItem("privateKey", args.privateKey);
  };
  const authentication = {
    vaultAddress: localStorage.getItem("vaultAddress") || "",
    privateKey: localStorage.getItem("privateKey") || "",
  };
  const clearAuthentication = () => {
    localStorage.removeItem("vaultAddress");
    localStorage.removeItem("privateKey");
  };
  return [
    isAuthenticated,
    setAuthentication,
    authentication,
    clearAuthentication,
  ];
};

export default useAuthentication;
