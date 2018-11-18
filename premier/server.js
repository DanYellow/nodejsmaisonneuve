const http = require(`http`);
const PORT = 8080;

const router = (key) => (
    {
        [`${key}`]: {
            "template": "list",
            "content": {
                "data":  [`Developpement`, `Javascript`, `Maths`, key]
            }
        } 
    }
)

const tplGenerator = (tpl) => {
    switch(true) {
        case tpl && tpl.template === `list`: {
            const list = tpl.content.data.map((item) => `<li>${item}</li>`)
            return `<ul>${list}</ul>`;
        }
        default:
            return `Hello`
    }
}

function handleRequest(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    const pageContent = tplGenerator(router(req.url)[req.url])
    res.end(pageContent);
}


const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log("Server listening on: http://localhost:%s", PORT);
})