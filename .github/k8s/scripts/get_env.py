
#!/usr/bin/python

import sys

if __name__ == '__main__':
    if (len(sys.argv) > 1):
        branch = sys.argv[1]

        if branch.startswith("k8s-"):
            env = branch[4:]
        else:
            env = branch

    sys.stdout.write(env)
    sys.exit(0)
