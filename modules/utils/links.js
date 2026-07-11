const Fetchjson = await fetch("./Files/Data/Links.json")
const jsonObject = await Fetchjson.json()

const container = document.querySelector(".LinksContainer")

for (const link in jsonObject){
    if(jsonObject.hasOwnProperty(link)){
        createButtons(jsonObject[link])
    }
}

function createButtons(element){
    let button = document.createElement("button")

    button.style.margin = "0.2em"
    button.style.cursor = "pointer"

    button.style.padding = "0.2em"
    button.style.border = "none"
    button.style.borderBottom = "2px solid white"

    button.style.transition = "0.2s ease-in-out"
    
    button.style.backgroundImage = `url(${element.img})`
    button.style.backgroundClip = "padding-box"
    button.style.backgroundSize = "1.8em"
    button.style.backgroundRepeat = "no-repeat"

    button.style.backgroundColor = "transparent"

    button.style.minWidth = "2em"
    button.style.minHeight = "2.4em"

    button.addEventListener("mouseenter", () => {
        button.style.backgroundPositionY = "0.3em"
        button.style.backgroundPositionX = "0.3em"
        button.style.backgroundSize = "1.5em"
        button.style.borderRadius = "0.5em"
    })

    button.addEventListener("mouseout", () => {
        button.style.backgroundPositionY = "0em"
        button.style.backgroundPositionX = "0em"
        button.style.backgroundSize = "1.8em"
        button.style.borderRadius = "0em"
    })

    button.addEventListener("click",() => {
        openLink(element.url)
    })
    container.appendChild(button)
}


function openLink(url){
    window.open(url,'_blank').focus();
}