const productionHosts = new Set(['enopacpg.com', 'www.enopacpg.com']);

function forwardedHostname(request) {
  return (request.headers.get('x-forwarded-host') || '').split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const hostname = new URL(request.url).hostname.toLowerCase();
    if (!hostname.endsWith('.workers.dev') || productionHosts.has(forwardedHostname(request))) return response;

    // Restrict only the direct hosting preview; preserve the asset body and headers.
    const previewResponse = new Response(response.body, response);
    previewResponse.headers.set('X-Robots-Tag', 'noindex, follow');
    return previewResponse;
  },
};
