working_directory "/home/admin/web/wreckerrobotics.com"

#Unicorn PID File
pid "/home/admin/web/wreckerrobotics.com/pids/unicorn.pid"


#Path to logs
stderr_path "/home/admin/web/congocoltan.cf/logs/unicorn.log"
stdout_path "/home/admin/web/congocoltan.cf/logs/unicorn.log"

#Unicorn Socket
listen "/tmp/unicorn.wreck.sock"

#Number of processes
worker_processes 2

timeout 30
