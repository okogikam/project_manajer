class task extends mainScript {
    constructor(mc) {
        super();
        this.project = mc.project;
        this.task = mc.task;
        this.log = mc.log;
        this.userList = mc.userList;
    }
    taskList(){
        let taskList = this.el.querySelector(".task-list");
        taskList.innerHTML = "";
        this.task.forEach(t => {
            let taskItem = document.createElement("div");
            taskItem.classList.add("task-card");
            taskItem.innerHTML = `
            <div class="task-header"> 
                <div style="max-width: 50%;">
                    <div class="task-title">
                        ${t.title}
                    </div>
                    <span class="task-member">Project: ${this.project.find(p => p.id_project === t.project_id)?.title || 'Unknown'}</span>
                    <div class="task-member">
                        Assign ke: ${this.userList.find(u => u.id_user === t.assigned_to)?.nama || 'Unknown'}                        
                    </div>
                </div>
                <div class="task-badge">
                    <span class="badge ${t.priority}">${t.priority}</span>
                    <span   span class="badge ${t.status}">${t.status}</span>
                </div>
            </div>
            <div class="task-desc">
                ${t.description}
            </div>

            <div class="task-footer">
                <div>Start: ${t.created_at.split('T')[0]}</div>
                <div>Deadline: ${t.deadline.split('T')[0]}</div>
            </div>
            `;
            taskList.appendChild(taskItem);
        });
    }
    async init(){
        super.loading();
        this.taskList();
        super.loadDone();
    }
}