const http = require('http'); //konstanta typu objekt
const fs = require('fs');
const url = require('url');

let mujCitac = 0;
let PORT = 8080;
let clovek = "x";
//let clovek = {};
//let clovekJmeno = "x";

function main(req, res){ //req - request - požadavek, res - response - odpověď
    console.log("url:" + req.url);
    let q = url.parse(req.url, true);
    /*console.log("cesta:" + q.pathname);
    console.log("parametry:" + JSON.stringify(q.query));
    console.log(console.prezdivka);*/
    if (q.pathname === "/") {
        fs.readFile('index.html',function (err,data) {
            res.writeHead(404, {"Content-Type":"text/html"});
            res.write(data);
            res.end();
        });
        /* Synchronní verze by byla:
        let s = fs.readFileSync("index.html");
        res.writeHead(200, {"Content-type": "text/html"});//200 = kód pro vše je OK
        res.end(s);
         */
    }else if (q.pathname === "/citac"){
        mujCitac++;
       let obj = {};
       obj.citac = mujCitac;
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    }else if (q.pathname === "/citac/vynuluj"){
        mujCitac = 0;
        let obj = {};
        obj.citac = mujCitac;
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    }else if (q.pathname === "/zapamatujsi"){
        clovek = q.query.jmeno;
        let obj = {};
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    }else if (q.pathname === "/zobrazsi"){
        let obj = {};
        obj.jmeno = clovek;
        console.log(clovek);
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
    } else {
       // return "kuk!";
        res.writeHead(404);
        res.end();
    }

}
let srv = http.createServer(main);
srv.listen(PORT);
console.debug("Server běží na http://localhost:" + PORT);

//endpoint - funkce odpovdající