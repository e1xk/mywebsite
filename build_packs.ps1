# Scans Downloads\resourcepacks\*.zip and regenerates data.js + thumbnails.
# ASCII-only source: PowerShell 5.1 reads BOM-less files as ANSI, which
# corrupts non-ASCII literals (that is what broke the first run).
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = 'C:\Users\zachw\.zcode\workspace\default\minecraft-texture-packs'
$packsDir = Join-Path $root 'packs'
$thumbsDir = Join-Path $root 'assets\thumbs'
New-Item -ItemType Directory -Force -Path $packsDir | Out-Null
New-Item -ItemType Directory -Force -Path $thumbsDir | Out-Null
Get-ChildItem $packsDir -Filter *.zip | Remove-Item -Force
Get-ChildItem $thumbsDir -Filter *.png | Remove-Item -Force

function Emoji([int]$code) { return [System.Char]::ConvertFromUtf32($code) }

function Slug([string]$s) {
    $s = $s.ToLower() -replace '&', ' and ' -replace '\+', ' plus '
    $s = $s -replace '[^a-z0-9]+', '-'
    return $s.Trim('-')
}

function CleanName([string]$s) {
    $s = $s -replace '\u00A7.', ''          # section-sign color codes
    $s = $s -replace '_', ' ' -replace '\s+', ' '
    $s = $s -replace '(?<=\d) 21\.', '.21.' # "1 21.11" -> "1.21.11"
    $s = $s -replace '^[\!\.\s]+', ''
    $s = $s -replace '^fl(?=[A-Z])', ''
    return $s.Trim()
}

function StripCodes([string]$s) {
    if (-not $s) { return '' }
    return (($s -replace '\u00A7.', '') -replace '\s+', ' ').Trim()
}

function ResLabel([int]$w) {
    switch ($w) {
        16 { return '16x' } 32 { return '32x' } 48 { return '48x' }
        64 { return '64x' } 96 { return '96x' } 128 { return '128x' }
        256 { return '256x' } 512 { return '512x' }
    }
    if ($w -gt 512) { return 'HD' }
    return $null
}

function Category([string]$haystack) {
    if ($haystack -match 'totem|shield') { return 'Totem' }
    if ($haystack -match 'font')         { return 'Fonts' }
    if ($haystack -match 'GUI|hud')      { return 'UI' }
    if ($haystack -match 'glow|enchant') { return 'Effects' }
    if ($haystack -match 'fullbright|particle|rotation|shade|potato|fps') { return 'Utility' }
    return 'Texture'
}

$catEmoji = @{
    'Totem'   = Emoji 0x1F9FF
    'Fonts'   = Emoji 0x1F524
    'UI'      = Emoji 0x1F5A5
    'Effects' = Emoji 0x2728
    'Utility' = Emoji 0x1F6E0
    'Texture' = Emoji 0x1F3A8
}

$zips = Get-ChildItem "$env:USERPROFILE\Downloads\resourcepacks\*.zip" | Sort-Object Name
if (-not $zips) { throw 'No zips found in Downloads\resourcepacks' }

$packs = @()
$usedSlugs = @{}

foreach ($zip in $zips) {
    $name = CleanName ([IO.Path]::GetFileNameWithoutExtension($zip.Name))
    $slug = Slug $name
    if (-not $slug) { $slug = 'pack' }
    $i = 2
    while ($usedSlugs.ContainsKey($slug)) { $slug = "$slug-$i"; $i++ }
    $usedSlugs[$slug] = $true

    Copy-Item $zip.FullName (Join-Path $packsDir "$slug.zip") -Force

    $desc = ''
    $format = $null
    $thumb = $null
    $maxW = 0
    $za = [IO.Compression.ZipFile]::OpenRead($zip.FullName)
    try {
        foreach ($entry in $za.Entries) {
            $en = $entry.FullName -replace '\\', '/'
            $leaf = ($en -split '/')[-1]
            if ($leaf -ieq 'pack.mcmeta') {
                try {
                    $reader = New-Object IO.StreamReader($entry.Open())
                    $metaJson = $reader.ReadToEnd()
                    $reader.Close()
                    $meta = $metaJson | ConvertFrom-Json
                    if ($meta.pack.description -is [string]) { $desc = StripCodes $meta.pack.description }
                    elseif ($meta.pack.description.text) { $desc = StripCodes $meta.pack.description.text }
                    if ($meta.pack.pack_format) { $format = [int]$meta.pack.pack_format }
                } catch { }
            }
            elseif ($leaf -ieq 'pack.png' -and -not $thumb) {
                $out = Join-Path $thumbsDir "$slug.png"
                try {
                    $fs = [IO.File]::Create($out)
                    $src = $entry.Open()
                    $src.CopyTo($fs)
                    $src.Close(); $fs.Close()
                    $thumb = "assets/thumbs/$slug.png"
                } catch { }
            }
            elseif ($en -imatch '^assets/minecraft/textures/.*\.png$' -and $en -inotmatch '/gui/') {
                try {
                    $stream = $entry.Open()
                    $buf = New-Object byte[] 24
                    $read = $stream.Read($buf, 0, 24)
                    $stream.Close()
                    if ($read -ge 24 -and $buf[0] -eq 0x89 -and $buf[1] -eq 0x50) {
                        $w = ([int]$buf[16] -shl 24) -bor ([int]$buf[17] -shl 16) -bor ([int]$buf[18] -shl 8) -bor [int]$buf[19]
                        if ($w -gt $maxW -and $w -le 2048) { $maxW = $w }
                    }
                } catch { }
            }
        }
    } finally { $za.Dispose() }

    if ($desc -eq '') { $desc = 'A Minecraft resource pack. Drop the .zip into your resourcepacks folder.' }
    if ($desc.Length -gt 220) { $desc = $desc.Substring(0, $desc.LastIndexOf(' ')) + '...' }

    $cat = Category "$name $desc"
    $res = if ($maxW -gt 0) { ResLabel $maxW } else { $null }

    $packs += [ordered]@{
        id        = $slug
        name      = $name
        file      = "packs/$slug.zip"
        bytes     = $zip.Length
        category  = $cat
        emoji     = $catEmoji[$cat]
        res       = $res
        format    = $format
        added     = $zip.LastWriteTime.ToString('MMM d, yyyy')
        ts        = [long](($zip.LastWriteTime.ToUniversalTime()) - [datetime]'1970-01-01').TotalMilliseconds
        desc      = $desc
        thumb     = $thumb
        featured  = $false
    }
}

# feature the largest "Texture" pack (nicest showcase); fall back to largest overall
$texturePacks = @($packs | Where-Object { $_['category'] -eq 'Texture' })
$pool = if ($texturePacks.Count -gt 0) { $texturePacks } else { $packs }
($pool | Sort-Object { -$_['bytes'] } | Select-Object -First 1)['featured'] = $true

$json = ConvertTo-Json @($packs) -Depth 4
$js = "/* Auto-generated by build_packs.ps1 - do not edit by hand." + [char]10 +
      "   Drop new .zip packs into packs/ and re-run the script. */" + [char]10 +
      "window.REAL_PACKS = $json;" + [char]10
[IO.File]::WriteAllText((Join-Path $root 'data.js'), $js, (New-Object System.Text.UTF8Encoding($false)))

Write-Output ("Wrote data.js with " + $packs.Count + " packs")
$thumbs = (Get-ChildItem $thumbsDir -Filter *.png).Count
Write-Output ("Extracted $thumbs pack.png thumbnails")
