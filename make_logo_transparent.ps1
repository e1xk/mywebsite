Add-Type -AssemblyName System.Drawing

$dir = 'C:\Users\zachw\.zcode\workspace\default\minecraft-texture-packs\assets'
$srcPath = Join-Path $dir 'logo-black.png'
$dstPath = Join-Path $dir 'logo.png'

$src = New-Object System.Drawing.Bitmap($srcPath)
$w = $src.Width
$h = $src.Height
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)

$sd = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$len = $sd.Stride * $h
$buf = New-Object byte[] $len
[System.Runtime.InteropServices.Marshal]::Copy($sd.Scan0, $buf, 0, $len)
$src.UnlockBits($sd)

# Chroma-key pure black to transparent with a smooth ramp on the pixel's
# brightest channel, so anti-aliased edges fade out instead of fringing.
$lo = 14
$hi = 84
for ($i = 0; $i -lt $len; $i += 4) {
    $b = $buf[$i]; $g = $buf[$i + 1]; $r = $buf[$i + 2]
    $v = $r; if ($g -gt $v) { $v = $g }; if ($b -gt $v) { $v = $b }
    if ($v -le $lo) {
        $buf[$i + 3] = 0
    } elseif ($v -lt $hi) {
        $buf[$i + 3] = [byte](255 * ($v - $lo) / ($hi - $lo))
    }
}

$out = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$od = $out.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
[System.Runtime.InteropServices.Marshal]::Copy($buf, 0, $od.Scan0, $len)
$out.UnlockBits($od)
$out.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$out.Dispose()
Write-Output "OK $w x $h -> $dstPath"
