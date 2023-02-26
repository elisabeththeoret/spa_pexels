/**
 * SERVER 
 * 
 * PEXELS API 
 * @doc https://www.pexels.com/api/documentation/ 
 */
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const request = require('request');

const { PORT } = require('./config.js');
const { API_KEY } = require('./config.js');

const pexels = require('pexels');
const { exit, nextTick } = require('process');
const client = pexels.createClient(API_KEY);

app.listen(PORT, () => {
    console.log("Server running...", PORT);
});

/**
 * ROUTE IMAGE 
 */
app.get('/image', async (req, res, next) => {
    console.log("IMAGE");
    
    // récupérer la page 
    let page = 1;
    if (req.query.page != null) {
        page = req.query.page;
    }
    console.log("?page=" + page);
    
    await getDataImages(page);
    
    next();
});

/**
 * ROUTE VIDEO 
 */
app.get('/video', async (req, res, next) => {
    console.log("VIDEO");
    
    // récupérer la page 
    let page = 1;
    if (req.query.page != null) {
        page = req.query.page;
    }
    console.log("?page=" + page);
    
    await getDataVideos(page);
    
    next();
});

/**
 * FONTEND 
 */
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

/**
 * FONCTION GET DATA IMAGES 
 */
async function getDataImages(page) {
    fs.readFile(__dirname + "/frontend/static/js/data/images.json", 'utf8', (err, data) => {
        const dataImages = JSON.parse(data);
        
        // vérifier les données 
        let fetchNewData = false;
        if (dataImages['page'] != page) {
            fetchNewData = true;
        }
        
        // trouver les données 
        if (fetchNewData) {
            client.photos.curated({ page: page, per_page: 40 }).then(data => {
                // console.log(data);
                
                // réécrire les données
                var newData = JSON.stringify(data);
                fs.writeFile('frontend/static/js/data/images.json', newData, (err) => {
                    if (err) throw err;
                    console.log("Fichier mis à jour: images.json");
                });
            });
        }
    });
}

/**
 * FONCTION GET DATA VIDEOS 
 */
async function getDataVideos(page) {
    fs.readFile(__dirname + "/frontend/static/js/data/videos.json", 'utf8', (err, data) => {
        const dataVideos = JSON.parse(data);
        
        // vérifier les données 
        let fetchNewData = false;
        if (dataVideos['page'] != page) {
            fetchNewData = true;
        }
        
        // trouver les données 
        if (fetchNewData) {
            client.videos.popular({ page: page, per_page: 40 }).then(data => {
                // console.log(data);
                
                // réécrire les données
                var newData = JSON.stringify(data);
                fs.writeFile('frontend/static/js/data/videos.json', newData, (err) => {
                    if (err) throw err;
                    console.log("Fichier mis à jour: videos.json");
                });
            });
        }
    });
}
