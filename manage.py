#
# Management for Learninghack
# Usage: 
#  python manage.py createManifest
#
import getopt, sys
import tools.scorm as scorm


def usage():
	str = "Management useage:"
	return str

if __name__ == "__main__":

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
		scorm.createScorm("options")
