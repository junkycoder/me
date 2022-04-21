import { Status } from "https://deno.land/std@0.136.0/http/http_status.ts";
import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { connect } from "https://deno.land/x/redis@v0.25.4/mod.ts";

const {
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  REDIS_TLS,
} = Deno.env.toObject();

const port = parseInt(PORT, 10) || 8008;
console.info(`http://localhost:${port}`);

serve(async (req) => {
  const id = `input-${crypto.randomUUID()}`;
  
  try {
    const input = await req.text();
    const redis = await connect({
      hostname: REDIS_HOST,
      port: REDIS_PORT,
      tls: Boolean(REDIS_TLS),
      password: REDIS_PASS,
    });

    await redis.set(id, input);
  } catch (O_o) {
    console.error(O_o);
    return new Response("SRY");
  }

  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);

  if (params.has("q")) {
    const query = encodeURI(params.get("q"));
    let target = `https://www.startpage.com/do/search`;
    target += `?q=${query}&segment=startpage.brave`;

    return new Response(
      undefined,
      {
        status: Status.Found,
        headers: { location: target }
      }
    );
  } 

  return new Response("THX");
}, { port });

