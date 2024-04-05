<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'];
    $password = $data['password'];

    try {

        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid credentials'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}
