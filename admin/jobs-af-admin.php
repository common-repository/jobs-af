<?php
if (!class_exists('JobsAfSettings')) {
    class JobsAfSettings
    {
        // Construct function
        public function __construct()
        {
            add_action('admin_menu', [$this, 'add_menu_items_to_admin_dashbaord']);
            add_action('admin_init', [$this, 'setup_sections']);
            add_action('admin_init', [$this, 'setup_fields']);
            add_filter('plugin_action_links_' . JOBS_AF_PLUGIN_BASE, [$this, 'jobs_af_settings_link']);
        }

        // Add configure link in plugins list
        public function jobs_af_settings_link($links)
        {
            $jobs_af_link = [
                'Settings' => '<a href="' . esc_attr(get_admin_url(null, 'admin.php?page=jobs_af')) . '">' . __('Setup') . '</a>'
            ];
            return array_merge($links, $jobs_af_link);
        }

        // Add menu items to wordpress admin panel
        public function add_menu_items_to_admin_dashbaord()
        {
            add_menu_page(
                'Jobs.af',
                'Jobs.af',
                'manage_options',
                'jobs_af',
                [$this, 'jobs_af_plugin_setup_page'],
                plugin_dir_url(__DIR__) . 'images/jobs.af.png',
                100
            );
        }

        // Add Sections to wordpress admin
        public function setup_sections()
        {
            $sections = [
                [
                    'id' => 'setup_organization_setion',
                    'title' => 'Setup organization',
                    'callback' => null,
                    'fields' => 'jobs_af_fields',
                ],
            ];

            foreach ($sections as $section) {
                add_settings_section(
                    $section['id'],
                    $section['title'],
                    $section['callback'],
                    $section['fields']
                );
            }
        }

        // Add custom fields to admin
        public function setup_fields()
        {
            $fields = [
                [
                    'uid' => 'job_af_org_slug',
                    'label' => 'Organization Slug',
                    'section' => 'setup_organization_setion',
                    'type' => 'text',
                    'options' => false,
                    'placeholder' => '',
                    'supplemental' => 'You can find your organization slug from <a href="https://www.jobs.af/employer">https://www.jobs.af/employer</a>',
                    'default' => ''
                ],
            ];

            foreach ($fields as $field) {
                add_settings_field($field['uid'], $field['label'], [$this, 'field_callback'], 'jobs_af_fields', $field['section'], $field);
                register_setting('jobs_af_fields', $field['uid']);
            }
        }

        // Fields callbacks
        public function field_callback($arguments)
        {
            $value = get_option($arguments['uid']);
            if (!$value) {
                $value = $arguments['default'];
            }

            switch ($arguments['type']) {
                case 'text':
                    printf('<input name="%1$s" id="%1$s" type="%2$s" placeholder="%3$s" value="%4$s" class="regular-text" />', $arguments['uid'], $arguments['type'], $arguments['placeholder'], $value);
                    break;
            }

            if ($supplimental = $arguments['supplemental']) {
                printf('<p class="description">%s</p>', $supplimental);
            }
        }

        // Jobs.af plugin, setup organization page content
        public function jobs_af_plugin_setup_page()
        {
?>
            <div class="wrap">
                <h2>Jobs.af</h2>
                <?php settings_errors() ?>
                <form method="post" action="options.php">
                    <?php
                    settings_fields('jobs_af_fields');
                    do_settings_sections('jobs_af_fields');
                    submit_button();
                    ?>
                </form>
            </div>
<?php
        }
    }
    new JobsAfSettings();
}
