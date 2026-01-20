import {
    el_search_input,
    el_filter_select,
    el_skeleton_box,
    el_skeleton_template,
    el_cards_box,
    el_card_template,
    el_nf_box
} from "./html_elements.mjs";

function skeletonUI(bool,length=10) {
if(bool==true){
el_search_input.disabled=true;
el_filter_select.disabled=true;
el_skeleton_box.innerHTML="";
Array.from({length: length}).forEach(()=>{
el_skeleton_box.append(el_skeleton_template.cloneNode(true).content);
});} else if(bool==false){
el_skeleton_box.innerHTML="";
el_search_input.disabled=false;
el_filter_select.disabled=false;
}};
skeletonUI(true,20)

function mainRequest(region="all") {
    if(region=="all") {
    fetch("https://restcountries.com/v3.1/independent?fields=flags,name,population,region,capital")
    .then(res=>res.json())
    .then(res=>{
        cardWrite(res)
    })
    } else {
    fetch(`https://restcountries.com/v3.1/region/${region}?fields=flags,name,population,region,capital`)
    .then(res=>res.json())
    .then(res=>{
        cardWrite(res)
    })
    } 
};
mainRequest();

function cardWrite(data) {
    el_cards_box.innerHTML="";
    setTimeout(()=>{
    skeletonUI(false,0);
    },3000)
    setTimeout(()=>{
    data.forEach(el=>{
        let clone=el_card_template.cloneNode(true).content;
        clone.querySelector(".js-img-flag").src=el.flags.svg;
        clone.querySelector(".js-card-title").textContent=el.name.official;
        clone.querySelector(".js-text-population").textContent=el.population;
        clone.querySelector(".js-text-region").textContent=el.region;
        clone.querySelector(".js-text-capital").textContent=el.capital[0];
        clone.querySelector(".js-card-link").href=`${location.origin}/details/index.html?name=${encodeURIComponent(el.name.official)}`
        el_cards_box.append(clone)
    });
    },3300)
}

el_filter_select.addEventListener("change",
(evt)=>{
    skeletonUI(true,20)
    mainRequest(evt.target.value);
});

function findRequest(content) {
    if(content.trim()=="") {
        setTimeout(()=>{
            mainRequest();
        },3000)
    } else {  
    fetch(`https://restcountries.com/v3.1/name/${content.trim()}?fields=flags,name,population,region,capital`)
    .then(res=>res.json())
    .then(res=>{
        if(res.status==404) {    
            el_cards_box.innerHTML="";
            skeletonUI(false,0);
            el_nf_box.classList.remove("hidden");
           el_nf_box.classList.add("flex");
        } else {
        cardWrite(res);
        el_nf_box.classList.remove("flex");
        el_nf_box.classList.add("hidden");
        }
    })
    } 
};

el_search_input.addEventListener("change",(evt)=>{
    skeletonUI(true,20)
    findRequest(evt.target.value.trim());
})