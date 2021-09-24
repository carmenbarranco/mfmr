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
  'martine-sahuquet.jpg' => 'Martine Sahuquet',
  'morgan-massart.jpg' => 'Morgan Massart',
  'del-kilhoffer.jpg' => 'Del Kilhoffer',
  'cecile-martin.jpg' => 'Cécile Martin',
  'sephora-haymann.jpg' => 'Séphora Haymann',
  'camille-pawlotsky.jpg' => 'Camille Pawlotsky',
  'mia-delmae.jpg' => 'Mia Delmaë',
];
$partners = [
  'mairie-de-paris.png',
  'adami.png',
  'plateauxSauvages.jpg',
  'spedidam.png',
  'montreuil.jpg',
  'ltdlc.jpg',
  'ciane.jpg',
  'ddf.gif',
  'irasf.png',
  'pantin.png',
  'solipam.png',
  'stopvog.png',
];
$media = [];

$dates = [
  'speculum' => [
    [
      'titre' => 'Festival Sortie de Bain',
      'lieu' => 'Granville',
      'dates' => '3 et 4 juillet 2021',
      'home' => true
	],
    [
      'titre' => 'Condition des Soies AVIGNON OFF 2021',
      'lieu' => 'AVIGNON',
      'dates' => ' 21 au 31 juillet à 12H45',
      'home' => true
    ],

  ],
  'tsr' => [
	[
		'titre' => 'Cité Scolaire Jacques Décour - Paris',
    	'lieu' => 'Paris',
      	'dates' => 'Juin 2021 ',
      	'home' => true
	]
  ],
  'wetoo' => [
        [
          'titre' => 'Le Wetoo Festival à La Cité Fertile',
          'lieu' => '14 Avenue Edouard Vaillant 93500 PANTIN',
		  'dates' => "Deuxième édition du 9 au 12 SEPTEMBRE 2021",
          'home' => true,
        ]
  ],
];

switch($request->getPathInfo()) {
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

if($request->isXmlHttpRequest()){
  $response->headers->set('Content-Type', 'application/json');
  $response->setContent(json_encode([
    'title'       => $title,
    'canonical'   => $canonical,
    'description' => $description,
    'template'    => $twig->render($template, [
    'media'       => $media,
    'dates'       => $dates,
    'team'        => $team,
    'partners'    => $partners,
    'format'      => 'json'
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
    'media' => $media,
    'dates' => $dates
  ]));
}

$response->send();
