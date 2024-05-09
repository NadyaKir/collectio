export const shouldShowContainer = (pathname) => {
  const excludedPaths = ["/login", "/register"];

  return !excludedPaths.includes(pathname);
};
