<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {
    $app->get('/api/bookings', function (Request $request, Response $response) {
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->query("SELECT id, customer_name AS userName, equipment_name AS equipName, start_date AS startDate, end_date AS endDate, total_cost AS totalCost, status FROM bookings ORDER BY created_at DESC");
            $bookings = $stmt->fetchAll();

            $response->getBody()->write(json_encode($bookings));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });

    $app->post('/api/bookings', function (Request $request, Response $response) {
        $data = json_decode($request->getBody()->getContents(), true);

        if (empty($data['customer_name']) || empty($data['equipment_id']) || empty($data['start_date']) || empty($data['end_date']) || empty($data['total_cost'])) {
            $response->getBody()->write(json_encode(['error' => 'Incomplete booking data.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $pdo = getDBConnection();

            $stmt = $pdo->prepare("SELECT name FROM equipment WHERE id = ?");
            $stmt->execute([$data['equipment_id']]);
            $equip = $stmt->fetch();

            if (!$equip) {
                $response->getBody()->write(json_encode(['error' => 'Selected equipment not found.']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
            }

            $bookingId = 'BK-' . rand(1000, 9999);

            $session = \Stripe\Checkout\Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'inr',
                        'product_data' => [
                            'name' => $equip['name'] . ' Rental (' . $data['start_date'] . ' to ' . $data['end_date'] . ')'
                        ],
                        'unit_amount' => intval($data['total_cost'] * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => 'http://localhost:5500/dashboard_2.html?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url'  => 'http://localhost:5500/dashboard_2.html?canceled=true',
                'metadata'    => ['booking_id' => $bookingId]
            ]);

            $stmt = $pdo->prepare("INSERT INTO bookings (id, customer_name, equipment_id, equipment_name, start_date, end_date, total_cost, status, stripe_session_id) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', ?)");
            $stmt->execute([
                $bookingId,
                $data['customer_name'],
                $data['equipment_id'],
                $equip['name'],
                $data['start_date'],
                $data['end_date'],
                $data['total_cost'],
                $session->id
            ]);

            $response->getBody()->write(json_encode([
                'booking_id'   => $bookingId,
                'checkout_url' => $session->url
            ]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);

        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });

    $app->put('/api/bookings/{id}/status', function (Request $request, Response $response, array $args) {
        $bookingId = $args['id'];
        $data = json_decode($request->getBody()->getContents(), true);

        if (empty($data['status'])) {
            $response->getBody()->write(json_encode(['error' => 'Status is required.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("UPDATE bookings SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $bookingId]);

            $response->getBody()->write(json_encode(['message' => 'Status updated successfully.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });

    $app->delete('/api/bookings/{id}', function (Request $request, Response $response, array $args) {
        $bookingId = $args['id'];

        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
            $stmt->execute([$bookingId]);

            $response->getBody()->write(json_encode(['message' => 'Booking cancelled successfully.']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\PDOException $e) {
            $response->getBody()->write(json_encode(['error' => 'Database error: ' . $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    });
};