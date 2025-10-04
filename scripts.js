/********** LANGUAGE / TRANSLATION **********/
const userLanguage = navigator.language;
var language;
if((userLanguage == "pt-BR") || (userLanguage == "pt-PT")) {language = "pt"} else {language = "en"};

const l_pt = document.querySelectorAll(".l_pt");
const l_en = document.querySelectorAll(".l_en");
l_pt.forEach(function(item){item.style.display="none"});
l_en.forEach(function(item){item.style.display="none"});


/***** translation buttons *****/
document.getElementById("l_pt-btn").onclick = function(){
    language = "pt";
    translatePage();
    loadProjects();
    return false;
};
document.getElementById("l_en-btn").onclick = function(){
    language = "en";
    translatePage();
    loadProjects();
    return false;
};

/** translate page function **/
function translatePage() {
    if(language == "pt") {
        l_pt.forEach(function(item){item.style.display="inline"});
        l_en.forEach(function(item){item.style.display="none"});
    } else {
        l_en.forEach(function(item){item.style.display="inline"});
        l_pt.forEach(function(item){item.style.display="none"});
    }; // else
}; translatePage();



/***** AGE CALCULATION *****/
const dateNow = new Date();
document.querySelectorAll("age").forEach(function(item){
    let age;
    if(dateNow.getMonth() >= 5) {
        age = dateNow.getFullYear() - 1996;
    } else {
        age = dateNow.getFullYear() - 1996 - 1;
    }
    item.innerHTML = age;
});


/***** MOBILE SIDEBAR *****/
function mobileSidebar() {
    let aside = document.querySelector("aside:not(#mobile-sidebar)");
    let mobileAside = document.querySelector("aside#mobile-sidebar");

    if(window.innerWidth <= 900) {
        let sidebarHtml = aside.innerHTML;
        mobileAside.innerHTML = sidebarHtml;
        aside.style.display = "none";
    } else {
        
        if(mobileAside.innerHTML != "") {
            mobileAside.innerHTML = "";
        }; // if
        aside.style.display = "block";
    }; // if
}; mobileSidebar();

window.onresize = function() {
    mobileSidebar();
}; // onresize



/***** OPENING *****/
var featTag;
document.querySelectorAll("#opening nav a").forEach(function(item) {
    item.onclick = function(){

        featTag = item.getAttribute("href").slice(1);
        
        loadProjects();

        document.querySelector("#opening").remove();
        return false;
    }; // onclick
}); // forEach


/***** LOAD PROJECTS *****/
function loadProjects() {

    if(featTag) {

        document.querySelectorAll("main section").forEach(function(item){

            if(item.querySelector(".masonry-grid").children.length > 0) {
                item.querySelector(".masonry-grid").innerHTML = "";
            }; // if

            let sectionID = item.getAttribute("id");
            let sectionTag = item.getAttribute("tag");

            for(c = 0; c < projectsData.length; c++) {
                if(language == "pt") {
                    cName = projectsData[c].name.pt;
                    cDescription = projectsData[c].description.pt;
                    seeStr = "Ver";
                    codeStr = "Código";
                } else {
                    cName = projectsData[c].name.en;
                    cDescription = projectsData[c].description.en;
                    seeStr = "See";
                    codeStr = "Code";
                }; // if
                
                cImg = projectsData[c].img;
                cLink = projectsData[c].link;
                cCode = projectsData[c].code;
                cTags = projectsData[c].tags;


                function renderProject() {

                    if(cCode) {
                        var codeButton = '<a href="' + cCode + '" target="_blank"><i class="fas fa-code"></i> ' + codeStr + '</a>';
                    } else {
                        var codeButton = " ";
                    }; // if

                    var renderProject = '<div class="box item" data-aos="fade-up"><figure><img src="' + cImg + '"/></figure> <div class="item-cover"><div class="item-cover-content"> <a href="' + cLink + '" target="_blank"><i class="far fa-eye"></i> ' + seeStr + '</a> ' + codeButton + '</div><!-- .item-cover-content --></div><!-- .item-cover --> <h3 class="item-title">' + cName + '</h3> <p>' + cDescription + '</p> </div><!-- .item -->';

                    item.querySelector(".masonry-grid").insertAdjacentHTML("afterbegin", renderProject);

                }; // renderProject()
                
                if((sectionTag == featTag) && cTags.includes(sectionID)) {
                    renderProject();
                } else if((featTag == "all") && cTags.includes(sectionID)) {
                    renderProject();
                }; // if
                
            }; // for

            if((sectionTag != featTag) && (featTag != "all")) {
                item.remove();
            }; // if

        }); // forEach
        
        masonryGrid();
        
    }; // if

}; // loadProjects();





/** masonry + images loaded **/
function masonryGrid() {
    document.querySelectorAll('.masonry-grid').forEach(function(grid){
        var msnry = new Masonry(grid, {
            itemSelector: '.item',
            stagger: 0
        }); // msnry
        imagesLoaded(grid, function() {
            msnry.layout();
        }); // imagesLoaded
    });
}; 



/* jquery stuff */
$(document).ready(function(){


     /********** back to top button **********/
     $(this).scroll(function(){
        if ($(this).scrollTop() >= 100) {
            $(".btt-button").fadeIn("slow");
        } else {
            $(".btt-button").fadeOut("slow");
        };
    });
    $(".btt-button").click(function(){
        $("html, body").animate({
            scrollTop: '0px'
        }, 500);
        return false;
    });
   /********** back to top button **********/


    /*** loading message [start] ***/
    setTimeout(function() {
        $("#loading").fadeOut(1000, "swing");
    }, 200);
    /*** loading message [end] ***/
    
});
