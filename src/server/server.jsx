import koa from "koa";
import koaStatic from "koa-static";
var app = module.exports = koa();

try {
    const app = koa();
    const hostname = process.env.HOSTNAME || "localhost";
    const port = process.env.PORT || 8000;

	app.use(koaStatic("dist/client"));

    app.listen(port, () => {
        console.info(`[Koa] Server is listening on http://${hostname}:${port}`);
    });
} catch(error) {
	console.error(error.stack || error);
}
