### Running application
npm install
npm install -g localtunnel
lt -p 8080 -s html5meetup

## Walkthrough

### Step 0 (Setup)
npm init
npm install koa koa-static koa-websocket kcors uuid

### Step 1
#### Server
- create index.js
- serve public
- add cors
- add ws route

#### Client
- create public/index.html
- import adapter.js
- connect to ws signal server

### Step 2
#### Server
- create uuid on WS connect
- send welcome message to client

#### Client
- restructure into class
- accept welcome message

### Step 3
#### Server 
- collect all collections
- broadcast join
- receive and relay offers

#### Client
- recieve broadcasted joins
- create peer connection
- create and send offer

### Step 4
#### Server
- receive and relay answers
- recieve and relay candidates
- Server is done

#### Client
- send candidates
- receive canditates
- receive offers
- create and send answer

### Step 5
#### Client
- capture and output local video/audio stream
- add local stream to peer connection

### Step 6
#### Client
- output remote video/audio streams
- remove remote video on connection close
- add support for SSL