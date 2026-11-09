Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$dest = Join-Path $PSScriptRoot "..\public\logo.png"

if (-not [System.Windows.Forms.Clipboard]::ContainsImage()) {
  Write-Error "No image on clipboard. Copy your logo first, then run this script again."
  exit 1
}

$img = [System.Windows.Forms.Clipboard]::GetImage()
$img.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved logo to $dest"
