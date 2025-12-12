# 📋 Instrucciones para configurar el Webhook de Bajas en Make/n8n

## 🎯 Objetivo

Automatizar el procesamiento de solicitudes de baja de usuarios que llegan desde el formulario web `/baja`.

---

## 📍 Paso 1: Obtener la URL del Webhook

### En Make.com:
1. Crear un nuevo **Scenario**
2. Añadir módulo **Webhooks → Custom Webhook**
3. Crear un webhook nuevo
4. Copiar la URL que te da (ejemplo: `https://hook.eu2.make.com/xxxxxxxx`)

### En n8n:
1. Crear un nuevo **Workflow**
2. Añadir nodo **Webhook**
3. Configurar:
   - **Method**: POST
   - **Path**: `/baja` (o el que prefieras)
4. Copiar la **Production URL**

---

## 📍 Paso 2: Actualizar el código del formulario

1. Abrir el archivo: `/home/user/cookyourwebai/src/pages/Unsubscribe.tsx`
2. Localizar la línea **31**:
   ```typescript
   const webhookUrl = 'https://hook.eu2.make.com/TU_WEBHOOK_AQUI';
   ```
3. Reemplazar `TU_WEBHOOK_AQUI` con tu URL del webhook

---

## 📍 Paso 3: Configurar el flujo de automatización

### 📦 Datos que recibirás del webhook:

```json
{
  "email": "usuario@example.com",
  "phone": "+34 600 000 000",
  "reason": "Ya no me interesa",
  "timestamp": "2024-12-12T10:30:00.000Z",
  "source": "web_form_baja"
}
```

---

## 🔄 Flujo recomendado en Make/n8n

### **OPCIÓN A: Flujo básico (soft delete)**

```
1. Webhook (recibe datos)
    ↓
2. Airtable - Search Record
   - Table: Contactos
   - Search by: Email = {{email}}
    ↓
3. Airtable - Update Record
   - Record ID: {{resultado del paso 2}}
   - Fields:
     * Estado = "DADO DE BAJA"
     * Fecha_Baja = {{timestamp}}
     * Motivo_Baja = {{reason}}
    ↓
4. Gmail/Email - Send
   - To: {{email}}
   - Subject: "Confirmación de baja - CookYourWeb"
   - Body: [ver plantilla abajo]
    ↓
5. Airtable - Create Record (registro de auditoría)
   - Table: Historial_Bajas
   - Fields:
     * Email = {{email}}
     * Phone = {{phone}}
     * Fecha = {{timestamp}}
     * Motivo = {{reason}}
     * Procesado = "Sí"
```

---

### **OPCIÓN B: Flujo con validación**

```
1. Webhook (recibe datos)
    ↓
2. Filter: Email is not empty
    ↓
3. Airtable - Search Record
   - Search: Email = {{email}}
    ↓
4. Router (2 rutas):

   [A] Si encuentra el contacto:
       → Update: Estado = "DADO DE BAJA"
       → Send: Email de confirmación
       → Create: Registro en Historial_Bajas

   [B] Si NO encuentra el contacto:
       → Send: Email a veronica@usecookyourwebai.es
       → Subject: "Baja solicitada - usuario no encontrado"
       → Body: "Email: {{email}}, Phone: {{phone}}"
```

---

## 📧 Plantilla de email de confirmación

### Asunto:
```
Confirmación de baja - CookYourWeb
```

### Cuerpo (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">CookYourWeb</h1>
    </div>

    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333;">Confirmación de baja</h2>

        <p style="color: #666; line-height: 1.6;">
            Hola,
        </p>

        <p style="color: #666; line-height: 1.6;">
            Hemos recibido tu solicitud de baja y hemos procedido a eliminar tus datos de nuestra base de datos.
        </p>

        <div style="background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
            <p style="margin: 0; color: #333;"><strong>Datos eliminados:</strong></p>
            <ul style="color: #666; margin: 10px 0;">
                <li>Información de contacto</li>
                <li>Historial de conversaciones</li>
                <li>Preferencias de comunicación</li>
            </ul>
        </div>

        <p style="color: #666; line-height: 1.6;">
            Ya no recibirás comunicaciones comerciales de nuestra parte.
        </p>

        <p style="color: #666; line-height: 1.6;">
            Sentimos verte partir 😢. Si en el futuro cambias de opinión, siempre serás bienvenido/a de nuevo en <a href="https://cookyourweb.es" style="color: #667eea;">cookyourweb.es</a>
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

        <p style="color: #999; font-size: 12px; text-align: center;">
            CookYourWeb - Verónica Serna Pérez<br>
            C/ Tejera 35 1B, 28210 Valdemorillo, Madrid<br>
            <a href="mailto:veronica@usecookyourwebai.es" style="color: #667eea;">veronica@usecookyourwebai.es</a>
        </p>
    </div>
