import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Accueil");
    }

    async getHtml() {
        return `
            <section class="flex col section-entete">
                <h1>Bienvenue sur SPA Pexels</h1>
                <p>Photos et vidéos gratuites que vous pouvez utiliser partout. Parcourez des millions d'images de haute qualité ainsi que de vidéos, toutes libres de droit.</p>
            </section>
            
            <section>
                <nav class="flex row egal nav-home-icons texte-black">
                    <a href="/image?page=1" data-link class="flex col bg-black texte-white">
                        <span class="icon" data-icone="image" data-couleur="lightgreen" data-hover="green"></span>
                        <span>Voir les images</span>
                    </a>
                    <a href="/video?page=1" data-link class="flex col bg-black texte-white">
                        <span class="icon" data-icone="video" data-couleur="lightgreen" data-hover="green"></span>
                        <span>Voir les vidéos</span>
                    </a>
                    <a href="/collection?page=1" data-link class="flex col bg-black texte-white">
                        <span class="icon" data-icone="collection" data-couleur="lightgreen" data-hover="green"></span>
                        <span>Voir les collections</span>
                    </a>
                </nav>
            </section>
        `;
    }

}
