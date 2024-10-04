<!-- ======= Header ======= -->
<header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
        <a href="<?= $path ?>index.php" class="logo d-flex align-items-center">
            <!-- <img src="<?= $path ?>assets/img/logo.png" alt=""> -->
            <span class="d-none d-lg-block">CM</span>
        </a>
        <i class="bi bi-list toggle-sidebar-btn"></i>
    </div><!-- End Logo -->

    <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
                <a class="nav-link nav-icon search-bar-toggle " href="#">
                    <i class="bi bi-search"></i>
                </a>
            </li><!-- End Search Icon-->

            <!-- <li class="nav-item dropdown pe-3">
                <a id="languageDropdown" class="nav-link d-flex align-items-center" href="#" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-grid-fill" style="margin-right: 5px;"></i> Module
                    <i class="bi bi-chevron-down ms-1"></i>
                </a>
                <ul style="width: 400px;" class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                    <div class="row g-1 px-3">
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-cash-coin"></i>
                                    <small>E-Budget</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-clipboard2-check"></i>
                                    <small>Procurement</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-box-seam"></i>
                                    <small>Warehouse</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-gear-wide-connected"></i>
                                    <small>Production Sys</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-handbag"></i>
                                    <small>Sales system</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-people-fill"></i>
                                    <small>Human Resource</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-clipboard-data"></i>
                                    <small>Report</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-person-badge"></i>
                                    <small>Executive</small>
                                </a>
                            </li>
                        </div>
                        <div class="col-lg-4">
                            <li style="background-color: rgb(247, 247, 247);border-radius: 10px;">
                                <a id="lang-en" class="dropdown-item d-flex flex-column align-items-center" href="#">
                                    <i style="font-size: x-large;" class="bi bi-ethernet"></i>
                                    <small>API</small>
                                </a>
                            </li>
                        </div>
                    </div>
                </ul>
            </li> -->

            <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src="<?= $path ?>assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
                    <span class="d-none d-md-block dropdown-toggle ps-2"><?= $_SESSION['firstname'] . ' ' . $_SESSION['lastname'] ?></span>
                </a><!-- End Profile Iamge Icon -->

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                        <h6><?= $_SESSION['firstname'] . ' ' . $_SESSION['lastname'] ?></h6>
                        <span><?= $_SESSION['role'] ?></span>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <!-- <li>
                        <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                            <i class="bi bi-person"></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                            <i class="bi bi-gear"></i>
                            <span>Account Settings</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                            <i class="bi bi-question-circle"></i>
                            <span>Need Help?</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li> -->

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="#" onclick="logout()">
                            <i class="bi bi-box-arrow-right"></i>
                            <span>ออกจากระบบ</span>
                        </a>
                    </li>

                </ul><!-- End Profile Dropdown Items -->
            </li><!-- End Profile Nav -->

        </ul>
    </nav><!-- End Icons Navigation -->

</header><!-- End Header -->