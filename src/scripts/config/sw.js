const swRegist = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported in the browser");
    return;
  }
  try {
    await navigator.serviceWorker.register("/service-worker.js");
    console.log("Service Worker registered with scope:");
  } catch (error) {
    console.log("Service Worker registration failed:", error);
    throw error;
  }
};

export default swRegist;
