$('document').ready(function(){
    headingAnimate();
    textAnimate();
});
const textAnimate = () =>{
    $('.tags').fadeOut(0);
    $('.tags').fadeIn(5000);
    nameObserver.observe(document.querySelector('#myname'));
    contentObserver.observe(document.querySelector('#paragraph'));
    socialObserver.observe(document.querySelector('.social'));
    buttonObserver.observe(document.querySelector('#button'));
}

const headingAnimate = () =>{
    observer.observe(document.querySelector('#about-heading'));
    ringobserver.observe(document.querySelector('#ring-circle'));
}
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('heading-init');
        }
        else
        {
            entry.target.classList.remove('heading-init');
        }
    });
});
const ringobserver = new IntersectionObserver(entries=>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('progress-ring');
        }
        else
        {
            entry.target.classList.remove('progress-ring');
        }
    });
});
const socialObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            $('.social a').slideUp(0);
            var a = 1;
            $('.social a').each(function(){
                a = a+500;
                $(this).slideDown(a);
            });
        }
    });
});
const nameObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            $('#myname').slideUp(0);
            $('#myname').slideDown(2000);
        }
    });
});
const contentObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            $('#paragraph').slideUp(0);
            $('#paragraph').slideDown(3000);
        }
    });
});
const buttonObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            $('#button').slideUp(0);
            $('#button').slideDown(1000);
        }
    });
});