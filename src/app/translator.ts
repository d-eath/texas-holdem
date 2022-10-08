// Fichier : translator.ts
// Auteur : Davis Eath
// Date : 2020-10-30
// But : Classe statique permettant de traduire un ID numérique en texte français

import { Card } from './card';

export class Translator {

    /**
     * Convertit l'ID d'une valeur de carte en texte avec le déterminant (si applicable)
     * @param id l'ID de la valeur à convertir en texte
     * @param article le déterminant à préfixer dans le texte (à, au, de)
     * @param plural si le texte à retourner est au pluriel
     * @param fromTo si le texte à retourner est pour une quinte
     * @returns la valeur en français avec le déterminant donné
     */
    static rankIdToText(id: number, article = '', plural = false, fromTo = false): string {
        const articles = { jack: '', queen: '', king: '', ace: '' };

        // Ajout des déterminants pour les valeurs spéciales (J, Q, K, A)
        if (!plural && article === 'de') {
            articles.jack = 'de ';
            articles.queen = 'de la ';
            articles.king = 'du ';
            articles.ace = 'de l\'';
        } else if (!plural && article === 'à' || article === 'au') {
            articles.jack = 'au ';
            articles.queen = 'à la ';
            articles.king = 'au ';
            articles.ace = 'à l\'';
        } else if (plural && article === 'de' && !fromTo) {
            articles.jack = 'de ';
            articles.queen = 'de ';
            articles.king = 'de ';
            articles.ace = 'd\'';
        } else if (plural && article === 'de' && fromTo) {
            articles.jack = 'du ';
            articles.queen = 'de la ';
            articles.king = 'du ';
            articles.ace = 'de l\'';
        }

        switch (id) {
            case Card.RANK.TWO:
                return `${article} deux`.trim();

            case Card.RANK.THREE:
                return `${article} trois`.trim();

            case Card.RANK.FOUR:
                return `${article} quatre`.trim();

            case Card.RANK.FIVE:
                return `${article} cinq`.trim();

            case Card.RANK.SIX:
                return `${article} six`.trim();

            case Card.RANK.SEVEN:
                return `${article} sept`.trim();

            case Card.RANK.EIGHT:
                return `${article} huit`.trim();

            case Card.RANK.NINE:
                return `${article} neuf`.trim();

            case Card.RANK.TEN:
                return `${article} dix`.trim();

            case Card.RANK.JACK:
                return `${articles.jack}valet${plural ? 's' : ''}`.trim();

            case Card.RANK.QUEEN:
                return `${articles.queen}reine${plural ? 's' : ''}`.trim();

            case Card.RANK.KING:
                return `${articles.king}roi${plural ? 's' : ''}`.trim();

            case Card.RANK.ACE:
            case Card.RANK.ACE_ONE:
                return `${articles.ace}as`.trim();

            default:
                return null;
        }
    }

    /**
     * Convertit l'ID d'une sorte de carte en texte
     * @param id l'ID de la sorte à convertir en texte
     * @returns la sorte en français
     */
    static suitIdToText(id: number): string {
        switch (id) {
            case Card.SUIT.SPADE:
                return 'piques';

            case Card.SUIT.CLUB:
                return 'trèfles';

            case Card.SUIT.DIAMOND:
                return 'carreaux';

            case Card.SUIT.HEART:
                return 'cœurs';

            default:
                return null;
        }
    }
}
