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
    return false;
};
document.getElementById("l_en-btn").onclick = function(){
    language = "en";
    translatePage();
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



/***** SKILLS MENU *****/
document.querySelectorAll("#skills li a").forEach(function(item){
    item.onclick = function(){
        let hash = item.getAttribute("href");
        alert(hash);
        document.querySelector("section #feat").innerHTML="yoe";
    }; // onclick
});

/***** OPENING *****/
document.querySelectorAll("#opening nav a").forEach(function(item) {
    var featTag = item.getAttribute("href").slice(1);
    item.onclick = function(){
        
        /***** LOAD PROJECTS *****/
        function loadProjects() {

            var projectsLoaded = "";
            var prevProject = "";

            for(c = 0; c < projectsData.length; c++) {
                if(language = "pt") {
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

                if(cCode) {
                    var codeButton = '<a href="' + cCode + '" target="_blank"><i class="fas fa-code"></i> ' + codeStr + '</a>';
                } else {
                    var codeButton = " ";
                }; // if
                
                prevProject = projectsLoaded;
                var currentProject = '<div class="box item" data-aos="fade-up"><figure><img src="' + cImg + '"/></figure> <div class="item-cover"><div class="item-cover-content"> <a href="' + cLink + '" target="_blank"><i class="far fa-eye"></i> ' + seeStr + '</a> ' + codeButton + '</div><!-- .item-cover-content --></div><!-- .item-cover --> <h3 class="item-title">' + cName + '</h3> <p>' + cDescription + '</p> </div><!-- .item -->';
                
                
                if(featTag == "html" && cTags.includes("old")) {
                    projectsLoaded = currentProject + prevProject;
                    var sectionTitle = "Antigos";
                    var sectionDescription = '<span class="l_pt">Esses são os meus trabalhos mais antigos, desenvolvidos a mais de 6 anos atrás. Até então eu ainda não tinha muito conhecimento sobre regras de UI/UX e nenhum desses temas é responsivo. Ainda assim eu quis incluí-los aqui para mostrar a quanto tempo eu tenho trabalhado com HTML, CSS e JavaScript</span><span class="l_en">These are my oldest works, developed more than 6 years ago. Back then I didn\'t know much about UI/UX rules and none of these themes are responsive. Still I wanted to include them here to show for how long I\'ve been working with HTML, CSS and JavaScript.</span>';
                } else if(featTag == "html" && cTags.includes("html")) {
                    projectsLoaded = currentProject + prevProject;
                    var sectionTitle = "Front-end";
                    var sectionDescription = '<span class="l_pt">Aqui estão todos os meus projetos Front-end mais atualizados.</span><span class="l_en">Here are all of my more recent Front-end projects.</span>';
                } else if(featTag == "video" && cTags.includes("video") && !cTags.includes("short")) {
                    projectsLoaded = currentProject + prevProject;
                    var sectionTitle = "Videos & Thumbnails";
                    var sectionDescription = '<span class="l_pt">Vídeos que eu editei e thumbnails que fiz.</span><span class="l_en">Videos I edited and thumbnails I made.</span>';
                } else if(featTag == "video" && cTags.includes("short")) {
                    projectsLoaded = currentProject + prevProject;
                    var sectionTitle = "Shorts";
                    var sectionDescription = '';
                } else {
                    /*projectsLoaded = currentProject + prevProject;
                    var sectionTitle = "Tudo";*/
                }; // if
                
                
            }; // for

            document.querySelector("#feat").insertAdjacentHTML("afterbegin", projectsLoaded);
            document.querySelector("#feat").insertAdjacentHTML("beforebegin", '<h1>' + sectionTitle + '</h1> <p class="section-description">' + sectionDescription + '</p><!-- .section-description -->');

        }; loadProjects();

        translatePage();
        masonryGrid();

        document.querySelector("#opening").remove();
        return false;
    }; // onclick
}); // forEach





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
