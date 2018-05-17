const app={
    init(selectors) {
        this.max=0
        this.list=document.querySelector(selectors.listSelector)
        this.flicks=[]
        document   
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(flick) {
        const item =  document.createElement('li')
        item.dataset.id=flick.id
        item.textContent = flick.name
        return item
    },

    handleSubmit(ev) {
        const f=ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }
        
        this.flicks.unshift(flick)
        console.log(this.flicks)
        const item=this.renderListItem(flick)   //THIS will be the death of me
        this.list.insertBefore(item, this.list.firstElementChild)
        console.log(flick)
        f.reset()
    },
}
app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
})