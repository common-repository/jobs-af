<?php

/**
 * Jobs.af
 *
 * @package           Jobs.af
 * @author            NETLINKS LTD Developers Team
 * @copyright         2020 NETLINKS LTD
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Jobs.af
 * Plugin URI:        https://www.jobs.af/
 * Description:       Jobs.af is Afghanistan's first one-stop web portal for employers and jobseekers to connect and network within the site's comprehensive database. With this plugin, you will be able to list all your announced jobs on the website.
 * Version:           1.0.1
 * Requires at least: 4.3
 * Requires PHP:      5
 * Tested up to:      5.6
 * Author:            NETLINKS LTD
 * Author URI:        https://netlinks.net
 * Text Domain:       jobs_af
 * License:           GPLv2
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */


if (!defined('JOBS_AF_PLUGIN_BASE')) {
    define('JOBS_AF_PLUGIN_BASE', plugin_basename(__FILE__));
}

// Include widgets
require_once __DIR__ . '/admin/jobs-af-widgets.php';

if (is_admin()) {
    // Include only if we're in admin panel
    require_once __DIR__ . '/admin/jobs-af-admin.php';
}

if (!is_admin()) {
    // Include public functions
    require_once __DIR__ . '/public/jobs-af-public.php';
}
