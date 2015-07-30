/***********************************************
 * Slidework defines the framework for slides
 * Can be seen as the 'slide engine'.
 * 
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
	if(se.index == se.slides.length-1)
	{
		setCourseComplete();
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


    // set next button inactive
    se.disableNextButton = function()
    {
	nextbtn.className = "btn-disabled";
	nextbtn.onclick = "";
    }
    
    // set next button active
    se.enableNextButton = function()
    {
	nextbtn.className = "btn";
	nextbtn.onclick = se.nextSlide;
    }

    // create navbar buttons
    navbar = document.getElementById("navBar");
    
    prevbtn = document.createElement("li");
    a = document.createElement("a");
    a.innerHTML = "Tilbake";
    a.onclick = se.previousSlide;
    prevbtn.appendChild(a);
    navbar.appendChild(prevbtn);
    
    nextbtn = document.createElement("li");
    a = document.createElement("a");
    a.innerHTML = "Neste";
    a.onclick = se.nextSlide;
    nextbtn.appendChild(a);
    navbar.appendChild(nextbtn);

    if(CONF['type'] == "scorm1.2")
    {
	SCORMInit();
    }
    if(CONF['type'] == "tincan")
    {
	TinCanInit();
    }

    // update the view before starting 
    se.updateView()
    return se;
}


function setCourseComplete()
{
    if(CONF['type'] == "scorm1.2")
    {
	SCORMComplete()
    }	
    if(CONF['type'] == "tincan")
    {
	TinCanComplete()
    }
}




// SCORM tools
// Uses the Scorm Libary
function SCORMInit()
{
	s = pipwerks.SCORM.init()	
	if(!s){alert("Could not connect to the LMS!")}
}

function SCORMComplete()
{
	s = pipwerks.SCORM.set('cmi.core.lesson_status', 'completed')
	if(!s){alert('Could not set the course to completed!');}
	SCORMQuit();
}

function SCORMQuit()
{
	pipwerks.SCORM.quit()
}

/******************
 * Tin Can tools
 *******************/

// retruns an tincan object
function initTinCan()
{
    var tincan = new TinCan (
    {
        recordStores: [
            {
                endpoint: CONF["endpoint"],
                username: CONF["tcusername"],
                password: CONF["tcpassword"],
                allowFail: false
            }
        ]
    }
    );
    return tincan
}

// Calls when the users starts the project
function TinCanInit()
{
    if(CONF["manual_registration"])
    {
	CONF["name"] = getParameterByName("name");
	CONF["email"] = getParameterByName("email");
    }
    tc = initTinCan();
    tc.sendStatement(
	{
	    actor:{
		mbox:CONF["email"],
		name:CONF["name"]
	    },
	    verb:{
		id:"http://adlnet.gov/expapi/verbs/initialized",
	    "display":{"en-US":"Initialized","nb":"Startet"}},
	    target:{id:CONF["siteurl"],"definition":
		   {name:{"en-US":CONF["projectname"],
			  "nb":CONF["projectname"]}}}
	}
    );
}


// Calls when projects is complete and tincan option is set
var isSetComplete = false;
function TinCanComplete()
{
    if(isSetComplete){return;}

    tc = initTinCan();
    tc.sendStatement(
	{
	    actor:{
		mbox:CONF["email"],
		name:CONF["name"]
	    },
	    verb:{
		id:"http://adlnet.gov/expapi/verbs/completed",
	    "display":{"en-US":"Completed","nb":"Fullførte"}},
	    target:{id:CONF["siteurl"],"definition":
		   {name:{"en-US":CONF["projectname"],
			  "nb":CONF["projectname"]}}}
	}
    );
    isSetComplete = true;
}
