import AbstractView from "./AbstractView.js";

/**
 * VIDEOS 
 */
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Videos");
    }

    async getHtml() {
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        };
        
        const dataVideos = await getData('/static/js/data/videos.json');
        let galleryVideos = `<section class="gallery">`;
        dataVideos.videos.forEach((video) => {
            galleryVideos += `
                <figure class="flex card">
                    <img src="${ video['image'] }" alt="Image non disponible">
                    <figcaption class="flex row">
                        <a href="/video-view/${ video['id'] }" data-link class="flex col"><img src="/static/img/angles-right-white.svg" alt="Icone de flèche"></a>
                    </figcaption>
                </figure>
            `;
        });
        galleryVideos += `</section>`;
        
        let contenuHTML = `
            <section class="flex col section-entete">
                <h1>Videos</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo non aut ab corrupti, nostrum aliquid doloribus ex reiciendis vel sequi earum saepe velit fugiat ipsum est fugit illum esse inventore aperiam exercitationem obcaecati nihil amet blanditiis? Dicta pariatur facere ducimus.</p>
            </section>
            
            <nav class="flex row">
                <a href="/video?page=${ dataVideos['page'] - 1 }" data-link class="btn">
                    <span class="texte">Page précédente</span>
                </a>
                <a href="/video?page=${ dataVideos['page'] + 1 }" data-link class="btn">
                    <span class="texte">Page suivante</span>
                </a>
            </nav>
            
            ${ galleryVideos }
        `;
        
        return contenuHTML;
    }

}