</body>
</html>
```

---

## 🔒 Actualizar flujos existentes (IMPORTANTE)

Todos tus flujos de Make/n8n que envían mensajes de WhatsApp o emails deben **filtrar los contactos dados de baja**.

### Ejemplo de filtro en Make:

```
Antes del módulo "Send WhatsApp":

1. Airtable - Get Record
   - Record ID: {{contact_id}}

2. Filter
   - Condición: Estado ≠ "DADO DE BAJA"
   - Si pasa: → Send message
   - Si no pasa: → Stop (no enviar)
```

### En n8n:

```javascript
// Nodo IF/Switch
{{ $json.Estado !== "DADO DE BAJA" }}
```

---

## 📊 Estructura de tabla Airtable recomendada

### Tabla principal: **Contactos**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Email | Email | Email del contacto |
| Nombre | Single line text | Nombre |
| Teléfono | Phone number | Teléfono |
| Estado | Single select | Opciones: "ACTIVO", "DADO DE BAJA", "PENDIENTE" |
| Fecha_Alta | Date | Fecha de registro |
| Fecha_Baja | Date | Fecha de baja (vacío si activo) |
| Motivo_Baja | Long text | Razón de la baja |
| Origen | Single select | Opciones: "Tally", "WhatsApp", "Web", "Manual" |

### Tabla de auditoría: **Historial_Bajas**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Email | Email | Email del contacto dado de baja |
| Teléfono | Phone | Teléfono (si lo tiene) |
| Fecha_Solicitud | Date | Fecha de la solicitud |
| Motivo | Long text | Razón indicada |
| Procesado | Checkbox | Si se procesó correctamente |
| Origen_Solicitud | Single select | "web_form_baja", "email", "whatsapp" |

---

## ⚠️ Consideraciones legales (RGPD)

### ✅ Hacer:
- Procesar la baja en **máximo 30 días** (mejor 24-48h)
- Enviar **email de confirmación**
- Guardar registro de la solicitud (auditoría)
- Dejar de enviar comunicaciones **inmediatamente**
- Conservar solo datos necesarios por obligaciones legales

### ❌ NO hacer:
- Ignorar solicitudes de baja
- Pedir "confirmación" adicional (ya confirmó en el form)
- Seguir enviando marketing después de la baja
- Vender/compartir datos después de la baja
- Dificultar el proceso de baja

---

## 🧪 Cómo probar

1. Ir a `http://localhost:5173/baja` (o tu dominio en producción)
2. Completar el formulario con un email de prueba
3. Verificar:
   - ✅ Datos llegan al webhook de Make/n8n
   - ✅ Se actualiza el registro en Airtable
   - ✅ Se envía el email de confirmación
   - ✅ Se crea registro en Historial_Bajas

---

## 📞 Soporte adicional

Si tienes dudas sobre la implementación:
- 📧 Email: veronica@usecookyourwebai.es
- 💬 WhatsApp: +34 688 75 77 82

---

## 🚀 Próximos pasos (Fase 2)

1. Añadir "BAJA" en mensajes de WhatsApp automatizados
2. Configurar respuesta automática a "BAJA" en WhatsApp
3. Crear dashboard de gestión de bajas
4. Implementar doble opt-in en altas nuevas
5. Configurar alertas si alguien intenta contactar a un usuario dado de baja

---

**Fecha de creación:** 2024-12-12
**Versión:** 1.0
