Add-Type -AssemblyName System.Drawing

$rawFolder = Join-Path $PSScriptRoot "raw_images"
$outputFolder = Join-Path $PSScriptRoot "public/images"

if (-not (Test-Path $rawFolder)) {
    New-Item -ItemType Directory -Path $rawFolder | Out-Null
    Write-Host "Creado directorio 'raw_images/' en la raiz de tu proyecto."
    Write-Host "Por favor, coloca las imagenes crudas que quieras procesar dentro de 'raw_images/' y vuelve a ejecutar este script."
    exit
}

$files = Get-ChildItem -Path $rawFolder -Include *.png, *.jpg, *.jpeg -File -Recurse
if ($files.Count -eq 0) {
    Write-Host "No se encontraron imagenes (.png, .jpg, .jpeg) dentro de 'raw_images/'."
    Write-Host "Coloca tus fotos crudas alli y vuelve a ejecutar el comando."
    exit
}

if (-not (Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
}

Write-Host "Procesando $($files.Count) imagenes..."

foreach ($file in $files) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Redimensionar a un maximo de 1200px manteniendo la relacion de aspecto
        $maxWidth = 1200
        $newWidth = $img.Width
        $newHeight = $img.Height
        
        if ($img.Width -gt $maxWidth) {
            $newWidth = $maxWidth
            $newHeight = [int]($img.Height * ($newWidth / $img.Width))
        }
        
        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
        $g.Dispose()
        $img.Dispose()
        
        $destPath = Join-Path $outputFolder "$($file.BaseName).jpg"
        
        $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
        $jpegCodec = $null
        foreach ($codec in $codecs) {
            if ($codec.FormatDescription -eq "JPEG") {
                $jpegCodec = $codec
                break
            }
        }
        
        if ($jpegCodec -ne $null) {
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75)
            $bmp.Save($destPath, $jpegCodec, $encoderParams)
        } else {
            $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        }
        
        $bmp.Dispose()
        Write-Host "✅ Procesada con éxito: $($file.Name) -> public/images/$($file.BaseName).jpg"
    } catch {
        Write-Host "❌ Error procesando $($file.Name): $_"
    }
}

Write-Host "¡Proceso de optimización terminado con éxito!"
