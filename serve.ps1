param([int]$Port = 4173)

$root = [System.IO.Path]::GetFullPath($PSScriptRoot)
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()
Write-Host "Personal site is running at http://localhost:$Port/"

$contentTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      while ($reader.ReadLine()) { }

      $requestPath = if ($requestLine -match '^GET\s+([^\s]+)') { $Matches[1] } else { "/" }
      $requestPath = [System.Uri]::UnescapeDataString(($requestPath -split '\?')[0])
      if ($requestPath -eq "/") { $requestPath = "/index.html" }

      $relativePath = $requestPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
      $filePath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath))

      if ($filePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -and [System.IO.File]::Exists($filePath)) {
        $body = [System.IO.File]::ReadAllBytes($filePath)
        $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $contentType = if ($contentTypes.ContainsKey($extension)) { $contentTypes[$extension] } else { "application/octet-stream" }
        $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      } else {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      }

      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($body, 0, $body.Length)
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
