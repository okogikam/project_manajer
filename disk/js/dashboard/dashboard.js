class dashboard extends mainScript {
    constructor() {
        super();
    }
    async LoadData(){
        this.project = await super.getMetod({db:'db_project',attr:''});
        this.task = await super.getMetod({db:'db_task',attr:''});
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
        `
    }
    async init(){
        await this.LoadData();
        this.displayProject();
        console.log(this.task[0]);
    }
}

window.initdashboard = function () {
    const d = new dashboard();
    d.init();
};