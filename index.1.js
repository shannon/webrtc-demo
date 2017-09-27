const Koa         = require('koa');
const serve       = require('koa-static');
const websockify  = require('koa-websocket');
const cors        = require('kcors');

const WEB_PORT = process.env.WEB_PORT || 8080;

const app = websockify(new Koa());

app.use(cors({
    origin: '*'
}));

app.use(serve('./public'));

app.ws.use(async (ctx, next) => {
    return next(ctx);
});

app.listen(WEB_PORT, () => {
    console.info(`Server listening on port ${WEB_PORT}`); 
})