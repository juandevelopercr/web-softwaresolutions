<?php
/**
 * enviar.php — Procesa el formulario de contacto de softwaresolutions.co.cr
 * Envía: (1) notificación HTML a los dueños, (2) confirmación HTML al cliente
 * Usa mail() de cPanel — sin credenciales SMTP expuestas
 */

// ── Configuración ────────────────────────────────────────────────────────────
define('FROM_EMAIL',   'noreply@softwaresolutions.co.cr');
define('FROM_NAME',    'Software Solutions S.A.');
define('REPLY_TO',     'info@softwaresolutions.co.cr');
define('OWNERS',       [
    'info@softwaresolutions.co.cr',
    'hromancr@gmail.com',
    'hroman@softwaresolutions.co.cr',
    'caceresvega@gmail.com',
]);
define('URL_EXITO',    'https://www.softwaresolutions.co.cr/gracias.html');
define('URL_ERROR',    'https://www.softwaresolutions.co.cr/contacto.html?error=1');
define('HONEYPOT',          '_honey');
define('TURNSTILE_SECRET',  '0x4AAAAAADsd9PUT16135x2G35wvktkyY8k');

// ── Solo POST ────────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contacto.html');
    exit;
}

// ── Honeypot: si viene con valor, es un bot ──────────────────────────────────
if (!empty($_POST[HONEYPOT])) {
    // Simular éxito para no revelar la trampa
    header('Location: ' . URL_EXITO);
    exit;
}

// ── Verificar Cloudflare Turnstile ───────────────────────────────────────────
$turnstileToken = $_POST['cf-turnstile-response'] ?? '';
if (empty($turnstileToken)) {
    header('Location: ' . URL_ERROR);
    exit;
}
$verify = file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false,
    stream_context_create(['http' => [
        'method'  => 'POST',
        'header'  => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query([
            'secret'   => TURNSTILE_SECRET,
            'response' => $turnstileToken,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
    ]])
);
$verifyData = json_decode($verify, true);
if (!($verifyData['success'] ?? false)) {
    header('Location: ' . URL_ERROR);
    exit;
}

// ── Leer y sanear campos ─────────────────────────────────────────────────────
function campo(string $key, int $max = 500): string {
    $val = $_POST[$key] ?? '';
    $val = trim($val);
    $val = strip_tags($val);
    return mb_substr($val, 0, $max);
}

$nombre   = campo('nombre',   100);
$empresa  = campo('empresa',  120);
$email    = campo('email',    150);
$telefono = campo('telefono',  20);
$interes  = campo('interes',   80);
$mensaje  = campo('mensaje', 2000);

// ── Validaciones básicas ─────────────────────────────────────────────────────
if (empty($nombre) || empty($email) || empty($mensaje)) {
    header('Location: ' . URL_ERROR);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . URL_ERROR);
    exit;
}

// ── Helper: cabeceras MIME para HTML ─────────────────────────────────────────
function cabeceras(string $fromName, string $fromEmail, string $replyTo = ''): string {
    $h  = "MIME-Version: 1.0\r\n";
    $h .= "Content-Type: text/html; charset=UTF-8\r\n";
    $h .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
    if ($replyTo) {
        $h .= "Reply-To: {$replyTo}\r\n";
    }
    $h .= "X-Mailer: PHP/" . phpversion();
    return $h;
}

// ── Plantilla base ───────────────────────────────────────────────────────────
function plantillaBase(string $contenido, string $pie): string {
    return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Software Solutions S.A.</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Cabecera -->
      <tr>
        <td style="background:#1a1a2e;border-radius:10px 10px 0 0;padding:28px 36px;text-align:center;">
          <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:1px;">
            Software Solutions S.A.
          </span><br>
          <span style="font-size:12px;color:#aab4c8;letter-spacing:2px;text-transform:uppercase;">
            softwaresolutions.co.cr
          </span>
        </td>
      </tr>

      <!-- Línea accent -->
      <tr><td style="background:#e63c20;height:4px;"></td></tr>

      <!-- Contenido -->
      <tr>
        <td style="background:#ffffff;padding:36px 36px 28px;border-radius:0 0 0 0;">
          {$contenido}
        </td>
      </tr>

      <!-- Pie -->
      <tr>
        <td style="background:#f0f2f5;border-radius:0 0 10px 10px;padding:20px 36px;text-align:center;
                   font-size:12px;color:#888;border-top:1px solid #e0e0e0;">
          {$pie}
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
HTML;
}

