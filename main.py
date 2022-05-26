import paramiko
import sys
from getopt import getopt


if __name__ == '__main__':
    opts, args = getopt(sys.argv[1:], "h:u:p:")
    for opt, arg in opts:
        if opt == '-h':
            hostname = arg
        elif opt == '-u':
            username = arg
        elif opt == '-p':
            password = arg
        else:
            print("Arguments error")

    ssh = paramiko.SSHClient()
    known_host = paramiko.AutoAddPolicy()
    ssh.set_missing_host_key_policy(known_host)

    ssh.connect(
    hostname = hostname,
    port = 22,
    username = username,
    password = password
    )

    stdin,stdout,stderr = ssh.exec_command("kill -9 $(lsof -i :3000 -t)")
    print(stdout.read().decode(), stderr.read().decode())
    stdin,stdout,stderr = ssh.exec_command("cd /home;nohup /home/node-v14.18.1-linux-x64/bin/serve -s dist >ionic.log 2>&1 &", get_pty=False)
    print(stdout.read().decode(), stderr.read().decode())

    ssh.close()