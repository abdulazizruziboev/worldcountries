function skeletonUI(bool) {
    if(bool==true) {
        document.querySelector(".js-skeleton-box").append(document.querySelector(".js-skeleton-template").cloneNode(true).content)
    } else {
        document.querySelector(".js-skeleton-box").innerHTML="";
    }
} skeletonUI(true);

function mainRequest() {
    let name=encodeURIComponent(new URLSearchParams(location.search).get("name"))
    fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res=>res.json())
    .then(res=>{
        setTimeout(() => {
            skeletonUI(false);
            uiWrite(res[0]); 
        }, 3000);
    })
}
mainRequest();

function uiWrite(data) {
    document.querySelector(".js-card-box").innerHTML=null;
    let clone = document.querySelector(".js-country-card-template").cloneNode(true).content;
    clone.querySelector(".js-country-flag").src=data.flags.svg;
    clone.querySelector(".js-country-title").textContent=data.name.official;
    clone.querySelector(".js-country-native-name").textContent=data.name.nativeName[`${Object.keys(data.languages)[0]}`].official;
    clone.querySelector(".js-country-population").textContent=data.population;
    clone.querySelector(".js-country-region").textContent=data.region;
    clone.querySelector(".js-country-sub-region").textContent=data.subregion;
    clone.querySelector(".js-country-sub-region").textContent=data.subregion;
    clone.querySelector(".js-country-capital").textContent=data.capital.join(", ");
    let keys=Object.keys(data);
    keys.some(el=>{
        if(el=="borders") x(true)
    })
    function x(bool) {
    if(bool==true){
    data.borders.forEach(el=>{
    clone.querySelector(".test").innerText="Border Countries:";
    let linkClone=document.querySelector(".js-country-borders-countries-template").cloneNode(true).content;
    linkClone.querySelector("a").textContent=el; linkClone.querySelector("a").href=`${location.origin}/details/index.html?name=${el}`;
    clone.querySelector(".js-country-border-countries").append(linkClone);
    });} else if(bool==false) {clone.querySelector(".test").innerText=""}}
    clone.querySelector(".js-country-domain").textContent=data.tld.join(", ");
    clone.querySelector(".js-country-currencies").textContent=data.currencies[`${Object.keys(data.currencies)}`].name;
    clone.querySelector(".js-country-languages").textContent=Object.values(data.languages).join(", ");
    document.querySelector(".js-card-box").append(clone)
}

uiWrite()