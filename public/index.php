<?php
require_once '../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$request = Request::createFromGlobals();
$response = new Response();

$loader = new FilesystemLoader('../templates');
$twig = new Environment($loader, [
    'cache' => false,
]);

$canonical = $request->getHttpHost();
$title = 'Compagnie de théâtre Mi-fugue, Mi-raison';
$description = "Mi-fugue Mi-raison est une compagnie théâtrale qui réalise, produit et diffuse des projets culturels. L'association oeuvre pour un théâtre d’intérêt général.";
$team = [
    'caroline-sahuquet.jpg' => 'Caroline Sahuquet',
    'stephanie-colonna.jpg' => 'Stéphanie Colonna',
    'alice-luce.jpg' => 'Alice Luce',
    'jacques-plaideau-nb.jpg' => 'Jacques Plaideau',
    'barbara-grau.jpg' => 'Barbara Grau',
    'aline-stinus.jpg' => 'Aline Stinus',
    'elise-thiebaut2.jpg' => 'Elise Thiebaut',
    'delphine-biard.jpg' => 'Delphine Biard',
    'flore-grimaud.jpg' => 'Flore Grimaud',
    'pierre-carbonnier.jpg' => 'Pierre Carbonnier',
    'sandie-masson.jpg' => 'Sandie Masson',
    'bruno-guillot.jpg' => 'Bruno Guillot',
    'lylian-jolliot.jpg' => 'Lylian Jolliot',
    'didier-brengarth.jpg' => 'Didier Brengarth',
    'morgan-massart.jpg' => 'Morgan Massart',
    'del-kilhoffer.jpg' => 'Del Kilhoffer',
    'cecile-martin.jpg' => 'Cécile Martin',
    'marie-colucci.png' => 'Marie Colucci',
    'sephora-haymann.jpg' => 'Séphora Haymann',
    'camille-pawlotsky.jpg' => 'Camille Pawlotsky',
    'mia-delmae.jpg' => 'Mia Delmaë',
];
$partners = [
    'citeFertile.png',
    'hubertine.png',
    'plateauxSauvages.jpg',
    'ltdlc.jpg',
    'solipam.png',
    'planningFamilial.png',
];
$supports = [
    'mairie-de-paris.png',
    'agir.png',
    'pantin.png',
    'adami.png',
    'spedidam.png',
    'franceActive.png',
    'grandParis.png',
];
$othersPartners = [
    'ciane.jpg',
    'ddf.gif',
    'irasf.png',
    'stopvog.png',
    'antia.png',
    'cine104.png',
    'louisette.png',
    'paf.png',
    'vestibule.png',
];
$media = [];

$dates = [
    'speculum' => [
        [
            'titre' => 'Clermont-Ferrand - La Coupole',
            'lieu' => '12 Bd Pasteur',
            'dates' => '11 Mars 2022',
            'lien' => 'http://coupoleevent.com/programme-2/',
            'home' => true
        ],
        [
            'titre' => 'Perpignan Palais des rois de Majorque',
            'lieu' => 'Rue des Archers',
            'dates' => '18 Mars 2022',
            'home' => true
        ],
        [
            'titre' => 'Cherbourg - Thêatre des Miroirs',
            'lieu' => 'Rue Martin Luther King',
            'dates' => '1er Décembre 2022',
            'home' => true
        ],
        [
            'titre' => 'Le Grau du Roi - Théâtre Jean-Pierre Cassel',
            'lieu' => 'Allée Victore Hugo',
            'dates' => '11 Mars 2023',
            'home' => true
        ],
        [
            'titre' => 'Mais aussi en 2022',
            'lieu' => 'Nice, Cachan, Rouen, Paris, Trégor, Saint-Lô...',
            'home' => true
        ]
    ],
    'tsr' => [
        [
            'titre' => 'Montreuil',
            'lieu' => 'Collège Solveig Anspach',
            'dates' => '31 Janvier 2022',
            'home' => true
        ],
        [
            'titre' => 'Paris 18ème',
            'lieu' => 'Collège Aimée Césaire',
            'dates' => '10 Février, 24 Mars, 12 et 19 Mai 2022',
            'home' => true
        ],
        [
            'titre' => 'Clichy-sous-Bois',
            'lieu' => 'Collège Romain Rolland, (allée de Gagny)',
            'dates' => '10 mars 2022',
            'home' => true
        ],
        [
            'titre' => 'Noisy-le-sec',
            'lieu' => 'Collège Jacques Prévert',
            'dates' => '9 Juin 2022',
            'home' => true
        ]
    ],
    'wetoo' => [
        [
            'titre' => 'La 2ème édition du Wetoo Festival a eu lieu à La Cité Fertile',
            'lieu' => '14 Avenue Edouard Vaillant 93500 PANTIN',
            'dates' => "Rendez-vous pour la 3ème édition le 9-10-11 Septembre 2022",
            'home' => true,
        ]
    ],
];