// ── Email 1: Notificación a dueños ───────────────────────────────────────────
$empresaFila = $empresa
    ? "<tr><td style='padding:8px 0;color:#555;font-size:14px;width:140px;vertical-align:top;'>Empresa</td>
       <td style='padding:8px 0;font-weight:600;color:#1a1a2e;font-size:14px;'>" . htmlspecialchars($empresa) . "</td></tr>"
    : '';
$telefonoFila = $telefono
    ? "<tr><td style='padding:8px 0;color:#555;font-size:14px;width:140px;vertical-align:top;'>Teléfono</td>
       <td style='padding:8px 0;font-weight:600;color:#1a1a2e;font-size:14px;'><a href='tel:{$telefono}' style='color:#e63c20;'>" . htmlspecialchars($telefono) . "</a></td></tr>"
    : '';
$interesFila = $interes
    ? "<tr><td style='padding:8px 0;color:#555;font-size:14px;width:140px;vertical-align:top;'>Interés</td>
       <td style='padding:8px 0;font-weight:600;color:#1a1a2e;font-size:14px;'>" . htmlspecialchars($interes) . "</td></tr>"
    : '';

$contenidoDuenos = "
<h2 style='margin:0 0 6px;color:#1a1a2e;font-size:20px;'>Nueva consulta recibida</h2>
<p style='margin:0 0 24px;color:#888;font-size:13px;'>Recibida el " . date('d/m/Y \a \l\a\s H:i') . " (hora del servidor)</p>

<table width='100%' cellpadding='0' cellspacing='0'
       style='border-top:1px solid #eee;margin-bottom:24px;'>
  <tr>
    <td style='padding:8px 0;color:#555;font-size:14px;width:140px;vertical-align:top;'>Nombre</td>
    <td style='padding:8px 0;font-weight:600;color:#1a1a2e;font-size:14px;'>" . htmlspecialchars($nombre) . "</td>
  </tr>
  {$empresaFila}
  <tr>
    <td style='padding:8px 0;color:#555;font-size:14px;width:140px;vertical-align:top;'>Correo</td>
    <td style='padding:8px 0;font-weight:600;color:#1a1a2e;font-size:14px;'>
      <a href='mailto:{$email}' style='color:#e63c20;'>" . htmlspecialchars($email) . "</a>
    </td>
  </tr>
  {$telefonoFila}
  {$interesFila}
</table>

<div style='background:#f8f9fa;border-left:4px solid #e63c20;border-radius:0 8px 8px 0;
            padding:16px 20px;margin-bottom:28px;'>
  <p style='margin:0 0 6px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;'>Mensaje</p>
  <p style='margin:0;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;'>" . htmlspecialchars($mensaje) . "</p>
</div>

<table cellpadding='0' cellspacing='0'>
  <tr>
    <td style='padding-right:12px;'>
      <a href='mailto:{$email}' style='display:inline-block;background:#e63c20;color:#fff;
         text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:700;'>
        Responder ahora
      </a>
    </td>
    " . ($telefono ? "<td>
      <a href='tel:{$telefono}' style='display:inline-block;background:#1a1a2e;color:#fff;
         text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:700;'>
        Llamar
      </a>
    </td>" : "") . "
  </tr>
</table>
";

$pieDuenos = "
  Este mensaje fue generado automáticamente desde el formulario de contacto de
  <a href='https://www.softwaresolutions.co.cr' style='color:#e63c20;'>softwaresolutions.co.cr</a><br>
  Software Solutions S.A. &nbsp;|&nbsp; Alajuela, Costa Rica &nbsp;|&nbsp; (506) 2101-3248
