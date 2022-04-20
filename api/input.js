import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { connect } from "https://deno.land/x/redis@v0.25.4/mod.ts";

const { PORT, REDIS_HOST, REDIS_PORT, REDIS_PASS, REDIS_TLS } = Deno.env.toObject();

const port = parseInt(PORT, 10) || 8008;
console.info(`http://localhost:${port}`);

serve(async (req) => {
  const redis = await connect({
    hostname: REDIS_HOST,
    port: REDIS_PORT,
    tls: Boolean(REDIS_TLS),
    password: REDIS_PASS,
  });

  try {
    await redis.set(
      crypto.randomUUID(),
      await req.text(),
    );
  } catch (O_o) {
    console.error(O_o);
    return new Response("SRY");
  }

  return new Response("THX");
}, { port });
