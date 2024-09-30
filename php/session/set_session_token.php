<?php
session_start();
header('Content-Type: application/json');

// Get the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Check if the token and role are set in the input
if (isset($input)) {
    // Set all values in the session
    foreach ($input as $key => $value) {
        $_SESSION[$key] = $value;
    }

    // Return a success response
    echo json_encode(array('status' => 'session_set'));
} else {
    // Return an error response
    echo json_encode(array('status' => 'error', 'message' => 'Token or role not provided'));
}
?>
