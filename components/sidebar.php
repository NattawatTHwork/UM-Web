<!-- ======= Sidebar ======= -->
<aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
            <a class="nav-link collapsed" href="/UM-Web/index.php">
                <i class="bi bi-grid"></i>
                <span>Dashboard</span>
            </a>
        </li>

        <!-------------------------------------------------------------- -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#define-parameters" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>กำหนดพารามิเตอร์</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="define-parameters" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#general-parameters" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>กำหนดพารามิเตอร์ทั่วไป</span>
                    </a>
                    <ul id="general-parameters" class="nav-content2 collapse " data-bs-parent="#define-parameters">
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/countries/country_all.php">
                                <i class="bi bi-circle"></i><span>ประเทศ</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/business_types/business_type_all.php">
                                <i class="bi bi-circle"></i><span>ประเภทธุรกิจ</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/companies/company_all.php">
                                <i class="bi bi-circle"></i><span>บริษัท</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#accounting-parameters" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>กำหนดพารามิเตอร์ทางบัญชี</span>
                    </a>
                    <ul id="accounting-parameters" class="nav-content2 collapse " data-bs-parent="#define-parameters">
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/chart_accounts/chart_account_all.php">
                                <i class="bi bi-circle"></i><span>ผังบัญชี</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/group_accounts/group_account_all.php">
                                <i class="bi bi-circle"></i><span>กลุ่มบัญชี</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/fiscal_years/fiscal_year_all.php">
                                <i class="bi bi-circle"></i><span>ชุดการเลือกปีบัญชี</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/period_groups/period_group_all.php">
                                <i class="bi bi-circle"></i><span>กลุ่มงวด</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/transaction_period_groups/transaction_period_group_all.php">
                                <i class="bi bi-circle"></i><span>ชุดงวดการผ่านรายการ</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/transaction_periods/transaction_period_all.php">
                                <i class="bi bi-circle"></i><span>งวดการผ่านรายการ</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#sales" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>การขาย</span>
                    </a>
                    <ul id="sales" class="nav-content2 collapse " data-bs-parent="#define-parameters">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>กลุ่ม</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ประเภท</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#package" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>แพ็คเกจ</span>
                    </a>
                    <ul id="package" class="nav-content2 collapse " data-bs-parent="#define-parameters">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ไลฟ์สไตล์</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>พื้นที่</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#notification" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>การแจ้งเตือน</span>
                    </a>
                    <ul id="notification" class="nav-content2 collapse " data-bs-parent="#define-parameters">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>อีเมล</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ไลน์</span>
                            </a>
                        </li>
                    </ul>
                </li>

            </ul>
        </li>

        <!-------------------------------------------------------------- -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#accounting-system" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>ระบบบัญชี</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="accounting-system" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#general-ledger-system" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>ระบบบัญชีแยกประเภท</span>
                    </a>
                    <ul id="general-ledger-system" class="nav-content2 collapse " data-bs-parent="#accounting-system">
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/central_general_ledgers/central_general_ledger_all.php">
                                <i class="bi bi-circle"></i><span>บัญชีแยกประเภททั่วไปส่วนกลาง</span>
                            </a>
                        </li>
                        <li>
                            <a href="<?= $path_link ?>SAP-Web/general_ledgers/general_ledger_all.php">
                                <i class="bi bi-circle"></i><span>บัญชีแยกประเภททั่วไป</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ข้อมูลหลักบัญชี</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>บันทึกบัญชีทั่วไป</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายงานทางบัญชี</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>งบการเงิน</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#accounts-receivable-system" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>ระบบบัญชีลูกหนี้</span>
                    </a>
                    <ul id="accounts-receivable-system" class="nav-content2 collapse " data-bs-parent="#accounting-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ข้อมูลหลักลูกหนี้</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>การบันทึกรายการลูกหนี้</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>บันทึกการรับ</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายงานลูกหนี้</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#accounts-payable-system" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>ระบบบัญชีเจ้าหนี้</span>
                    </a>
                    <ul id="accounts-payable-system" class="nav-content2 collapse " data-bs-parent="#accounting-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ข้อมูลหลักเจ้าหนี้</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>การบันทึกรายการเจ้าหนี้</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>บันทึกการจ่าย</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายงานเจ้าหนี้</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#asset-accounting-system" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>ระบบบัญชีสินทรัพย์</span>
                    </a>
                    <ul id="asset-accounting-system" class="nav-content2 collapse " data-bs-parent="#accounting-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายการหลักทรัพย์สิน</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>บันทึกรายการทรัพย์สิน</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>บันทึกค่าเสื่อมราคา</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายงานทรัพย์สิน</span>
                            </a>
                        </li>
                    </ul>
                </li>

            </ul>
        </li>

        <!-------------------------------------------------------------- -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#financial-system" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>ระบบการเงิน</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="financial-system" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#financial-management-report" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>รายงานบริหารการจัดการการเงิน</span>
                    </a>
                    <ul id="financial-management-report" class="nav-content2 collapse " data-bs-parent="#financial-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายงานกระแสเงินสด</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>รายงานประมาณการด้านการเงิน</span>
                            </a>
                        </li>
                    </ul>
                </li>

            </ul>
        </li>

        <!-------------------------------------------------------------- -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#sales-system" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>ระบบงานขาย</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="sales-system" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                <!-- <li>
                    <a class="nav-link2 collapsed" data-bs-target="#sales" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>การขาย</span>
                    </a>
                    <ul id="sales" class="nav-content2 collapse " data-bs-parent="#sales-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>กลุ่ม</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ประเภท</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#package" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>แพ็คเกจ</span>
                    </a>
                    <ul id="package" class="nav-content2 collapse " data-bs-parent="#sales-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ไลฟ์สไตล์</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>พื้นที่</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="nav-link2 collapsed" data-bs-target="#notification" data-bs-toggle="collapse" href="#">
                        <i class="bi bi-circle"></i><span>การแจ้งเตือน</span>
                    </a>
                    <ul id="notification" class="nav-content2 collapse " data-bs-parent="#sales-system">
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>อีเมล</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="bi bi-circle"></i><span>ไลน์</span>
                            </a>
                        </li>
                    </ul>
                </li> -->

            </ul>
        </li>

        <!-------------------------------------------------------------- -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#human-resources-system" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>ระบบทรัพยากรบุคคล</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="human-resources-system" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a href="<?= $path_link ?>Human_Resources-Web/time_attendances/time_attendance.php">
                        <i class="bi bi-circle"></i><span>เวลาเข้า-ออกงาน</span>
                    </a>
                </li>
                <li>
                    <a href="<?= $path_link ?>Human_Resources-Web/events/event.php">
                        <i class="bi bi-circle"></i><span>กิจกรรม</span>
                    </a>
                </li>
            </ul>
        </li>


        <!-------------------------------------------------------------- -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#user-management" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>ระบบบริหารผู้ใช้ระบบงาน</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="user-management" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a href="<?= $path_link ?>UM-Web/roles/role_all.php">
                        <i class="bi bi-circle"></i><span>สิทธิ์</span>
                    </a>
                </li>
                <li>
                    <a href="<?= $path_link ?>UM-Web/users/user_all.php">
                        <i class="bi bi-circle"></i><span>ผู้ใช้</span>
                    </a>
                </li>
            </ul>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
                <i class="bi bi-grid"></i>
                <span>ระบบงบประมาณ</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
                <i class="bi bi-grid"></i>
                <span>ระบบจัดซื้อจัดจ้าง</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
                <i class="bi bi-grid"></i>
                <span>ระบบคลังสินค้า</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
                <i class="bi bi-grid"></i>
                <span>ระบบการผลิต</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
                <i class="bi bi-grid"></i>
                <span>ระบบรายงาน</span>
            </a>
        </li>

    </ul>

</aside><!-- End Sidebar-->