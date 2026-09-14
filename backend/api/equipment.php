<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {
    $app->get('/api/equipment', function (Request $request, Response $response) {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->query("SELECT id, name, category, daily_rate AS rate, status, image_url AS img FROM equipment ORDER BY id DESC");
            $items = $stmt->fetchAll();

            $response->getBody()->write(json_encode($items));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });

    $app->post('/api/equipment', function (Request $request, Response $response) {
        $data = json_decode($request->getBody()->getContents(), true);

        if (empty($data['name']) || empty($data['category']) || empty($data['daily_rate'])) {
            $response->getBody()->write(json_encode(['error' => 'Name, category, and rate are required.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("INSERT INTO equipment (name, category, daily_rate, status, image_url) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['category'],
                $data['daily_rate'],
                $data['status'] ?? 'Available',
                $data['image_url'] ?? 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80'
            ]);

            $response->getBody()->write(json_encode(['message' => 'Equipment added successfully', 'id' => $pdo->lastInsertId()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });
};