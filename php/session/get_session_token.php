<?php
session_start();
header('Content-Type: application/json');

if (!empty($_SESSION)) {
    echo json_encode($_SESSION);
} else {
    echo json_encode(array(
        'status' => 'error',
        'message' => 'No session data available'
    ));
}
?>
