// loading.js
export function showLoading() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.style.display = 'flex';
  }
}

export function hideLoading() {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
    loadingElement.style.display = 'none'; 
  }
}
