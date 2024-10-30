<?php
if (!class_exists('JobsAfPublic')) {
    class JobsAfPublic
    {
        public function __construct()
        {
            add_shortcode('jobs_af', [$this, 'jobs_af_shortcode']);
            add_action('wp_enqueue_scripts', [$this, 'job_af_plugin_assets']);
        }

        // Add jobs_af shortcode to wordpress
        public function jobs_af_shortcode($attributes)
        {
            $shortCodeUniqueID = uniqid();
            $orgSlug = get_option('job_af_org_slug');
            $atts = shortcode_atts(['type' => 'list', 'items-per-page' => 25], $attributes);
            return "<div class='jobs-af' data-org-slug='{$orgSlug}' data-type='{$atts['type']}' data-perpage='{$atts['items-per-page']}' data-has-paginate='true' id='jobs-af-{$shortCodeUniqueID}'>
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

        // Add jobs.af javascript & stylesheets to the site
        function job_af_plugin_assets($hook)
        {
            wp_enqueue_script("jobs_af_polyfill", "https://polyfill.io/v3/polyfill.min.js?features=Promise%2CPromise.prototype.finally", [], null, true);
            wp_enqueue_script("jobs_af_axiosjs", plugins_url('js/axiosjs.min.js', __FILE__), [], null, true);
            wp_enqueue_script("jobs_af_scripts", plugins_url('js/jobs.af.min.js', __FILE__), [], null, true);
            wp_enqueue_style('jobs_af_style', plugins_url('css/jobs.af.min.css', __FILE__),  [], null, false);
        }
    }
    new JobsAfPublic();
}
