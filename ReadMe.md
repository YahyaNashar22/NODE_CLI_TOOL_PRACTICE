# HOW TO START
- cd tool
  - npm install ( for external dependencies )
  - npm link
- cd ../testProject
  - npm link tool

  # HOW TO STOP
  - npm uninstall -g tool


# USAGE
- tool [CMD] -> execute command
- DEBUG=* tool [CMD] -> execute command with debug logs
- DEBUG=[filter]:* tool [CMD] -> execute command and shows debug logs for *filter* only