
@echo off
setlocal

set "MAVEN_PROJECTBASEDIR=%~dp0"
set "MAVEN_WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper"

java "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" -classpath "%MAVEN_WRAPPER_DIR%\maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %*

if errorlevel 1 exit /b %ERRORLEVEL%

endlocal
