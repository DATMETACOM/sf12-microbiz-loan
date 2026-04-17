$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $projectRoot ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Missing .env in $projectRoot" -ForegroundColor Red
    Write-Host "Copy .env.example to .env and paste your Alibaba Cloud sk-... key into BAILIAN_API_KEY." -ForegroundColor Yellow
    exit 1
}

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) {
        return
    }

    $pair = $line -split "=", 2
    if ($pair.Count -ne 2) {
        return
    }

    $name = $pair[0].Trim()
    $value = $pair[1].Trim().Trim('"').Trim("'")
    [System.Environment]::SetEnvironmentVariable($name, $value, "Process")
}

Set-Location $projectRoot
qwen