switch ($request->getPathInfo()) {
    case '/':
        $template = 'index.html.twig';
        break;
    case '/matthieu-x':
        $title .= ' | Matthieu(x)';
        $canonical .= '/matthieu-x';
        $template = 'matthieu-x.html.twig';
        $media = [
            'teaser2.mp4' => ['type' => 'mp4'],
            'p1.jpg' => ['type' => 'jpg'],
            'p2.jpg' => ['type' => 'jpg'],
            'teaser3.mp4' => ['type' => 'mp4'],
            'p3.jpg' => ['type' => 'jpg'],
            'p4.jpg' => ['type' => 'jpg'],
            'p5.jpg' => ['type' => 'jpg'],
            'p6.jpg' => ['type' => 'jpg'],
            'p7.jpg' => ['type' => 'jpg']
        ];
        break;
    case '/speculum':
        $title .= ' | Speculum';
        $canonical .= '/speculum';
        $template = 'speculum.html.twig';
        $media = [
            'teaser1-hd-720.mp4' => ['type' => 'mp4'],
            '529.jpg' => ['type' => 'jpg'],
            '474.jpg' => ['type' => 'jpg'],
            '486.jpg' => ['type' => 'jpg'],
            '500.jpg' => ['type' => 'jpg'],
            '513.jpg' => ['type' => 'jpg'],
            '555.jpg' => ['type' => 'jpg'],
            '600.jpg' => ['type' => 'jpg'],
        ];
        break;
    case '/tout-sur-le-rouge':
        $title .= ' | Tout sur le rouge';
        $canonical .= '/tout-sur-le-rouge';
        $template = 'tsr.html.twig';
        $media = [
            'teaser1-ld.mp4' => ['type' => 'mp4'],
            'TSR1.jpg' => ['type' => 'jpg'],
            'TSR2.jpg' => ['type' => 'jpg'],
            'TSR3.jpg' => ['type' => 'jpg'],
            'TSR4.jpg' => ['type' => 'jpg'],
            'TSR5.jpg' => ['type' => 'jpg'],
            'TSR6.jpg' => ['type' => 'jpg'],
            'TSR7.jpg' => ['type' => 'jpg'],
            'TSR8.jpg' => ['type' => 'jpg']
        ];
        break;
    case '/we-too':
        $title .= ' Festival We Too';
        $canonical .= '/we-too';
        $template = 'wetoo.html.twig';
        $media = [
        ];
        break;
    case '/login':
        $template = 'login.html.twig';
        break;
    default:
        $title = 'Erreur 404';
        $template = '404.html.twig';
        $response->setStatusCode(Response::HTTP_NOT_FOUND);
}

if ($request->isXmlHttpRequest()) {
    $response->headers->set('Content-Type', 'application/json');
    $response->setContent(json_encode([
        'title' => $title,
        'canonical' => $canonical,
        'description' => $description,
        'template' => $twig->render($template, [
            'media' => $media,
            'dates' => $dates,
            'team' => $team,
            'partners' => $partners,
            'supports' => $supports,
            'othersPartners' => $othersPartners,
            'format' => 'json'
        ])
    ]));
} else {
    $response->setContent($twig->render($template, [
        'path' => $_SERVER['REQUEST_URI'],
        'format' => 'html',
        'canonical' => $canonical,
        'title' => $title,
        'description' => $description,
        'team' => $team,
        'partners' => $partners,
        'supports' => $supports,
        'othersPartners' => $othersPartners,
        'media' => $media,
        'dates' => $dates
    ]));
}

$response->send();
