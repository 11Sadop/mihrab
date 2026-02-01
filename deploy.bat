@echo off
echo Starting Deployment Process...
echo ===============================
echo 1. Adding changes...
git add .
echo.
echo 2. Committing changes...
git commit -m "Update Smart Assistant: Deep Search & New Content"
echo.
echo 3. Pushing to GitHub/Vercel...
git push
echo.
echo ===============================
echo Deployment command finished.
echo If you see errors above, please check if Git is installed.
echo Press any key to exit.
pause
