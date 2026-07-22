export function getModuleUrl(moduleName: string, token: string | null): string {
  const tokenQuery = token ? `?token=${encodeURIComponent(token)}` : '';
  if (moduleName === 'employee') return `/employee-dashboard${tokenQuery}`;
  if (moduleName === 'tech') return `/techlead-dashboard${tokenQuery}`;
  if (moduleName === 'helpdesk') return `/help-desk${tokenQuery}`;
  return `/${moduleName}${tokenQuery}`;
}
