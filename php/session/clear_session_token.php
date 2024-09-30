<?php
session_start();
header('Content-Type: application/json');

// ตรวจสอบว่ามี session token หรือไม่
if (isset($_SESSION['token']) || isset($_SESSION['role'])) {
    // ลบ session token
    session_destroy();
    
    // เซ็ต status เป็น success แสดงว่าลบ session สำเร็จ
    echo json_encode(array('status' => 'success'));
} else {
    // ถ้าไม่พบ session token
    echo json_encode(array('status' => 'error', 'message' => 'Session token not found'));
}
?>
