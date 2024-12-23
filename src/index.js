export default {
	async fetch(request, env, ctx) {
		await recordRequest(request, env);
		return Response.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ", 302);
	},
};

async function recordRequest(request, env) {

	const url = new URL(request.url);

	const analyticsData = {
	  timestamp: Date.now(),
	  domain: url.hostname,
	  method: request.method,
	  path: url.pathname,
	  country: request.cf.country,
	}
	console.log('Recording request:', analyticsData);
	const ANALYTICS_URL = 'https://analytics.jonasjones.dev/requests/record';

	const response = await fetch(ANALYTICS_URL, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': env.VITE_ANALYTICS_API_KEY,
	  },
	  body: JSON.stringify(analyticsData)
	});

	if (response.ok) {
	  console.log('Request recorded successfully');
	} else {
	  console.error('Failed to record request:', response.status, await response.text());
	}
  }
