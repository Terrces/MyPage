const Fetchjson = await fetch("./Files/Data/Skills.json")
const parsedjson = await Fetchjson.json()
const jsonObject = parsedjson

const container = document.querySelector(".skills");
const body = document.querySelector("body");

function createCategory(data){
    const subContainer = document.createElement("div");
    const categoryContainer = document.createElement("div");
    subContainer.className = "category";
    const title = document.createElement("h2");

    title.textContent = data.name
    categoryContainer.append(title)
    
    subContainer.addEventListener("mousemove", e => {
        const rect = subContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        subContainer.style.setProperty("--x", `${x}px`);
        subContainer.style.setProperty("--y", `${y}px`);
    });
    

    data.skills.forEach(element => {
        categoryContainer.append(createCard(element))
    })
    subContainer.append(categoryContainer)
    container.append(subContainer);
}

function createCard(data) {
    const subContainer = document.createElement("div");
    const skillName = document.createElement("h3");
    const skillDescription = document.createElement("label");
    subContainer.className = "skillCard";
    skillName.textContent = data.name
    skillDescription.textContent = data.description;

    subContainer.append(skillName,skillDescription)
    return subContainer;
}

jsonObject.categories.forEach(category => {
    createCategory(category)
});