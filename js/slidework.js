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
	// only if there is a next slide
	if(se.index < se.slides.length-1)
	{
	    se.index += 1;
	}
	se.updateView();
    }

    // go back to previous slide
    se.previousSlide = function()
    {
	if(se.index>0)
	{
	    se.index -= 1;
	}
	else{se.index = 0;}
	se.updateView();
    }


    // create navbar buttons
    navbar = document.getElementById("navBar");
    
    prevbtn = document.createElement("span");
    prevbtn.className = "btn";
    prevbtn.innerHTML = "Tilbake";
    prevbtn.onclick = se.previousSlide;
    navbar.appendChild(prevbtn);
    
    nextbtn = document.createElement("span");
    nextbtn.className = "btn";
    nextbtn.innerHTML = "Neste";
    nextbtn.onclick = se.nextSlide;
    navbar.appendChild(nextbtn);


    // update the view before starting 
    se.updateView()
    return se;
}
