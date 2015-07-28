Learning Hack
=============
A hackers framework to a HTML5 e-learning project. You must have some skills
in programming for web to use this framework. This project consists of
reuseable part's when coding e-learning insted of using an authoring tool.

The framework will support SCORM and TinCan API. 

External Libaries 
-----------------
This project uses pipwerks JavaScript SCORM API Wrapper developed by
Philip Hutchison. Website: http://pipwerks.com/ or https://github.com/pipwerks/scorm-api-wrapper

For TinCan export the project uses JavaScript libary from Rustici Software.
http://tincanapi.com/libraries/

Bootstrap is used to create a responsive design.
Use bootstraps elements inside every <div class="slide"> tag. 
http://getbootstrap.com/



Configue
---------
The project configurations are stored in conf.js. 
Both the html project and the manage.py use this
configuration file. 


Manage
------
Manage.py is the main entry to use the python tools. 

Tools developed:

python manage.py createScorm > imsmanifest.xml
| Creates an imsmanifest file contained in a SCORM package. 


