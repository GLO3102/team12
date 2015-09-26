/**
 * Created by Utilisateur on 2015-09-21.
 */
function toggle(id) {
    var el = document.getElementById(id);
    var img = document.getElementById("arrow");
    var box = el.getAttribute("class");
    if(box == "hide"){
        el.setAttribute("class", "show");
        delay(img, "resources/images/arrowright.png", 400);
    }
    else{
        el.setAttribute("class", "hide");
        delay(img, "resources/images/arrowleft.png", 400);
    }
}

function delay(elem, src, delayTime){
    window.setTimeout(function() {elem.setAttribute("src", src);}, delayTime);
}
