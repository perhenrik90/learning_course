#
# Management for Learninghack
# Usage: 
#  python manage.py createManifest
#
import getopt, sys
import tools.scorm as scorm
import json

def usage():
	str = "Management useage:"
	return str

def parseConfigfile():
	configFile = open("conf.js")
	configFile = configFile.read()
	configFile = configFile.replace(" ","")
	configFile = configFile.replace("CONF=", "")
	return json.loads(configFile)


if __name__ == "__main__":

	# get the config's from conf.js
	conf = parseConfigfile()

	try:
		cmd = sys.argv[0]
		opts, args = getopt.getopt(sys.argv[1:], "ho:v", ["help","ouput="])

	except getopt.GetoptError:
		print useage()

	# if no arguments given, print help
	if len(args) == 0:
		print usage()
		sys.exit()

	if args[0] == "createScorm":
		scorm.createScorm(conf)




