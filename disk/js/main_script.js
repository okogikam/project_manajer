class mainScript {
    constructor() {
        this.el = document.querySelector("body");
        // this.doneLoadData = false;
    }    
    async getMetod(conf){
        let response = await fetch(`https://script.google.com/macros/s/AKfycbx9xge5bw6ahjMWq-ZzNwarETFlKzEIsH2Xi0uye8ocC1mgno2AqvZY99tH14rcKkpH/exec?db=${conf.db}${conf.attr}`)
        .then(res => res.json());
        return response;
    }
    loading(){
        let loading = this.el.querySelector(".loading");
        loading.style.display = "flex";
    }
    loadDone(){
        let loading = this.el.querySelector(".loading");
        loading.style.display = "none";
    }
}

