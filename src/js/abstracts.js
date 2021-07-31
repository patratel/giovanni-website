document.querySelectorAll('.clip').forEach(el => {
    el.addEventListener('click', (event) => {
       if(event.target.className !== 'close-btn'){
        let par = el.parentNode
        setTimeout(function(){
            par.style.position = "inherit"
        },1);
        el.style.zIndex = '20'
        el.style.position = 'fixed'
        el.style.margin = '0'
        el.style.width = '100vw'
        el.style.height = '100vh'
        el.style.clipPath = 'unset'
        el.style.overflowY = 'scroll'
        el.style.overflowX = 'hidden'
        document.getElementsByTagName("body")[0].style.overflowY = 'hidden'
        document.getElementsByTagName("body")[0].style.overflowX = 'hidden'
        el.childNodes.forEach((lm) =>{
            if(lm.className == 'clip-title'){
                lm.style.display = 'none'
            } 
            if(lm.className == 'hover-card'){
                lm.style.bottom = '0'
                lm.style.opacity = '1'
                lm.style.position = 'relative'
                lm.childNodes.forEach(bl => {
                    if(bl.className == 'expansion-content'){
                        bl.style.display = "flex"
                    }
                    if(bl.className == 'hover-card-title'){
                        bl.style.display = "none"
                    }if(bl.className == 'hover-card-text'){
                        bl.style.display = "none"
                    }
                })
            } 
        })
       }
    });
})

document.querySelectorAll('.close-btn').forEach(el => {
    el.addEventListener('click', () => {
        setTimeout(function(){
            setTimeout(function(){
                el.parentNode.parentNode.parentNode.parentNode.style = ""
            },1)
            el.parentNode.style = ""
            el.parentNode.parentNode.childNodes.forEach(bl => {
                if(bl.className == 'hover-card-title'){
                    bl.style = ""
                }if(bl.className == 'hover-card-text'){
                    bl.style = ""
                }
            })
            el.parentNode.parentNode.style = ''
            el.parentNode.parentNode.parentNode.childNodes.forEach(bl => {
                if(bl.className == 'clip-title'){
                    bl.style = ""
                } 
            })
            document.getElementsByTagName("body")[0].style = ''
            el.parentNode.parentNode.parentNode.style = ""
        },1)
    })
})
