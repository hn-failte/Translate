@echo off

if "%1"=="h" goto begin

start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit

:begin

echo "Run Server at 127.0.0.1:3000" && start http://127.0.0.1:3000/ && node server.js