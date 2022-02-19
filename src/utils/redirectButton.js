function addRedict(el,offset){
  try {
    el.addEventListener("click",()=>{
      document.scrollingElement.scrollTop=offset
    })
  } catch (err) {
    console.error(new Error(err))
  }
  
}

function init(gapTop){
  const nodeReditect= [...document.querySelectorAll('[data-redirect]')]
  nodeReditect.forEach((el)=>{
    const redirectName= el.dataset.redirect
    const node = document.querySelector(`#${redirectName}`)
    if(node!=null){
      const offsetMove = node.offsetTop - gapTop;
      addRedict(el,offsetMove)
    }
  })
}

export default init