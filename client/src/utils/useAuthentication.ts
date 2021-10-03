type useAuthenticationValue = [
  boolean,
  (args: { vaultAddress: string; privateKey: string; network: string }) => void,
  { vaultAddress: string; privateKey: string; network: string },
  () => void
];

const useAuthentication = (): useAuthenticationValue => {
  const isAuthenticated =
    !!localStorage.getItem("vaultAddress") &&
    !!localStorage.getItem("privateKey") &&
    !!localStorage.getItem("network");

  const setAuthentication = (args: {
    vaultAddress: string;
    privateKey: string;
    network: string;
  }): void => {
    localStorage.setItem("vaultAddress", args.vaultAddress);
    localStorage.setItem("privateKey", args.privateKey);
    localStorage.setItem("network", args.network);
  };
  const authentication = {
    vaultAddress: localStorage.getItem("vaultAddress") || "",
    privateKey: localStorage.getItem("privateKey") || "",
    network: localStorage.getItem("network") || "",
  };
  const clearAuthentication = () => {
    localStorage.removeItem("vaultAddress");
    localStorage.removeItem("privateKey");
    localStorage.removeItem("network");
  };
  return [
    isAuthenticated,
    setAuthentication,
    authentication,
    clearAuthentication,
  ];
};

export default useAuthentication;
