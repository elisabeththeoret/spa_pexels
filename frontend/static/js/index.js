import Accueil from "./views/Accueil.js";
import Image from "./views/Image.js";
import ImageView from "./views/ImageView.js";
import Video from "./views/Video.js";
import VideoView from "./views/VideoView.js";
import Collection from "./views/Collection.js";
import CollectionView from "./views/CollectionView.js";

/**
 * Récupérer le chemin (path) 
 * 
 * /page/id = { 0: page, 1: id }
 */
const pathToRegex =  path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

/**
 * ROUTER 
 */
const router = async () => {
    // routes
    const routes = [
        { path: '/', view: Accueil }, 
        { path: '/image', view: Image }, 
        { path: '/image-view/:id', view: ImageView }, 
        { path: '/video', view: Video }, 
        { path: '/video-view/:id', view: VideoView }, 
        { path: '/collection', view: Collection }, 
        { path: '/collection-view/:id', view: CollectionView }, 
    ];
    
    // match
    const potentialMatches = routes.map(route => {
        return {
            route: route, 
            result: location.pathname.match(pathToRegex(route.path)), 
        }
    });
    // console.log(potentialMatches);
    
    let match = potentialMatches.find(potentialMatch => potentialMatch.result != null);
    if (! match) {
        match = {
            route: routes[0], 
            result: [location.pathname], 
        }
    }
    console.log(match);
    
    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml();
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

window.addEventListener('popstate', router());

window.addEventListener('load', function() {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});
