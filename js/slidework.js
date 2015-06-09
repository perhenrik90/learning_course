/***********************************************
 * Slidework defines the framework for slides
 * @author Per-Henrik Kvalnes
 ***********************************************/

// setup for all divtags with classname 'slide' 
function initSlideEngine()
{
    var se = new Object(); // define a slide engine

    // data objects / models
    se.slides = document.getElementsByClassName("slide");
    se.index = 0;

    // updates the view 
    se.updateView = function()
    {
	for(var i = 0; i < se.slides.length; i ++)
	{
	    slide = se.slides[i];
	    slide.style.display = "none";
	    if(i == se.index)
	    {
		slide.style.display = "";
	    }
	}
    }

    // jump to next slide
    se.nextSlide = function()
    {
	se.index += 1;
	se.updateView();
    }

    // create navbar buttons 
    navbar = document.getElementById("navBar");
    nextbtn = document.createElement("span");
    nextbtn.className = "btn";
    nextbtn.innerHTML = "Neste";
    nextbtn.onclick = se.nextSlide;
    navbar.appendChild(nextbtn);

    // update the view before starting 
    se.updateView()
    return se;
}
