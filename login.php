<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Login</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <?php include_once './components/header_link.php' ?>

    <style>
        body {
            position: relative;
            overflow: hidden;
            font-family: 'Prompt', sans-serif;
        }

        video {
            position: fixed;
            top: 50%;
            left: 50%;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            z-index: -1;
            transform: translate(-50%, -50%);
            object-fit: cover;
        }

        h1,
        p,
        label,
        button,
        a {
            font-family: 'Prompt', sans-serif;
        }
    </style>

</head>

<body>

    <main>
        <div class="container">

            <!-- Video Background -->
            <video autoplay muted loop>
                <source src="<?= $path ?>assets/video/background2.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-12 d-flex flex-column align-items-center justify-content-center">

                            <div class="d-flex justify-content-center py-4">
                                <a href="index.php" class="logo d-flex align-items-center w-auto">
                                    <!-- <img src="assets/img/logo.png" alt=""> -->
                                    <span class="d-none d-lg-block text-white">CM</span>
                                </a>
                            </div><!-- End Logo -->

                            <div class="card mb-3">

                                <div class="card-body">

                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">เข้าสู่ระบบ</h5>
                                        <p class="text-center small">กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ</p>
                                    </div>

                                    <form class="row g-3 needs-validation" novalidate>

                                        <div class="col-12">
                                            <label for="yourUsername" class="form-label">ชื่อผู้ใช้</label>
                                            <div class="input-group has-validation">
                                                <input type="text" name="username" class="form-control" id="yourUsername" required>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">รหัสผ่าน</label>
                                            <input type="password" name="password" class="form-control" id="yourPassword" required>
                                        </div>

                                        <!-- <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                                                <label class="form-check-label" for="rememberMe">Remember me</label>
                                            </div>
                                        </div> -->
                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit" id="button_login">เข้าสู่ระบบ</button>
                                        </div>
                                        <!-- <div class="col-12">
                                            <p class="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                                        </div> -->
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

        </div>
    </main><!-- End #main -->

    <?php include_once './components/footer.php' ?>

    <script src="<?= $path ?>js/common/convert_form_data_to_json.js"></script>
    <script src="<?= $path ?>js/common/handle_error.js"></script>
    <script src="<?= $path ?>js/login/login.js"></script>

</body>

</html>