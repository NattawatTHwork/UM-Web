<?php $path = dirname($_SERVER['SCRIPT_NAME']) . '/'; ?>
<?php $path_link = '/' ?>
<!-- Favicons -->
<link href="<?= $path ?>assets/img/favicon.png" rel="icon">
<link href="<?= $path ?>assets/img/apple-touch-icon.png" rel="apple-touch-icon">

<!-- Google Fonts -->
<link href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap" rel="stylesheet">
<!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"> -->

<!-- Vendor CSS Files -->
<link href="<?= $path ?>assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="<?= $path ?>assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
<link href="<?= $path ?>assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
<link href="<?= $path ?>assets/vendor/quill/quill.snow.css" rel="stylesheet">
<link href="<?= $path ?>assets/vendor/quill/quill.bubble.css" rel="stylesheet">
<link href="<?= $path ?>assets/vendor/remixicon/remixicon.css" rel="stylesheet">
<link href="<?= $path ?>assets/vendor/simple-datatables/style.css" rel="stylesheet">

<!-- Template Main CSS File -->
<link href="<?= $path ?>assets/css/style.css" rel="stylesheet">

<!-- DataTables CSS Link -->
<link rel="stylesheet" href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.min.css">

<?php
session_start();
?>