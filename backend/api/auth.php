<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {
    $app->post('/api/register', function (Request $request, Response $response) {
        $data = json_decode($request->getBody()->getContents(), true);
        
        if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['password'])) {
            $response->getBody()->write(json_encode(['error' => 'All fields are required.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                $response->getBody()->write(json_encode(['error' => 'Email is already registered.']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
            }

            $hashedPass = password_hash($data['password'], PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['name'], $data['email'], $data['phone'], $hashedPass]);

            $response->getBody()->write(json_encode(['message' => 'User registered successfully.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });

    $app->post('/api/login', function (Request $request, Response $response) {
        $data = json_decode($request->getBody()->getContents(), true);
        
        if (empty($data['email']) || empty($data['password'])) {
            $response->getBody()->write(json_encode(['error' => 'Email and password required.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            $user = $stmt->fetch();

            if ($user && password_verify($data['password'], $user['password'])) {
                unset($user['password']);
                $response->getBody()->write(json_encode(['message' => 'Login successful', 'user' => $user]));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
            }

            $response->getBody()->write(json_encode(['error' => 'Invalid email or password.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });
};