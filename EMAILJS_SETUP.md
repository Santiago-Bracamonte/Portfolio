# Configuración de EmailJS para el Formulario de Contacto

El formulario de contacto ahora usa **EmailJS** para enviar emails directamente a tu correo sin necesidad de backend.

## 📧 Pasos para Configurar EmailJS (GRATIS)

### 1. Crear Cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** (Registrarse)
3. Crea tu cuenta con tu email (puedes usar santiagobracamonte01@gmail.com)
4. Verifica tu email

### 2. Conectar tu Gmail
1. Una vez dentro del dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Haz clic en **"Connect Account"** y autoriza con tu cuenta de Gmail (santiagobracamonte01@gmail.com)
5. Dale un nombre al servicio (ej: "gmail_portfolio")
6. Guarda el **Service ID** (algo como: `service_abc123`)

### 3. Crear Template de Email
1. Ve a **"Email Templates"** en el menú lateral
2. Haz clic en **"Create New Template"**
3. Usa esta configuración:

**Template Settings:**
```
Template Name: Portfolio Contact Form
To Email: {{to_email}} (o directamente: santiagobracamonte01@gmail.com)
From Name: {{from_name}}
From Email: {{from_email}}
Subject: Portfolio Contact: {{subject}}
```

**Content (HTML):**
```html
<h2>Nuevo mensaje desde tu Portfolio</h2>
<p><strong>Nombre:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Asunto:</strong> {{subject}}</p>
<p><strong>Mensaje:</strong></p>
<p>{{message}}</p>
```

4. Guarda el template y copia el **Template ID** (algo como: `template_xyz789`)

### 4. Obtener tu Public Key
1. Ve a **"Account"** → **"General"**
2. Copia tu **Public Key** (algo como: `user_abc123xyz`)

### 5. Configurar el Portfolio
Abre el archivo `index.html` y reemplaza estas 3 líneas (busca al final del archivo):

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Línea ~597
```
Reemplaza `YOUR_PUBLIC_KEY` con tu Public Key

```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
```
Reemplaza:
- `YOUR_SERVICE_ID` con tu Service ID de Gmail
- `YOUR_TEMPLATE_ID` con tu Template ID

### 6. Ejemplo Completo
```javascript
// Debería verse así:
emailjs.init("user_abc123xyz");

// Y esta línea:
emailjs.sendForm('service_abc123', 'template_xyz789', contactForm)
```

## ✅ Verificar que Funciona

1. Abre tu portfolio en el navegador
2. Llena el formulario de contacto
3. Haz clic en "Send Message"
4. Deberías ver el mensaje "✓ Message sent successfully!"
5. Revisa tu email (santiagobracamonte01@gmail.com)

## 🎯 Ventajas de EmailJS

- ✅ **100% Gratis** hasta 200 emails/mes
- ✅ **Sin backend necesario** - funciona desde el frontend
- ✅ **Confiable** - emails llegan instantáneamente
- ✅ **Fácil de configurar** - solo 5 minutos
- ✅ **Múltiples servicios** - Gmail, Outlook, Yahoo, etc.

## 🔧 Solución de Problemas

**Si no llegan los emails:**
1. Verifica que los IDs estén correctos (Service ID, Template ID, Public Key)
2. Revisa la consola del navegador (F12) para ver errores
3. Asegúrate de que los campos del formulario coincidan con los del template:
   - `from_name`
   - `from_email`
   - `subject`
   - `message`

**Límite de emails:**
- Plan gratuito: 200 emails/mes
- Si necesitas más, puedes upgradar o crear otra cuenta

## 📱 Soporte
Si tienes problemas, revisa la documentación oficial:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
