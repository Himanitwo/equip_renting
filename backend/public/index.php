<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

require __DIR__ . '/../config/db.php';
require __DIR__ . '/../config/auth.php';

\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);

// CORS Middleware
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->options('/{routes:.+}', function (Request $request, Response $response) {
    return $response;
});

// Load Route Modules
(require __DIR__ . '/../api/auth.php')($app);
(require __DIR__ . '/../api/equipment.php')($app);
(require __DIR__ . '/../api/bookings.php')($app);

$app->run();