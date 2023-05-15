const http = require('http');
const fs = require('fs');
const qs = require('qs')
let array = []
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/todo.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const work = qs.parse(data);
            array.push(work)
            fs.readFile('./views/display.html', 'utf8',  (err, dataHTML)=> {
                if (err) {
                    console.log(err.message);
                }
                for (let i = 0; i < array.length; i++) {
                    dataHTML = dataHTML.replace('id="result">',`id="result">`+`<p>${array[i].options}</p>`);
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataHTML);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})
server.listen(8080,'localhost', ()=> {
    console.log('server is running')
});
