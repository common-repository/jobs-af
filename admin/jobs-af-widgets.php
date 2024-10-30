<?php

if (!class_exists('JobsAf_ListWidget')) {
    class JobsAf_ListWidget extends WP_Widget
    {
        public function __construct()
        {
            parent::__construct(

                // Base ID of your widget
                'jobs_af_list',

                // Widget name will appear in UI
                __('Jobs.af List', 'jobs_af'),

                // Widget description
                array('description' => __('Display your posted jobs from jobs.af', 'jobs_af'),)
            );
        }

        public function widget($args, $instance)
        {
            $shortCodeUniqueID = uniqid();
            $orgSlug = get_option('job_af_org_slug');
            $atts = ['type' => 'widget', 'items-per-page' => 5];
            echo "<div class='jobs-af' data-org-slug='{$orgSlug}' data-type='{$atts['type']}' data-perpage='{$atts['items-per-page']}' data-has-paginate='true' id='jobs-af-{$shortCodeUniqueID}'>
                <div class='jobs-af-loading-container'>
                    <div class='job-af-loading-image'>
                        <svg width='32' height='32' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke='#161616'>
                            <g fill='none' fill-rule='evenodd'>
                                <g transform='translate(1 1)' stroke-width='2'>
                                    <circle stroke-opacity='.2' cx='18' cy='18' r='18'/>
                                    <path d='M36 18c0-9.94-8.06-18-18-18'>
                                        <animateTransform
                                            attributeName='transform'
                                            type='rotate'
                                            from='0 18 18'
                                            to='360 18 18'
                                            dur='1s'
                                            repeatCount='indefinite'/>
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span class='jobs-af-loading-label'>Loading Jobs</span>
                </div>
            </div>";
        }

        public function form($instance)
        {
        }

        public function update($new_instance, $old_instance)
        {
        }
    }
}


if (!class_exists('JobsAfWidgets')) {
    class JobsAfWidgets
    {
        public function __construct()
        {
            add_action('widgets_init', [$this, 'loadWidgets']);
        }

        public function loadWidgets()
        {
            register_widget('JobsAf_ListWidget');
        }
    }

    new JobsAfWidgets();
}
