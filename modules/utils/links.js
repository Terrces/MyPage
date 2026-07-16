const Fetchjson = await fetch("./Files/Data/Links.json")
const jsonObject = await Fetchjson.json()

const container = document.querySelector(".LinksContainer")

for (const link in jsonObject){
    if(jsonObject.hasOwnProperty(link)){ createButtons(jsonObject[link]) }
}

function createButtons(element){
    let button = document.createElement("button")
    const mouseEnteredPosition = "0em"
    const backgroundSizeDefault = "1.4em"
    const backgroundSizeHovered = "1.5em"
    const hoveredRadius = "0.3em"

    button.style.margin = "0.2em"
    button.style.cursor = "pointer"

    button.style.padding = "0.2em"
    button.style.border = "none"
    button.style.borderBottom = "2px solid white"

    button.style.transition = "0.2s ease-in-out"
    
    button.style.backgroundImage = `url(${element.img})`
    button.style.backgroundClip = "padding-box"
    button.style.backgroundSize = backgroundSizeDefault
    button.style.backgroundRepeat = "no-repeat"

    button.style.backgroundColor = "transparent"

    button.style.minWidth = "1.5em"
    button.style.minHeight = "2em"
    
    button.addEventListener("mouseout", () => {
        button.style.backgroundPositionY = "0em"
        button.style.backgroundPositionX = "0em"
        button.style.backgroundSize = backgroundSizeDefault
        button.style.borderRadius = "0em"
    })

    button.addEventListener("mouseenter", () => {
        button.style.backgroundPositionY = mouseEnteredPosition
        button.style.backgroundPositionX = mouseEnteredPosition
        button.style.backgroundSize = backgroundSizeHovered
        button.style.borderRadius = hoveredRadius
    })

    button.addEventListener("click",() => {
        window.open(element.url,'_blank').focus();
    })
    
    container.appendChild(button)
}