document.querySelectorAll('.project-card').forEach(el => {
    el.addEventListener('click', (event)=>{
        if(event.target.nodeName !== 'svg' && event.target.nodeName  !== 'path' && event.target.nodeName  !== 'polygon'){
            el.parentNode.childNodes.forEach((lm) =>{
                if(lm.className == 'overlay'){
                    lm.style.display = 'block'
                } 
                else if (lm.className == 'project-content'){
                    lm.style.marginTop = '0'
                }
            })
        }
    });
})
document.querySelectorAll('.overlay').forEach(el => {
    el.addEventListener('click', ()=>{
        document.querySelectorAll('.project-content').forEach(lm => {
            lm.style.marginTop = '1000px'
        })
        el.style.display = 'none'
    });
})