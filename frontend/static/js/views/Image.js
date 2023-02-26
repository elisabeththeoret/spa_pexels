import AbstractView from "./AbstractView.js";

/**
 * IMAGES 
 */
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Images");
    }

    async getHtml() {
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        };
        
        const dataImages = await getData('/static/js/data/images.json');
        
        let galleryImages = `<section class="gallery">`;
        dataImages.photos.forEach((image) => {
            galleryImages += `
                <figure class="flex card">
                    <img src="${ image['src']['large'] }" alt="${ image['alt'] }">
                    <figcaption class="flex row">
                        <a href="/image-view/${ image['id'] }" data-link class="flex col"><img src="/static/img/angles-right-white.svg" alt="Icone de flèche"></a>
                    </figcaption>
                </figure>
            `;
        });
        galleryImages += `</section>`;
        
        let contenuHTML = `
            <section class="flex col section-entete">
                <h1>Images</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo non aut ab corrupti, nostrum aliquid doloribus ex reiciendis vel sequi earum saepe velit fugiat ipsum est fugit illum esse inventore aperiam exercitationem obcaecati nihil amet blanditiis? Dicta pariatur facere ducimus.</p>
            </section>
            
            <nav class="flex row">
                <a href="/image?page=${ dataImages['page'] - 1 }" data-link class="btn">
                    <span class="texte">Page précédente</span>
                </a>
                <a href="/image?page=${ dataImages['page'] + 1 }" data-link class="btn">
                    <span class="texte">Page suivante</span>
                </a>
            </nav>
            
            ${ galleryImages }
        `;
        
        return contenuHTML;
    }

}
