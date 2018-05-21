const app={
    init(selectors) {
        this.max=0
        this.list=document.querySelector(selectors.listSelector)
        this.flicks=[]
        this.template=document.querySelector(selectors.templateSelector)
        document   
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    removeListItem(ev){
        ev.preventDefault()
        const button=ev.target
        const flick = button.parentNode.parentNode
        flick.remove()
        for(let i=0; i<this.flicks.length; i++)
        {
            const indexId = this.flicks[i].id.toString()
            if(flick.dataset.id===indexId){
                this.flicks.splice(i, 1)
                break
            }        
        }
        console.log(this.flicks)
    },

    favoriteListItem(ev){
        const button = ev.target
        const flick = button.parentNode.parentNode

        flick.classList.toggle("fav")
        if(flick.dataset.fav===true)
        {
            flick.dataset.fav = false
        }
        else{
            flick.dataset.fav=true
        }

    },

    upFunction(flick, ev){
        const flickId=flick.id.toString()
        const flickListItem=ev.target.parentNode.parentNode
        const position=this.flicks.indexOf(flick)
        if(position>0)
        {
            const toSwitch=this.flicks[position-1]
            this.flicks[position]=toSwitch
            this.flicks[position-1]=flick

            this.list.insertBefore(flickListItem, flickListItem.previousElementSibling)
        }
    },
    
    downFunction(flick, ev){
        const flickId=flick.id.toString()
        const flickListItem=ev.target.parentNode.parentNode
        const position=this.flicks.indexOf(flick)
        if(position<this.flicks.length-1)
        {
            const toSwitch=this.flicks[position+1]
            this.flicks[position]=toSwitch
            this.flicks[position+1]=flick

            this.list.insertBefore(flickListItem.nextElementSibling, flickListItem)
        }
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
          .querySelector('.flickName')
          .textContent = flick.name
        item.querySelector('button.alert.button').addEventListener('click', (ev)=>{ //for delete button
            ev.preventDefault()
            this.removeListItem(ev)
        })
        item.querySelector('button.warning.button').addEventListener('click', (ev)=>{   //for fav button
            ev.preventDefault()
            this.favoriteListItem(ev)
        })
        item.querySelector('button.primary.button').addEventListener('click', (ev)=>{   //for up button
            ev.preventDefault()
            this.upFunction(flick, ev)
        })
        item.querySelector('button.secondary.button').addEventListener('click', (ev)=>{ //for down button
            ev.preventDefault()
            this.downFunction(flick, ev)
        })
        return item
    },

    handleSubmit(ev) {
        const f=ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false, 
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
    templateSelector: '.flick.template',
})