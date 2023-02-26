import AbstractView from "./AbstractView.js";

/**
 * IMAGE VIEW 
 */
export default class extends AbstractView {

    constructor(params) {
        super(params);
        let pageTitle = "Image #" + params.id;
        this.setTitle(pageTitle);
    }

    async getHtml() {
        const no = Number(this.params.id);
        
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        };
        
        const dataImages = await getData('/static/js/data/images.json');
        const image = dataImages.photos.find(item => item.id === no);
        
        let contenuHTML = `
            <a href="/image?page=${ dataImages['page'] }" data-link class="flex row breadcrumb texte-green texte-hover-orange">Retour</a>
            
            <section class="flex row section-show">
                <picture>
                    <img src="${ image['src']['landscape'] }" alt="">
                </picture>
                <article class="flex col">
                    <h2>${ image['photographer'] }</h2>
                    <small><a href="${ image['photographer_url'] }" target="_blank" class="texte-green texte-hover-lightgreen">Voir le profil de ${ image['photographer'] }</a></small>
                    <p>${ image['alt'] }</p>
                    <a href="${ image['url'] }" target="_blank" class="flex row btn texte-orange texte-hover-white">
                        <span class="texte">Télécharger sur Pexels</span>
                        <span class="icon" data-icone="fleche-droite" data-couleur="orange" data-hover="white"></span>
                    </a>
                </article>
            </section>
        `;
        
        return contenuHTML;
    }

}
