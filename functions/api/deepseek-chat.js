export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return json(
      { error: "Server misconfigured: missing DEEPSEEK_API_KEY" },
      500
    );
  }

  try {
    const payload = await request.json();
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: payload.model || "deepseek-chat",
        messages: payload.messages || [],
        temperature: payload.temperature ?? 0.7,
        max_tokens: payload.max_tokens ?? 1000
      })
    });

    const raw = await upstream.text();
    return new Response(raw, {
      status: upstream.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return json({ error: error.message || "Unknown server error" }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
