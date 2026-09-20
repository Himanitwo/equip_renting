<?php
use Psr\Http\Message\ServerRequestInterface as Request;

function requireAuth(Request $request) {
    $authHeader = $request->getHeaderLine('Authorization');
    if (empty($authHeader) || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        return false;
    }
    $token = $matches[1];
    return !empty($token);
}

function requireRole(Request $request, string $requiredRole) {
    if (!requireAuth($request)) {
        return false;
    }
    return true;
}