";

$htmlDuenos = plantillaBase($contenidoDuenos, $pieDuenos);

// Enviar a cada dueño
$asuntoDuenos = '=?UTF-8?B?' . base64_encode('Nueva consulta: ' . $nombre . ($empresa ? ' — ' . $empresa : '')) . '?=';
$cabDuenos    = cabeceras(FROM_NAME, FROM_EMAIL, $email);

foreach (OWNERS as $destinatario) {
    mail($destinatario, $asuntoDuenos, $htmlDuenos, $cabDuenos);
}

// ── Email 2: Confirmación al cliente ─────────────────────────────────────────
$contenidoCliente = "
<h2 style='margin:0 0 8px;color:#1a1a2e;font-size:20px;'>¡Gracias por contactarnos, " . htmlspecialchars($nombre) . "!</h2>
<p style='margin:0 0 24px;color:#555;font-size:15px;line-height:1.7;'>
  Hemos recibido su mensaje. Un miembro de nuestro equipo revisará su consulta
  y se pondrá en contacto con usted <strong>en menos de 24 horas hábiles</strong>.
</p>

<div style='background:#f8f9fa;border-radius:8px;padding:20px 24px;margin-bottom:28px;'>
  <p style='margin:0 0 12px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:1px;'>
    Resumen de su consulta
  </p>
  <p style='margin:0 0 6px;font-size:14px;color:#333;'>
    <strong>Nombre:</strong> " . htmlspecialchars($nombre) . "
  </p>
  " . ($empresa ? "<p style='margin:0 0 6px;font-size:14px;color:#333;'><strong>Empresa:</strong> " . htmlspecialchars($empresa) . "</p>" : '') . "
  " . ($interes ? "<p style='margin:0 0 6px;font-size:14px;color:#333;'><strong>Interés:</strong> " . htmlspecialchars($interes) . "</p>" : '') . "
  <p style='margin:8px 0 0;font-size:14px;color:#555;white-space:pre-wrap;'>" . htmlspecialchars($mensaje) . "</p>
</div>

<p style='margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;'>
  Si necesita contactarnos de inmediato, puede escribirnos directamente a
  <a href='mailto:info@softwaresolutions.co.cr' style='color:#e63c20;'>info@softwaresolutions.co.cr</a>
  o llamarnos al <a href='tel:+50621013248' style='color:#e63c20;'>(506) 2101-3248</a>.
</p>

<div style='border-top:1px solid #eee;padding-top:20px;'>
  <p style='margin:0;font-size:13px;color:#888;'>
    <strong style='color:#1a1a2e;'>Horario de atención:</strong>
    Lunes a viernes, 9:00 a.m. – 5:00 p.m.
  </p>
  <p style='margin:6px 0 0;font-size:13px;color:#888;'>
    <strong style='color:#1a1a2e;'>WhatsApp:</strong>
    <a href='https://wa.me/50672722255' style='color:#e63c20;'>(506) 7272-2255</a>
  </p>
</div>
";

$pieCliente = "
  © " . date('Y') . " Software Solutions S.A. &nbsp;|&nbsp; Alajuela, Costa Rica<br>
  Usted recibe este correo porque completó el formulario de contacto en
  <a href='https://www.softwaresolutions.co.cr' style='color:#e63c20;'>softwaresolutions.co.cr</a>
";

$htmlCliente = plantillaBase($contenidoCliente, $pieCliente);

$asuntoCliente = '=?UTF-8?B?' . base64_encode('Hemos recibido su consulta — Software Solutions S.A.') . '?=';
$cabCliente    = cabeceras(FROM_NAME, FROM_EMAIL, REPLY_TO);

mail($email, $asuntoCliente, $htmlCliente, $cabCliente);

// ── Redirigir al cliente a la página de éxito ────────────────────────────────
header('Location: ' . URL_EXITO);
exit;
