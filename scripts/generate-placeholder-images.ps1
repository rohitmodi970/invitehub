# Generates placeholder PNG previews for missing template images.
# Run from repo root: powershell -ExecutionPolicy Bypass -File scripts/generate-placeholder-images.ps1

Add-Type -AssemblyName System.Drawing

$OutDir = Join-Path $PSScriptRoot "..\public\images\templates"
$OutDir = [System.IO.Path]::GetFullPath($OutDir)

function New-PlaceholderImage {
    param(
        [string]$FileName,
        [string]$Title,
        [string]$Subtitle,
        [int]$Width = 900,
        [int]$Height = 1200,
        [string]$BgHex = "#E8ECF0",
        [string]$AccentHex = "#2563EB"
    )

    $path = Join-Path $OutDir $FileName
    if (Test-Path $path) {
        Write-Host "SKIP (exists): $FileName"
        return
    }

    $bmp = New-Object System.Drawing.Bitmap $Width, $Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $bg = [System.Drawing.ColorTranslator]::FromHtml($BgHex)
    $accent = [System.Drawing.ColorTranslator]::FromHtml($AccentHex)
    $muted = [System.Drawing.Color]::FromArgb(90, 100, 110)
    $white = [System.Drawing.Color]::White

    $g.Clear($bg)

    $borderPen = New-Object System.Drawing.Pen $accent, 6
    $g.DrawRectangle($borderPen, 40, 40, $Width - 80, $Height - 80)

    $accentBrush = New-Object System.Drawing.SolidBrush $accent
    $g.FillRectangle($accentBrush, 40, 40, $Width - 80, 120)

    $titleFont = New-Object System.Drawing.Font "Segoe UI", 36, [System.Drawing.FontStyle]::Bold
    $subFont = New-Object System.Drawing.Font "Segoe UI", 18
    $labelFont = New-Object System.Drawing.Font "Segoe UI", 14
    $watermarkFont = New-Object System.Drawing.Font "Segoe UI", 22, [System.Drawing.FontStyle]::Bold

    $whiteBrush = New-Object System.Drawing.SolidBrush $white
    $mutedBrush = New-Object System.Drawing.SolidBrush $muted
    $accentTextBrush = New-Object System.Drawing.SolidBrush $accent

    $titleRect = New-Object System.Drawing.RectangleF 60, 70, ($Width - 120), 80
    $g.DrawString($Title, $titleFont, $whiteBrush, $titleRect)

    $subRect = New-Object System.Drawing.RectangleF 60, 200, ($Width - 120), 200
    $g.DrawString($Subtitle, $subFont, $mutedBrush, $subRect)

    $wmRect = New-Object System.Drawing.RectangleF 60, ($Height - 220), ($Width - 120), 60
    $g.DrawString("PLACEHOLDER PREVIEW", $watermarkFont, $accentTextBrush, $wmRect)

    $fileRect = New-Object System.Drawing.RectangleF 60, ($Height - 160), ($Width - 120), 40
    $g.DrawString($FileName, $labelFont, $mutedBrush, $fileRect)

    $siteRect = New-Object System.Drawing.RectangleF 60, ($Height - 120), ($Width - 120), 40
    $g.DrawString("InviteHub.in - replace with ChatGPT image", $labelFont, $mutedBrush, $siteRect)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    $borderPen.Dispose()
    $accentBrush.Dispose()
    $whiteBrush.Dispose()
    $mutedBrush.Dispose()
    $accentTextBrush.Dispose()
    $titleFont.Dispose()
    $subFont.Dispose()
    $labelFont.Dispose()
    $watermarkFont.Dispose()

    Write-Host "CREATED: $FileName"
}

