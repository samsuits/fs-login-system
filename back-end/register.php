<?php
header('Content-Type: application/json');

include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $email = $data['email'];
    $city = $data['city'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO users (firstname, lastname, email, city, password) VALUES ('$firstname', '$lastname',  '$email', '$city', '$password')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode([
                'success' => true,
                'message' => 'User registered successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => $conn->error
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}
