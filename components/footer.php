<!-- ======= Footer ======= -->
<footer id="footer" class="footer">
    <div class="copyright">
        &copy; Copyright <strong><span>CLOUDMATE CO., LTD.</span></strong>. All Rights Reserved
    </div>

</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="<?= $path ?>assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="<?= $path ?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?= $path ?>assets/vendor/chart.js/chart.umd.js"></script>
<script src="<?= $path ?>assets/vendor/echarts/echarts.min.js"></script>
<script src="<?= $path ?>assets/vendor/quill/quill.js"></script>
<script src="<?= $path ?>assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="<?= $path ?>assets/vendor/tinymce/tinymce.min.js"></script>
<script src="<?= $path ?>assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="<?= $path ?>assets/js/main.js"></script>

<!-- Extention Link-->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/2.1.3/js/dataTables.min.js"></script>

<!-- Others JS File -->
<script src="<?= $path ?>js/api_url.js"></script>
<script src="<?= $path ?>js/common/get_session_token.js"></script>
<script src="<?= $path ?>js/login/logout.js"></script>
<?php if (basename($_SERVER['PHP_SELF']) != 'login.php') { ?>
    <script src="<?= $path ?>js/login/check_login.js"></script>
<?php } ?>