const Koa         = require('koa');
const serve       = require('koa-static');
const websockify  = require('koa-websocket');
const cors        = require('kcors');
const UUID        = require('uuid/v4');

const WEB_PORT = process.env.WEB_PORT || 8080;

const app = websockify(new Koa());

app.use(cors({
    origin: '*'
}));

app.use(serve('./public'));

const connections = new Map();

app.ws.use(async (ctx, next) => {
    const uuid = UUID();
    connections.set(uuid, ctx.websocket);

    ctx.websocket.on('close', () => {
        connections.delete(uuid);
    });

    ctx.websocket.send(JSON.stringify({ type: 'welcome', uuid }));
});

app.listen(WEB_PORT, () => {
    console.info(`Server listening on port ${WEB_PORT}`); 
})