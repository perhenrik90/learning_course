#
# SCORM tools
# @author Per-Henrik Kvalnes 2015
#
import copy
import glob
import sys
import xml.dom.minidom as minidom
	
#########################################
# XML SCORM manifest building class #
#########################################
class ManifestBuilder:

	def __init__(self, orgname="org", title="tittle"):
		self.orgid = orgname
		self.title = title
		self.resourceid = "main"
		self.mainfile = "index.html"

############################
# ORGANIZATIONS FUNCTIONS #
############################
	def buildOneOrganization(self,parrent, orgid, title):
		t = self.tree
		# create <organization> tag
		org = t.createElement("organization")
		org.setAttribute("identifier", orgid)
		parrent.appendChild(org)
		# the first title tag
		titletag = t.createElement("title")
		titletag.appendChild(t.createTextNode(title))
		org.appendChild(titletag)
		# item tag
		itemtag = t.createElement("item")
		itemtag.setAttribute("identifier", (orgid+"_item"))
		itemtag.setAttribute("identifierref", self.resourceid)
		org.appendChild(itemtag)
		# title tag inside item
		titleitem = t.createElement("title")
		titleitem.appendChild(t.createTextNode(title))
		itemtag.appendChild(titleitem)

	def buildOrganizations(self):
		# setup tree an main tag
		t = self.tree
		manifestTag = t.documentElement
		# create <organizations>
		orgmaster = t.createElement("organizations")
		orgmaster.setAttribute("default", self.orgid)
		manifestTag.appendChild(orgmaster)
		self.buildOneOrganization(orgmaster, self.orgid, self.title)



	#######################
	# RESOURCES FUNCTIONS #
	#######################
	def isInIgnoreList(self, filename):
		ignoreList = ["index.html", "imsmanifest.xml"]
		for f in ignoreList:
			if filename == f:
				return True
		return False
	
	def buildResources(self, listOfFiles):
		t = self.tree
		manifestTag = t.documentElement
		# build <resources>
		resmaster = t.createElement("resources")
		manifestTag.appendChild(resmaster)

		# if not mainfile (index.html) in the array of files
		if not self.mainfile in listOfFiles:
			print("WARNING: index.html is not pressent in your working direcotry!")
		# create the main resource
		mres = t.createElement("resource")
		mres.setAttribute("identifier", self.resourceid)
		mres.setAttribute("type", "webcontent")
		mres.setAttribute("adlcp:scormtype", "sco")
		mres.setAttribute("href", self.mainfile)
		resmaster.appendChild(mres)
		# iterate over file list. Resource id is the ref to main file. I sould be index.html
		for filename in listOfFiles:
			if self.mainfile != filename and not self.isInIgnoreList(filename):
				mres = t.createElement("resource")
				mres.setAttribute("identifier", filename)
				mres.setAttribute("href",filename)
				resmaster.appendChild(mres)
	

	##################################
	# Setup the main tree structure #
	##################################
	def buildTree(self):
		main = "<manifest><metadata>"
		main += "<schema>ADL SCORM</schema>"
		main += "<schemaversion>1.2</schemaversion>"
		main += "</metadata></manifest>"
		tree = minidom.parseString(main)
		self.tree = tree

#
# Main function for the Scorm builder
# Called from manage.py
#
def createScorm(conf):
	title = conf["projectname"]
	orgname = conf["organization"]
	
	mb = ManifestBuilder(title=title, orgname=orgname)
	mb.buildTree()
	mb.buildOrganizations()

	listOfFiles = glob.glob('*')
        mb.buildResources(listOfFiles)

	xmlfile = open("imsmanifest.xml","w")
	txtdata = mb.tree.toprettyxml()
	print(txtdata)
	xmlfile.write(txtdata)
 

if __name__ == "__main__":
	# excrat arguments
	orgname = sys.argv[1]
	title = sys.argv[2]
	b = ManifestBuilder(orgname, title)
	b.buildTree()
	b.buildOrganizations()
	listOfFiles = glob.glob('*')
	b.buildResources(listOfFiles)
	print b.tree.toprettyxml()
	manifestfile = open("imsmanifest.xml", "w")
	manifestfile.write( b.tree.toprettyxml())
