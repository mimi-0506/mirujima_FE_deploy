const PWA_STORAGE_KEY = 'mirujima-app-installed';

export const checkInstalledInStorage = () => {
  return localStorage.getItem(PWA_STORAGE_KEY) === 'true';
};

export const setInstallAppInStorage = () => {
  localStorage.setItem(PWA_STORAGE_KEY, 'true');
};

export const removeInstalledInStorage = () => {
  localStorage.removeItem(PWA_STORAGE_KEY);
};
