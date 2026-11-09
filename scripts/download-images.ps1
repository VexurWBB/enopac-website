# Downloads fresh site images from Unsplash + Pexels (free commercial use).
$ErrorActionPreference = 'Stop'
$dest = Join-Path $PSScriptRoot '..\public\images'
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$images = [ordered]@{
  'hero-home.jpg'                 = 'local: upscale public/images/hero-home-source.png to 2560px'
  'hero-about.jpg'                = 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'hero-services.jpg'             = 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'hero-process.jpg'              = 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'hero-contact.jpg'              = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85'
  'hero-property-management.jpg'  = 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'hero-buyers-agency.jpg'        = 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'hero-development.jpg'          = 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'section-buyers.jpg'            = 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'section-about.jpg'             = 'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'section-portfolio.jpg'         = 'https://images.pexels.com/photos/1668379/pexels-photo-1668379.jpeg?auto=compress&cs=tinysrgb&w=1920'
  'region-wa.jpg'                 = 'https://images.unsplash.com/photo-1704630665217-dfdc8a48f057?auto=format&fit=crop&w=1920&q=85'
  'region-vic.jpg'                = 'https://images.unsplash.com/photo-1595434971780-79d5c20c5090?auto=format&fit=crop&w=1920&q=85'
}

foreach ($entry in $images.GetEnumerator()) {
  $out = Join-Path $dest $entry.Key
  if ($entry.Value -like 'local:*') {
    Write-Host "Skipping $($entry.Key) (local asset)"
    continue
  }
  Write-Host "Downloading $($entry.Key)..."
  curl.exe --ssl-no-revoke -L -sS -o $out $entry.Value
  $size = (Get-Item $out).Length
  if ($size -lt 50000) {
    throw "Download failed or file too small ($size bytes): $($entry.Key)"
  }
}

Write-Host "Done - $($images.Count) images saved to $dest"
