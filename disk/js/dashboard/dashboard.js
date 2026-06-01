class dashboard extends mainScript {
    async init(){
        console.log('dashboard');
        await super.getMetod({db:'dashboard',attr:''}).then(res => {
            console.log(res);
        });
    }
}

window.initdashboard = function () {
    const d = new dashboard();
    d.init();
};