$images = @(
    @{ File = "royal-purple.png"; Title = "Royal Purple"; Sub = "Luxurious purple and gold royal wedding invitation"; Bg = "#4C1D95"; Accent = "#D4AF37" },
    @{ File = "royal-purple-thumb.png"; Title = "Royal Purple"; Sub = "Thumbnail preview"; Bg = "#4C1D95"; Accent = "#D4AF37"; W = 450; H = 600 },
    @{ File = "floral-bloom.png"; Title = "Floral Bloom"; Sub = "Watercolor floral garden wedding invitation"; Bg = "#FFF5F7"; Accent = "#DB7093" },
    @{ File = "floral-bloom-thumb.png"; Title = "Floral Bloom"; Sub = "Thumbnail preview"; Bg = "#FFF5F7"; Accent = "#DB7093"; W = 450; H = 600 },
    @{ File = "modern-blush.png"; Title = "Modern Blush"; Sub = "Blush pink minimalist wedding invitation"; Bg = "#FFF0F3"; Accent = "#E8998D" },
    @{ File = "modern-blush-thumb.png"; Title = "Modern Blush"; Sub = "Thumbnail preview"; Bg = "#FFF0F3"; Accent = "#E8998D"; W = 450; H = 600 },
    @{ File = "traditional-maroon.png"; Title = "Traditional Maroon"; Sub = "Rich maroon and gold Indian wedding invitation"; Bg = "#5C0A0A"; Accent = "#D4AF37" },
    @{ File = "traditional-maroon-thumb.png"; Title = "Traditional Maroon"; Sub = "Thumbnail preview"; Bg = "#5C0A0A"; Accent = "#D4AF37"; W = 450; H = 600 },
    @{ File = "luxury-black.png"; Title = "Luxury Black"; Sub = "Black and white formal luxury invitation"; Bg = "#111111"; Accent = "#C0C0C0" },
    @{ File = "luxury-black-thumb.png"; Title = "Luxury Black"; Sub = "Thumbnail preview"; Bg = "#111111"; Accent = "#C0C0C0"; W = 450; H = 600 },
    @{ File = "pastel-garden.png"; Title = "Pastel Garden"; Sub = "Soft pastel botanical garden invitation"; Bg = "#F0F7F0"; Accent = "#7CB87C" },
    @{ File = "pastel-garden-thumb.png"; Title = "Pastel Garden"; Sub = "Thumbnail preview"; Bg = "#F0F7F0"; Accent = "#7CB87C"; W = 450; H = 600 },
    @{ File = "white-elegance.png"; Title = "White Elegance"; Sub = "Cream and gold monogram wedding invitation"; Bg = "#FAF7F2"; Accent = "#C9A227" },
    @{ File = "botanical-garden.png"; Title = "Botanical Garden"; Sub = "Sage green botanical wedding invitation"; Bg = "#EEF4EC"; Accent = "#5F7A61" },
    @{ File = "midnight-romance.png"; Title = "Midnight Romance"; Sub = "Navy stars and gold script evening invitation"; Bg = "#0F1729"; Accent = "#D4AF37" },
    @{ File = "arc-minimalist.png"; Title = "Arc Minimalist"; Sub = "Terracotta arch modern editorial invitation"; Bg = "#F5EDE6"; Accent = "#C45C3E" },
    @{ File = "ink-blush.png"; Title = "Ink Blush"; Sub = "Blush lavender watercolor modern invitation"; Bg = "#F8F0F8"; Accent = "#B57EDC" },
    @{ File = "neo-brutal.png"; Title = "Neo Brutalist"; Sub = "Bold black border graphic invitation"; Bg = "#FFFFFF"; Accent = "#000000" },
    @{ File = "golden-paisley.png"; Title = "Golden Paisley"; Sub = "Brown gold paisley Indian wedding invitation"; Bg = "#3D2314"; Accent = "#D4AF37" },
    @{ File = "marigold-fiesta.png"; Title = "Marigold Fiesta"; Sub = "Saffron maroon rangoli festive Indian invitation"; Bg = "#7A1F00"; Accent = "#FF9933" },
    @{ File = "kerala-temple.png"; Title = "Kerala Temple"; Sub = "Golden saffron temple arch South Indian invitation"; Bg = "#FFF8E7"; Accent = "#C8860A" },
    @{ File = "modern-floral.png"; Title = "Modern Floral Geometric"; Sub = "Colorful geometric floral fusion invitation"; Bg = "#FFF5F0"; Accent = "#E07A5F" },
    @{ File = "baby-shower-minimal-nursery.png"; Title = "Minimal Nursery"; Sub = "Scandinavian neutral baby shower invitation"; Bg = "#F5F3EF"; Accent = "#A8A29E" },
    @{ File = "birthday-magazine-cover.png"; Title = "Magazine Cover"; Sub = "Editorial Vogue-style birthday invitation"; Bg = "#1A1A1A"; Accent = "#FFFFFF" },
    @{ File = "birthday-vintage-film.png"; Title = "Vintage Film"; Sub = "Retro polaroid nostalgic birthday invitation"; Bg = "#3D2B1F"; Accent = "#E8C49A" },
    @{ File = "anniversary-hearts.png"; Title = "Anniversary Hearts"; Sub = "Romantic red milestone anniversary invitation"; Bg = "#FFF0F0"; Accent = "#C0392B" }
)

foreach ($img in $images) {
    $w = if ($img.W) { $img.W } else { 900 }
    $h = if ($img.H) { $img.H } else { 1200 }
    New-PlaceholderImage -FileName $img.File -Title $img.Title -Subtitle $img.Sub -Width $w -Height $h -BgHex $img.Bg -AccentHex $img.Accent
}

Write-Host "`nDone. Output: $OutDir"
