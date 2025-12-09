export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  // Remove /api prefix
  const path = url.pathname.replace(/^\/api/, "");
  
  const targetUrl = `https://api.vorlie.pl${path}${url.search}`;

  // Create a new request with the target URL
  // We clone the original request to keep body and method
  const newRequest = new Request(targetUrl, context.request);

  return fetch(newRequest);
};
