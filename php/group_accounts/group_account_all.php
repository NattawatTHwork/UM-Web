<?php
if (isset($_SESSION['allowed_menu']) && is_array($_SESSION['allowed_menu'])) {
    $allowed_menu = $_SESSION['allowed_menu'];
    if (!in_array(47, $allowed_menu)) {
        header('Location: ' . $path . 'index.php');
        exit();
    }
} else {
    header('Location: ' . $path . 'login.php');
    exit();
}
