const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const logger = require('./log4j.js');
const QRCode = require('qrcode')

app.get("/health", (req, res) => {
    return res.send("echo health");
 
});

app.get("/qr", (req, res) => {
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark:"#010599FF",
          light:"#FFBF60FF"
        }
      }
    

    QRCode.toDataURL('text', opts, function (err, url) {
        if (err) {
            return res.end(err)
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'img/png');
        return res.end(url);
      })
    
});

var port = 4321
server.listen(port, function () {
    logger.info("qr service listening on port " + port);
})