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

    ctx.websocket.on('message', (data) => {
        const message = JSON.parse(data);
        switch(message.type){
            case 'offer':
                connections.get(message.to) && connections.get(message.to).send(JSON.stringify(Object.assign(message, { from: uuid })));
                break;
        }
    });

    ctx.websocket.send(JSON.stringify({ type: 'welcome', uuid }));

    //tell all exsiting connections about this new connection
    for(let [id, connection] of connections){
        id !== uuid && connection.send(JSON.stringify({ type: 'join', from: uuid }));
    }
});

app.listen(WEB_PORT, () => {
    console.info(`Server listening on port ${WEB_PORT}`); 
})