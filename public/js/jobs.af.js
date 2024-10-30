/**
 * jobs_af array store all generated classes
 */
var jobs_af = jobs_af || [];
/**
 * jobs_af base urls
 */
var jobsAfurl = {
    webBase: "https://www.jobs.af/",
    apiBase: "https://www.jobs.af/api/v2.4/"
};

/**
 * Jobs Af / List type class
 */
class JobsAfList {

    /**
     * Constructor
     * Get jobs object and save
     * @param {*} jobs 
     */
    constructor(jobs){
        this.jobs = jobs;
    }

    /**
     * Return rendered list html doms
     */
    getContainer(){
        var renderedList = ``;
        this.jobs.forEach((job) => {
            renderedList += this.renderListItem(job);
        });

        return this.renderContainer(renderedList);
    }

    /**
     * Render html dom
     * @param {*} renderedList 
     */
    renderContainer(renderedList){
        return '<div class="job-af-list">' + renderedList + '</div>';
    }

    /**
     * Return rendered job list item
     * @param {*} job 
     */
    renderListItem(job){
        return `
            <div class="jobs-af-list-item">
                <div class="jobs-af-list-item-photo"><img src="${this.renderListItemPhoto(job.company)}" /></div>
                <div class="jobs-af-list-item-content">
                    <div class="jobs-af-list-item-content-title">
                        <div class="title">
                            <a target="_blank" href="${jobsAfurl.webBase + "jobs/" + job.slug}">${job.position}</a>
                        </div>
                        <div class="status">
                            ${this.renderListItemStatus(job.status)}
                            ${this.renderListItemGender(job.gender)}
                            ${this.renderListItemFeatured(job.isFeatured)}
                        </div>
                    </div>
                    <div class="jobs-af-list-item-content-details">
                        <div class="details">
                            <span class="date">${this.renderListItemDate(job.expireDate)}</span> | <span>${job.locations[0]}, ${job.locations[1]}</span>
                        </div>
                        <div class="actions">
                            <a  target="_blank" class="apply-link" href="${jobsAfurl.webBase + "jobs/" + job.slug + "/apply"}">Apply</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Handle job list photo
     * @param {*} company 
     */
    renderListItemPhoto(company){
        if (company.businessUnit.logo != undefined || company.businessUnit.logo != null) {
            return jobsAfurl.apiBase + "uploadFile/" + company.businessUnit.logo.container + "/" + company.businessUnit.logo.name;
        } else {
            if (company.logo != undefined || company.logo != null) {
                return jobsAfurl.apiBase + "uploadFile/" + company.logo.container + "/" + company.logo.name;
            } else {
                return "https://www.jobs.af/assets/img/img/company.jpg";
            }
        }
    }

    /**
     * Handle job list item gender
     * @param {*} gender 
     */
    renderListItemGender(gender) {
        if (gender != "Any") {
          return `<span class="gender">${gender}</span>`;
        } else {
          return ``;
        }
      }
    
    /**
     * Handle job list item status
     * @param {*} status 
     */
    renderListItemStatus(status) {
        if (status == 'New') {
            return `<span class="status-badge">New</span>`;
        } else {
            return ``;
        }
    }
    
    /**
     * Handle job list isFeatured status
     * @param {*} isFeatured 
     */
    renderListItemFeatured(isFeatured) {
        if (isFeatured) {
            return `<span class="is-promoted">Promoted</span>`;
        } else {
            return ``;
        }
    }

    /**
     * Handle and convert job close date to human readable
     * @param {*} dateString 
     */
    renderListItemDate(dateString) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const expireDate = new Date(dateString);
        return monthNames[expireDate.getMonth()] + ' ' + (expireDate.getDay() + 1) + ', ' + expireDate.getFullYear();
    }
}

/**
 * Jobs Af / Table type class
 */
class JobsAfTable {

    /**
     * Constructor
     * Get jobs object and save
     * @param {*} jobs 
     */
    constructor(jobs){
        this.jobs = jobs;
    }

    /**
     * Return rendered list html doms
     */
    getContainer(){
        var renderedList = ``;
        this.jobs.forEach((job) => {
            renderedList += this.renderTableItem(job);
        });

        return this.renderContainer(renderedList);
    }

    /**
     * Render html dom
     * @param {*} renderedList 
     */
    renderContainer(renderedList){
        return `<div class="jobs-af-table">
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Close date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>${renderedList}</tbody>
            </table>
        </div>`;
    }

    /**
     * Return rendered job list item
     * @param {*} job 
     */
    renderTableItem(job){
        return `
            <tr>
                <td class="title">
                    <a href="${jobsAfurl.webBase + "jobs/" + job.slug}">${job.position}</a>
                    ${this.renderTableItemStatus(job.status)}
                    ${this.renderTableItemGender(job.gender)}
                    ${this.renderTableItemFeatured(job.isFeatured)}
                </td>
                <td class="location"><span>${job.locations[0]}, ${job.locations[1]}</span></td>
                <td class="date">${this.renderTableItemDate(job.expireDate)}</td>
                <td class="action"><a  target="_blank" class="apply-link" href="${jobsAfurl.webBase + "jobs/" + job.slug + "/apply"}">Apply</a></td>
            </tr>
        `;
    }

    /**
     * Handle job table photo
     * @param {*} company 
     */
    renderTableItemPhoto(company){
        if (company.businessUnit.logo != undefined || company.businessUnit.logo != null) {
            return jobsAfurl.apiBase + "uploadFile/" + company.businessUnit.logo.container + "/" + company.businessUnit.logo.name;
        } else {
            if (company.logo != undefined || company.logo != null) {
                return jobsAfurl.apiBase + "uploadFile/" + company.logo.container + "/" + company.logo.name;
            } else {
                return "https://www.jobs.af/assets/img/img/company.jpg";
            }
        }
    }

    /**
     * Handle job table item gender
     * @param {*} gender 
     */
    renderTableItemGender(gender) {
        if (gender != "Any") {
          return `<span class="gender">${gender}</span>`;
        } else {
          return ``;
        }
      }
    
    /**
     * Handle job table item status
     * @param {*} status 
     */
    renderTableItemStatus(status) {
        if (status == 'New') {
            return `<span class="status-badge">New</span>`;
        } else {
            return ``;
        }
    }
    
    /**
     * Handle job table isFeatured status
     * @param {*} isFeatured 
     */
    renderTableItemFeatured(isFeatured) {
        if (isFeatured) {
            return `<span class="is-promoted">Promoted</span>`;
        } else {
            return ``;
        }
    }

    /**
     * Handle and convert job close date to human readable
     * @param {*} dateString 
     */
    renderTableItemDate(dateString) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const expireDate = new Date(dateString);
        return monthNames[expireDate.getMonth()] + ' ' + (expireDate.getDay() + 1) + ', ' + expireDate.getFullYear();
    }
}


/**
 * Jobs Af / Widget type class
 */
class JobsAfWidget {

    /**
     * Constructor
     * Get jobs object and save
     * @param {*} jobs 
     */
    constructor(jobs){
        this.jobs = jobs;
    }

    /**
     * Return rendered list html doms
     */
    getContainer(){
        var renderedList = ``;
        this.jobs.forEach((job) => {
            renderedList += this.renderWidgetItem(job);
        });

        return this.renderContainer(renderedList);
    }

    /**
     * Render html dom
     * @param {*} renderedList 
     */
    renderContainer(renderedList){
        return '<div class="job-af-widget">' + renderedList + '</div>';
    }

    /**
     * Return rendered job widget item
     * @param {*} job 
     */
    renderWidgetItem(job){
        return `
            <div class="jobs-af-widget-item">
                <div class="jobs-af-widget-item-photo"><img src="${this.renderWidgetItemPhoto(job.company)}" /></div>
                <div class="jobs-af-widget-item-content">
                    <div class="jobs-af-widget-item-content-title">
                        <div class="title">
                            <a target="_blank" href="${jobsAfurl.webBase + "jobs/" + job.slug}">${job.position}</a>
                        </div>
                    </div>
                    <div class="jobs-af-widget-item-content-details">
                        <div class="details">
                            <span class="date">${this.renderWidgetItemDate(job.expireDate)}</span> | <span>${job.locations[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Handle job widget photo
     * @param {*} company 
     */
    renderWidgetItemPhoto(company){
        if (company.businessUnit.logo != 'undefined' || company.businessUnit.logo != null) {
            return jobsAfurl.apiBase + "uploadFile/" + company.businessUnit.logo.container + "/" + company.businessUnit.logo.name;
        } else {
            if (company.logo != 'undefined' || company.logo != null) {
                return jobsAfurl.apiBase + "uploadFile/" + company.logo.container + "/" + company.logo.name;
            } else {
                return "https://www.jobs.af/assets/img/img/company.jpg";
            }
        }
    }

    /**
     * Handle and convert job close date to human readable
     * @param {*} dateString 
     */
    renderWidgetItemDate(dateString) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const expireDate = new Date(dateString);
        return monthNames[expireDate.getMonth()] + ' ' + (expireDate.getDay() + 1) + ', ' + expireDate.getFullYear();
    }
}

/**
 * JobsAf Class
 */
class JobsAf {

    /**
     * Construct class
     * @param {*} htmlDom 
     */
    constructor(htmlDom){

        /**
         * class html object variables
         */
        this.domData = {
            object: null,
            orgSlug: "",
            domIdentifier: "",
            type: "list",
        };

        /**
         * class pagination variables
         */
        this.pagination = {
            hasPaginate: false,
            rowsPerPage: 25,
            totalRows: 0,
            limit: 25,
            skip: 0,
            totalPages: 1,
            currentPage: 1,

            /**
             * Go to next page if list is is more than rows-per-page
             */
            goNextPage: () => {
                this.pagination.skip += this.pagination.rowsPerPage;
                this.cycledApiCall('next', () => this.renderContent());
            },

            /**
             * Go to prev page
             */
            goPrevPage: () => {
                this.pagination.skip -= this.pagination.rowsPerPage;
                this.cycledApiCall('prev', () => this.renderContent());
            }
        };

        /**
         * Store jobs
         */
        this.jobs = [];

        /**
         * Assign all html dom arguments to class parameters
         */
        this.domData.orgSlug = htmlDom.getAttribute("data-org-slug");
        this.domData.domIdentifier = htmlDom.getAttribute("id");
        this.domData.type = htmlDom.getAttribute("data-type");
        this.domData.object = htmlDom;
        this.pagination.rowsPerPage = parseInt(htmlDom.getAttribute("data-perpage"));
        this.pagination.limit = parseInt(htmlDom.getAttribute("data-perpage"));

        /**
         * If list type is slider hide pagination links
         */
        if(htmlDom.getAttribute("data-type") == 'slider'){
            this.pagination.hasPaginate = false;
        } else {
            this.pagination.hasPaginate = (htmlDom.getAttribute("data-has-paginate") == 'true');
        }
    }

    /**
     * Load Api
     * Load the jobs for the first time
     */
    initialApiCall(onSucess){

        /**
         * Filter for jobs list
         */
        const filter = {
            limit: this.pagination.limit,
            skip: this.pagination.skip
        };

        /**
         * Get request to jobs list
         */
        const _requestJobList = axiosjs.get(jobsAfurl.apiBase + 'jobs/company/' + this.domData.orgSlug, {
            params: {
                filter: filter
            }
        });

        /**
         * Get request to jobs total rows
         */
        const _requestJobsCount = axiosjs.get(jobsAfurl.apiBase + 'jobs/company/' + this.domData.orgSlug + '/count');

        /**
         * Send 2 request to server to get same time response
         */
        axiosjs.all([_requestJobList, _requestJobsCount]).then(axiosjs.spread((...responses) => {

            // Save all retruned jobs to class parameter
            this.jobs = responses[0].data;
            // Save total returned row to pagination totalPages parameter
            this.pagination.totalRows = parseInt(responses[1].data);
            // Do pagination and save number of pages
            this.pagination.totalPages = (parseInt(this.pagination.totalRows / this.pagination.rowsPerPage) + ((this.pagination.totalRows % this.pagination.rowsPerPage) > 0 ? 1 : 0));
            // Call onSuccess callback
            onSucess();
        })).catch((err) => this.renderErrorMessage(err));
    }

    cycledApiCall(action = 'next', onSuccess){
        
        /**
         * Filter for jobs list
         */
        const filter = {
            limit: this.pagination.limit,
            skip: this.pagination.skip
        };

        /**
         * Display a loading image and text while loading next page data
         */
        this.renderLoadingBar();

        /**
         * Send a get request to return next page jobs list
         */
        axiosjs.get(jobsAfurl.apiBase + 'jobs/company/' + this.domData.orgSlug, {
            params: {
                filter: filter
            }
        }).then((res) => {

            /**
             * Determine wheter it's next page or prev page
             */
            if(action == 'next'){
                this.pagination.currentPage++;
            } else if(action == 'prev'){
                this.pagination.currentPage--;
            }

            /**
             * Save returned data to jobs variable
             */
            this.jobs = res.data;

            /**
             * If success call onSuccess callback
             */
            onSuccess();
        }).catch((err) => this.renderErrorMessage());
    }

    /**
     * Initialize function
     */
    initialize(){
        this.initialApiCall(() => this.renderContent());
    }
    
    /**
     * Render jobs content
     */
    renderContent(){
        var _finalContent = ``;

        if(this.pagination.totalRows > 0){
            var _content = ``;
            
            if(this.domData.type == 'widget'){
                const widgetContent = new JobsAfWidget(this.jobs);
                _content = widgetContent.getContainer();
            } else if(this.domData.type == 'table'){
                const tableContent = new JobsAfTable(this.jobs);
                _content = tableContent.getContainer();
            } else {
                const listContent = new JobsAfList(this.jobs);
                _content = listContent.getContainer();
            }

            _content += `<div class='jobs-af-footer'>`;

            if(this.pagination.hasPaginate){
                _content += this.renderPagination();
            }

            _content += `<div class='jobs-af-branding'>Powered by <a href="https://www.jobs.af">Jobs.af</a></div>`;

            _content += `</div>`;

            _finalContent = _content;

        } else {
            _finalContent = this.renderNoJobMessage();
        }

        this.domData.object.innerHTML = _finalContent;
    }

    /**
     * Render pagination links
     */
    renderPagination(){
        
        var _paginationContent = ``;
        var prevDisabled = false;
        var nextDisabled = false;

        if(this.pagination.currentPage == 1){
            prevDisabled = true;
        }

        if(this.pagination.currentPage == this.pagination.totalPages){
            nextDisabled = true;
        }

        _paginationContent = `<div class="job-af-pagination">`;

        _paginationContent += `<span class='page-counter'>Page ${this.pagination.currentPage} of ${this.pagination.totalPages}</span>`;

        if(!prevDisabled){
            _paginationContent += `<a data-id='${this.domData.domIdentifier}' onClick="jobsAfPrevPage(this)" class="job-af-paginate-item job-af-paginate-prev">Prev</a>`;
        }

        if(!prevDisabled && !nextDisabled){
            _paginationContent += `<span class='job-af-paginate-spacer'></span>`;
        }

        if(!nextDisabled){
            _paginationContent += `<a data-id='${this.domData.domIdentifier}' onClick="jobsAfNextPage(this)" class="job-af-paginate-item job-af-paginate-next">Next</a>`;
        }

        _paginationContent += `</div>`;

        return _paginationContent;
    }

    /**
     * Render and display an error message if error occured while loading jobs
     * @param {*} err 
     */
    renderErrorMessage(err){
        console.log(err);
        this.domData.object.innerHTML = `
            <div class="jobs-af-loading-error">
                An error occured while loading vacancies.
            </div>
        `;
    }

    /**
     * Return a loding bar
     */
    renderLoadingBar(){
        this.domData.object.innerHTML = `
        <div class='jobs-af-loading-container'>
            <div class="job-af-loading-image">
                <svg width="32" height="32" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#161616">
                    <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)" stroke-width="2">
                            <circle stroke-opacity=".2" cx="18" cy="18" r="18"/>
                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="1s"
                                    repeatCount="indefinite"/>
                            </path>
                        </g>
                    </g>
                </svg>
            </div>
            <span class='jobs-af-loading-label'>Loading Jobs</span>
        </div>
        `;
    }

    /**
     * Return a empty job message
     */
    renderNoJobMessage(){
        return `
            <div class="jobs-af-no-vacancy">
                <img src="https://d1710klmre1nu.cloudfront.net/assets/img/img/404.png" class="image" />
                <div class="text">No vacancies are available for now.</div>
            </div>  
        `;
    }

}


/**
 * Load all html DOMs
 * Create classes > Add to array > initialize class 
 */
document.querySelectorAll(".jobs-af").forEach( (htmlDom) => {
    jobs_af.push({
        id: htmlDom.getAttribute("id"),
        class: new JobsAf(htmlDom),
    });
    jobs_af.filter(classObj => classObj.id === htmlDom.getAttribute("id"))[0].class.initialize();
});

/**
 * Handle next page
 * @param {*} button 
 */
function jobsAfNextPage(button){
    jobs_af.filter(classObj => classObj.id === button.getAttribute("data-id"))[0].class.pagination.goNextPage();
}

/**
 * Handle prev page
 * @param {*} button 
 */
function jobsAfPrevPage(button){
    jobs_af.filter(classObj => classObj.id === button.getAttribute("data-id"))[0].class.pagination.goPrevPage();
}