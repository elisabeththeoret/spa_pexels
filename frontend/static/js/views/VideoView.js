import AbstractView from "./AbstractView.js";

/**
 * VIDEO VIEW 
 */
export default class extends AbstractView {

    constructor(params) {
        super(params);
        let pageTitle = "Video #" + params.id;
        this.setTitle(pageTitle);
    }

    async getHtml() {
        const no = Number(this.params.id);
        
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        };
        
        const dataVideos = await getData('/static/js/data/videos.json');
        const video = dataVideos.videos.find(item => item.id === no);
        
        let contenuHTML = `
            <a href="/video?page=${ dataVideos['page'] }" data-link class="flex row breadcrumb texte-green texte-hover-orange">Back</a>
            
            <section class="flex row section-show">
                <picture>
                    <iframe src="${ video['video_files'][2]['link'] }" allowfullscreen frameborder="0">
                        <video preload="none" loop playsinline>
                            <source src="${ video['video_files'][2]['link'] }" type="${ video['video_files'][2]['file_type'] }">
                        </video>
                    </iframe>
                </picture>
                <article class="flex col">
                    <h2>${ video['user']['name'] }</h2>
                    <small><a href="${ video['user']['url'] }" target="_blank" class="texte-green texte-hover-lightgreen">Voir le profil de ${ video['user']['name'] }</a></small>
                    <p>Durée : ${ video['duration'] } secondes</p>
                    <a href="${ video['url'] }" target="_blank" class="flex row btn texte-orange texte-hover-white">
                        <span class="texte">Télécharger sur Pexels</span>
                        <span class="icon" data-icone="fleche-droite" data-couleur="orange" data-hover="white"></span>
                    </a>
                </article>
            </section>
        `;
        
        return contenuHTML;
    }

}
