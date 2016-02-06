/****************************************************
 * Marker tool for the slides
 * Makes yellow marks on the tekst for the user
 * 
 * @author Per-Henrik Kvalnes
 ****************************************************/

function markText(textString, color="Yellow")
{
    // create replace string
    newString = "<span class='marker_yellow'>"+textString+"</span>";

    // get body element en replace all
    strbody =  document.getElementById("slides").innerHTML;
    strbody = strbody.replace(textString, newString);
    document.getElementById("slides").innerHTML = strbody;
 
}
