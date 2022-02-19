// firebase
import Work from "../firebase/work/work.js";

function addWorkTemplate ({ imageSrc,
    title,
    description,
    hiperlinks }) {
    const workContainer = document.querySelector("#work-container")
    const workNode = document.createElement("work-preview")
  
    workNode.setAttribute("image-src", imageSrc)
    workNode.setAttribute("title", title)
    workNode.setAttribute("description", description)
    workNode.setAttribute("hiperlinks", JSON.stringify( hiperlinks))
    workContainer.append(workNode)
  
  }
  
  function getWorks () {
    const workFirebase = new Work();
    workFirebase.listWorks().then((res) => {
      res.map(addWorkTemplate)
    });
  }

  export default getWorks