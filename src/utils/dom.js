
export const getDocumentScrollHeight = () => Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

export const getDocumentScrollWidth = () => Math.max(
  document.body.scrollWidth, document.documentElement.scrollWidth,
  document.body.offsetWidth, document.documentElement.offsetWidth,
  document.body.clientWidth, document.documentElement.clientWidth
);

export const getDocumentMinScrollWidth = () => Math.min(
  document.body.scrollWidth, document.documentElement.scrollWidth,
  document.body.offsetWidth, document.documentElement.offsetWidth,
  document.body.clientWidth, document.documentElement.clientWidth
);

export const getViewPortWidth = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
export const getViewPortHeight = () => Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

export const getMaxScrollX = () => getDocumentScrollWidth() - getDocumentMinScrollWidth();
