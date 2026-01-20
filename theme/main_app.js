function themeChecker() {
if(!(localStorage.getItem("themeMode"))) {
    localStorage.setItem("themeMode","light");
} if(localStorage.getItem("themeMode")=="light") {
    document.querySelector("html").setAttribute("data-theme","light");
    document.getElementById("light_icon").classList.remove("flex");
    document.getElementById("light_icon").classList.add("hidden");
    document.getElementById("dark_icon").classList.remove("hidden");
    document.getElementById("dark_icon").classList.add("flex");
} if(localStorage.getItem("themeMode")=="dark") {
    document.querySelector("html").setAttribute("data-theme","dark");
    document.getElementById("dark_icon").classList.remove("flex");
    document.getElementById("dark_icon").classList.add("hidden");
    document.getElementById("light_icon").classList.remove("hidden");
    document.getElementById("light_icon").classList.add("flex");
}
};
themeChecker()
document.getElementById("theme_toggler")
.addEventListener("click",()=>{
    if(localStorage.getItem("themeMode")=="light") {    
        localStorage.setItem("themeMode","dark");
    } else if(localStorage.getItem("themeMode")=="dark") {
        localStorage.setItem("themeMode","light");
    }
    themeChecker()
});