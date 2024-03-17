const skillName = ['HTML-5','CSS-3','JavaScript','C++','Python','Android','Flutter','FireBase']
const skillImg = ['/images/html5.png','/images/css-3.png','/images/Javascript.png','/images/cpp.png','/images/python.png','/images/android.png','/images/flutter.png','/images/firebase.png']
const skillcol = ['#FFA500','#2196F3','#F7DF1E','#004481','#34709F','#3DDB85','#54C5F8','#FFA713']
const skillLevel = ['INTERMEDIATE','INTERMEDIATE','Intermediate','Advance','Intermediate','intermediate','Basic','Intermediate']
const skillVal = [90,85,75,93,85,80,64,78,90]
$(document).ready(function(){
    $(".container").slideUp(0);
    $(".container").slideDown(1000,"swing");
    $("#focus-container").slideUp(0);
    $("#focus-container").slideDown(1500,"swing");
    $(".logo").slideUp(0);
    $(".logo").slideDown(2000,"swing");
    $(".nav-links").slideUp(0);
    $(".nav-links").slideDown(2000,"swing");
    createSkillIcons();
    animWorld();
    navSlide();
    headingAnimate();
    const translate = document.querySelectorAll('.parallax-trans');
    const el = document.querySelector('.parallax-container');
    const skill_title = document.querySelector('.skill-title');
    const shadow = document.querySelector('.shadow');
    window.addEventListener('scroll', () =>{
        let scroll = window.scrollY - el.offsetTop;
        if(scroll>0)
        {
            translate.forEach(element => {
                let speed = element.dataset.speed;
                element.style.transform = `translateY(${scroll * speed}px)`;
            });
        }
        skill_title.style.opacity = -scroll / (el.offsetHeight / 2) + 1;
        shadow.style.height = `${scroll * 0.5 + 350}px`; 
    });
});

function getCircle(colorhash,val){
    var svg1 = "http://www.w3.org/2000/svg";
    var svg_border = document.createElementNS(svg1, 'svg');
    svg_border.setAttribute('class','progress-border');
    var circle_main = document.createElementNS(svg1,'circle');
    circle_main.setAttribute('stroke',colorhash);
    circle_main.setAttribute('stroke-width',"5");
    circle_main.setAttribute('r',"90");
    circle_main.setAttribute('cx',"95");
    circle_main.setAttribute('cy',"95");
    circle_main.setAttribute('class','helloDemo');
    
    let radius = 90;
    let circumference = Math.PI*(radius*2);
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    let pct = ((100-val)/100)*circumference;
    circle_main.style.strokeDashoffset=pct+"";

    svg_border.appendChild(circle_main);
    return svg_border;
}

function createSkillIcons(){
    var skill_container = document.querySelector('.skills-container');
    for(let i=0;i<skillName.length;i++)
    {
        let currcol = skillcol[i];
        var card = document.createElement('div');
        card.setAttribute("class","skill-card");
        card.addEventListener("mouseenter", cardMouseEnter);
        card.addEventListener("mousemove", cardMouseMove);
        card.addEventListener("mouseleave", cardMouseLeave);
        card.style.boxShadow = currcol+' 0px 0px 20px';
        var img = document.createElement('img');
        img.setAttribute('src',skillImg[i]);
        img.setAttribute('class','skill-img');
        img.setAttribute('alt',"Failed to Load Image");
        var progress_bar = getCircle(currcol,skillVal[i]);
        var skill_text = document.createElement('h3');
        skill_text.innerHTML = skillName[i];
        skill_text.setAttribute('class','skill-name');
        skill_text.style.color = currcol;
        var skill_level = document.createElement('h4');
        skill_level.innerHTML = skillLevel[i];
        skill_level.setAttribute('class','skill-level');
        card.appendChild(progress_bar);
        card.appendChild(img);
        card.appendChild(skill_text);
        card.appendChild(skill_level);
        skill_container.appendChild(card);
        progressObserver.observe(progress_bar);
    }
}

$(document).on('scroll', function(){
    if ( $(window).scrollTop() > 300) {
        $('#header').addClass('scrolled_header');
    } else {
        $('#header').removeClass('scrolled_header');
    }
});

const headingAnimate = () =>{
    observer.observe(document.querySelector('#about-heading'));
}
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('heading-init');
        } else {
            entry.target.classList.remove('heading-init');
        }
    });
});

const progressObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('circle-anim');
        } else {
            entry.target.classList.remove('circle-anim');
        }
    });
});

const navSlide = () =>{
    const burger = document.querySelector('.burger');  
    const nav = document.querySelectorAll('.nav-links li');
    const bar = document.querySelector('.nav-links');
    burger.addEventListener('click',()=>{
        if($(window).scrollTop() > 300){
            bar.style.background = '#00000088';
        } else {
            bar.style.background = 'linear-gradient(to top, #2F80ED, #56CCF2)'
        }
        bar.classList.toggle('nav-active');
        nav.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });  
    
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function animWorld(){
    var arr = ["World","जग","Monde","Welt","Mundo","世界","Mondo"]
    for(let it = 0; ; it++)
    {
        if(it>=arr.length) it=0;
        var textWrapper = document.querySelector('.letters');
        var i, span = "";
        var temp = "Welcome to My "+arr[it];
        for (i = 0; i < temp.length; i++) {
            span += "<span class='letter'>";
            if(temp[i]==" ")
            span += "&nbsp";
            else
            span += temp[i];
            span += "</span>";
        }
        textWrapper.innerHTML = span;
        anime.timeline().add({
            targets: '.ml6 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        });  
        await sleep(2750);
    }
}

const tiltEffectSettings = {
    max: 25,
    perspective: 1000,
    scale: 1.05,
    speed: 500,
    easing: "cubic-bezier(.03,.98,.52,.99)"
  };

function cardMouseEnter(event) {
    setTransition(this);
}
  
function cardMouseMove(event) {
    const cardWidth = this.offsetWidth;
    const cardHeight = this.offsetHeight;
    const centerX = this.offsetLeft + cardWidth/2;
    const centerY = this.offsetTop + cardHeight/2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1)*(tiltEffectSettings.max*mouseY/(cardHeight/2));
    const rotateYUncapped = (-1)*(tiltEffectSettings.max*mouseX/(cardWidth/2));
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
  
    this.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
}
  
function cardMouseLeave(event) {
    this.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(this);
}

function setTransition(card) {
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
    card.style.transition = "";
    }, tiltEffectSettings.speed);
}

function changeTheme() {
    document.body.classList.toggle("dark");
}