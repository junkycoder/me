#!/usr/bin/env node
/**
 * One file, one language, one framework for your web space presentation.
 *
 * @author junkycoder
 */

server: {
  if (Boolean(globalThis.process)) {
    server().catch(console.error);
  }
}

client: {
  if (Boolean(globalThis.window)) {
    console.info("Client ..");
  }
}

//

async function server({ port = 8008, rootPath = "." } = {}) {
  const [http, fs] = await Promise.all(
    ["http", "fs"].map((s) => import(`${s}`))
  );

  async function handlaRequesta(req, res) {
    let filename = req.url.substring(1);
    if (filename === "") {
      filename = "index.html";
    }
    const filepath = `${rootPath}/${filename}`;

    try {
      const filedata = await fs.promises.readFile(filepath);
      res.writeHead(200);
      res.end(filedata);
    } catch (error) {
      res.writeHead(404);
      res.end("404 Not Found");
    }
  }

  function handlaSuccessa() {
    console.log(
      `Serva runnin on port ${port}. Try to vista http://localhost:${port}/ locala.`
    );
  }

  http.createServer(handlaRequesta).listen(port, handlaSuccessa);
}
