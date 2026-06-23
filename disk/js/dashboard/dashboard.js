class dashboard extends mainScript {
    constructor(mc) {
        super();
        this.project = mc.project;
        this.task = mc.task;
        this.log = mc.log;
        this.userList = mc.userList;
    }
    async LoadData(){
        const [
            project,
            task,
            log,
            userList
        ] = await Promise.all([
            super.getMetod({ db: 'db_project', attr: '' }),
            super.getMetod({ db: 'db_task', attr: '' }),
            super.getMetod({ db: 'db_log', attr: '' }),
            super.getMetod({ db: 'db_user', attr: '' })
        ]);

        this.project = project;
        this.task = task;
        this.log = log;
        this.userList = userList;

        this.doneLoadData = true;
    }
    displayProject(){
        let card = this.el.querySelector("#card-project");
        let projectAktif = 0;
        let projectBaru = 0;
        this.project.forEach(p => {
            if(p.is_active == "1"){
                projectAktif++;
                let startDate = new Date(p.start_date);
                if(startDate >= new Date().setDate(new Date().getDate() - 30)){
                    projectBaru++;
                }
            }
        });
        card.innerHTML = `
        <div class="card-title">Jumlah Proyek Aktif</div>
        <div class="card-value">${projectAktif}</div>
        <div class="card-sub">${projectBaru} proyek baru bulan ini</div>
        `    }
    displayDeadline(){
        let card = this.el.querySelector("#card-deadline");
        let today = new Date();
        let projectDeadline = {"deadline":365,"project":""};
        this.project.forEach(p => {
            let deadline = new Date(p.deadline);
            let nearDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            if(nearDeadline > 0 && nearDeadline < projectDeadline.deadline){
                projectDeadline.deadline = nearDeadline;
                projectDeadline.project = p.title;
            }
        });
        card.innerHTML = `
        <div class="card-title">Deadline Terdekat</div>
        <div class="card-value">${Math.ceil(projectDeadline.deadline)} Hari</div>
        <div class="card-sub">${projectDeadline.project}</div>
        `;
    }
    taskSelesai(){
        let card = this.el.querySelector("#card-task-done");
        let taskDone = 0;
        // task status: done, progress, todo, review
        this.task.forEach(t => {
            if(t.status == "done"){
                taskDone++;
            }
        });
        card.innerHTML = `
        <div class="card-title">Task Selesai</div>
        <div class="card-value">${taskDone}</div>
        <div class="card-sub">${Math.round((taskDone / this.task.length) * 100)}% completion rate</div>
        `;
    }
    taskBelumSelesai(){
        let card = this.el.querySelector("#card-task-notdone");
        let taskNotDone = 0;
        // task status: done, progress, todo, review
        this.task.forEach(t => {
            if(t.status != "done"){
                taskNotDone++;
            }
        });
        card.innerHTML = `
        <div class="card-title">Task Belum Selesai</div>
        <div class="card-value">${taskNotDone}</div>
        <div class="card-sub">Perlu tindak lanjut</div>
        `;
    }
    tableTask(){
        let table = this.el.querySelector("#dataTask");
        let html = "";
        this.task.forEach(t => {
            let project = this.project.find(p => p.id_project == t.project_id);
            html += `
            <tr>
                <td>${t.title}</td>
                <td>${project ? project.title : "Project Tidak Ditemukan"}</td>
                <td><span class="status ${t.status}">${t.status}</span></td>
                <td>${t.deadline.split("T")[0]}</td>
            </tr>
            `;
        });
        table.innerHTML = html;
    }
    async logList(){
        let list = this.el.querySelector("#logList");
        let html = "";
        // sort task by deadline
        this.log.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        for(let i = 0; i < 6 && i < this.log.length; i++){
            let l = this.log[i];
            let user = this.userList.find(u => u.id_user == l.user_id);
            html += `
            <div class="activity-item">
                <div class="activity-title">${user ? user.nama : "User Tidak Ditemukan"} menambahkan task baru</div>
                <div class="activity-time">${l.created_at.replace("T", " ")}</div>
            </div>
            `;
        };
        list.innerHTML = html;
    }
    async init(){
        super.loading();

        // await this.LoadData();

        this.displayProject();
        this.displayDeadline();
        this.taskSelesai();
        this.taskBelumSelesai();

        this.tableTask();
        this.logList();

        super.loadDone();
    }
}

window.initdashboard = function () {
    const d = new dashboard();
    d.init();
};