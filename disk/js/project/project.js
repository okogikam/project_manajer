class project extends mainScript {
    constructor(mc) {
        super();
        this.project = mc.project;
    }
    async LoadData(){
        let response = await super.getMetod({ db: 'db_project', attr: '' });
        this.project = response;
        this.doneLoadData = true;
    }
    showProject(){
        let projectList = this.el.querySelector(".project-list");
        projectList.innerHTML = "";
        this.project.forEach(p => {
            let projectItem = document.createElement("div");
            projectItem.classList.add("project-card");
            projectItem.innerHTML = `
             <div class="project-header">
                <div class="project-title">
                ${p.title}
                </div>
                <span class="status ${p.status}">
                ${p.status}
                </span>
            </div>

            <div class="project-desc">
                ${p.diskripsi}
            </div>

            <div class="project-meta">
                <div>
                Mulai: ${p.start_date.replace("T", ' ')}
                </div>

                <div>
                Deadline: ${p.deadline.replace("T", ' ')}
                </div>
            </div>
            `;
            projectList.appendChild(projectItem);
        });
    }
    async init(){
        super.loading();
        // await this.LoadData();
        this.showProject();
        super.loadDone();
    }
}

window.initproject = function () {
    const p = new project();
    p.init();
};