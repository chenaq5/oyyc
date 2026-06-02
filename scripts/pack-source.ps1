# 偶艺云承 - 源代码打包脚本
# 打包自主开发的源代码，排除 node_modules、开发工具等

$PROJECT_NAME = "oyyc-source"
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"
$OUTPUT_FILE = "..\${PROJECT_NAME}_${TIMESTAMP}.zip"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  oyyc - Source Code Packaging Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "e:\download\Trae CN\oyyc"

$sourceItems = @(
    "src",
    "docs",
    "css",
    "fonts",
    "js",
    "index.html",
    "package.json",
    "vite.config.js",
    "vue.config.js",
    ".env.example",
    "server.js",
    "api-server.js",
    "simple-server.js",
    "port-test.js",
    "test-server.js",
    "test-baas.html",
    "test-minapp-sdk.html",
    "dist.zip",
    ".gitignore"
)

Write-Host "Source files list:" -ForegroundColor Yellow
foreach ($item in $sourceItems) {
    if (Test-Path $item) {
        Write-Host "  [+] $item" -ForegroundColor Green
    } else {
        Write-Host "  [-] $item (not found)" -ForegroundColor Red
    }
}
Write-Host ""

$tempDir = ".\temp_source_pack"
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

Write-Host "Copying source files..." -ForegroundColor Yellow
foreach ($item in $sourceItems) {
    if (Test-Path $item) {
        $dest = Join-Path $tempDir $item
        if (Test-Path $dest) {
            Remove-Item -Recurse -Force $dest
        }
        Copy-Item -Recurse -Path $item -Destination $dest
        Write-Host "  Done: $item" -ForegroundColor Green
    }
}

Write-Host "Cleaning development files..." -ForegroundColor Yellow
$cleanPatterns = @("*.log", ".DS_Store", "Thumbs.db")
foreach ($pattern in $cleanPatterns) {
    Get-ChildItem -Path $tempDir -Filter $pattern -Recurse -Force | Remove-Item -Force -ErrorAction SilentlyContinue
}

$readmeContent = @"
# oyyc - Source Code Package

## Package Time
$((Get-Date).ToString("yyyy-MM-dd HH:mm:ss"))

## Project Info
- Name: oyyc
- Tech: Vue 3 + Vite
- Vue: 3.5.13
- Vue Router: 4.4.5
- Vite: 6.0.5

## Directory Structure
oyyc/
  src/           - Vue source code
  docs/          - Documentation
  css/           - CSS files
  fonts/         - Font files
  js/            - JavaScript files
  index.html     - HTML entry
  package.json   - Dependencies
  vite.config.js - Vite config
  server.js      - Node server

## Dependencies
- vue: ^3.5.13
- vue-router: ^4.4.5
- axios: ^1.15.2
- express: ^4.22.1
- vite: ^6.0.5

## Installation
1. Extract this package
2. cd oyyc
3. npm install
4. cp .env.example .env
5. npm run dev

## AI Models Used
- Doubao Seedream (image generation): doubao-seedream-4-0-250828
- Doubao Seed (chat): doubao-seed-2-0-pro-260215
"@

$readmeContent | Out-File -FilePath (Join-Path $tempDir "README.md") -Encoding UTF8

Write-Host ""
Write-Host "Creating archive..." -ForegroundColor Yellow
$zipPath = "..\${PROJECT_NAME}_${TIMESTAMP}.zip"
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

Remove-Item -Recurse -Force $tempDir

$fileSize = "{0:N2} MB" -f ((Get-Item $zipPath).Length / 1MB)

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Packaging Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Output: $zipPath" -ForegroundColor Cyan
Write-Host "Size: $fileSize" -ForegroundColor Cyan
Write-Host ""
