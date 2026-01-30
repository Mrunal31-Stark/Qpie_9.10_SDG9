@echo off
echo =======================================
echo MongoDB Startup Script
echo =======================================
echo.

echo Checking MongoDB service status...
sc query MongoDB >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    echo MongoDB service found!
    echo.
    echo Starting MongoDB service...
    net start MongoDB
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ MongoDB started successfully!
    ) else (
        echo.
        echo ❌ Failed to start MongoDB service
        echo Run this script as Administrator
    )
) else (
    echo.
    echo ❌ MongoDB service not found
    echo.
    echo Options:
    echo 1. Install MongoDB as a service
    echo 2. Start mongod manually
    echo.
    echo Starting mongod manually...
    echo.
    
    REM Try to start mongod from common installation paths
    if exist "C:\Program Files\MongoDB\Server\*\bin\mongod.exe" (
        for /d %%i in ("C:\Program Files\MongoDB\Server\*") do (
            "%%i\bin\mongod.exe" --dbpath=C:\data\db
        )
    ) else (
        echo MongoDB not found in default installation path
        echo Please install MongoDB or configure the path
    )
)

echo.
pause
