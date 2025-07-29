# 🍏 NutriTrack: Tu Guía de Bienestar Personal 🥕

## Manual de Uso e Instalación

---

### **1. Introducción al Proyecto**

**NutriTrack** es una aplicación prototipo diseñada para ayudar a los usuarios a llevar un control personalizado de su peso y su ingesta diaria de alimentos. Permite a los usuarios registrar su peso, añadir alimentos personalizados con sus valores nutricionales (calorías, carbohidratos, proteínas, grasas) y registrar el consumo diario de estos alimentos para calcular los totales de macronutrientes.

Este proyecto tiene como objetivo principal ofrecer una herramienta intuitiva y adaptable para fomentar hábitos de vida saludables, especialmente en contextos donde el acceso a información nutricional específica para alimentos locales puede ser un desafío.

**Desarrollado por:** [Luis Zamora]

---

### **2. Arquitectura del Proyecto**

NutriTrack está construido con una arquitectura de cliente-servidor, utilizando las siguientes tecnologías:

* **Backend (API):**
    * **Django:** Framework de Python que gestiona la lógica de negocio, la base de datos (SQLite por defecto para desarrollo), la autenticación de usuarios y las APIs RESTful.
    * **Django REST Framework:** Para construir las APIs que permiten la comunicación con el frontend.
* **Frontend (Interfaz de Usuario):**
    * **ReactJS:** Librería de JavaScript para construir la interfaz de usuario de forma modular y reactiva.
    * **Axios:** Para realizar solicitudes HTTP a la API del backend.
    * **CSS:** Estilos personalizados para un diseño limpio y funcional.

La comunicación entre el frontend y el backend se realiza a través de una API RESTful, lo que permite una separación clara de responsabilidades y una mayor flexibilidad.

---

### **3. Requisitos del Sistema**

Para instalar y ejecutar este proyecto, necesitarás tener lo siguiente instalado en tu sistema:

* **Python 3.x:** Se recomienda Python 3.8 o superior.
    * Puedes descargarlo desde: [https://www.python.org/downloads/](https://www.python.org/downloads/)
* **pip:** El gestor de paquetes de Python (normalmente viene con Python).
* **Node.js y npm (o Yarn):** Se recomienda Node.js versión 14 o superior.
    * Puedes descargarlo desde: [https://nodejs.org/es/download/](https://nodejs.org/es/download/)
* **Git:** Para clonar el repositorio.
    * Puedes descargarlo desde: [https://git-scm.com/downloads](https://git-scm.com/downloads)
* **Un editor de código:** Visual Studio Code es altamente recomendado.

---

### **4. Guía de Instalación**

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1.  **Clonar el Repositorio:**
    Abre tu terminal (Git Bash, PowerShell, o Símbolo del Sistema) y ejecuta el siguiente comando para clonar el proyecto a tu máquina:
    ```bash
    git clone `https://github.com/luisz2210/NutriTrack-Proyecto-Innovacion.git`
    ```
    * carpeta del proyecto:
    ```bash
    cd "NutriTrack-Proyecto-Innovacion"
    ```

2.  **Configuración del Backend (Django):**
    * carpeta del backend:
        ```bash
        cd nutritrack_project
        ```
    * **Crear un entorno virtual (recomendado):**
        ```bash
        python -m venv venv
        ```
    * **Activar el entorno virtual:**
        * **Windows:**
            ```bash
            .\venv\Scripts\activate
            ```
        * **macOS/Linux:**
            ```bash
            source venv/bin/activate
            ```
    * **Instalar dependencias de Python:**
        ```bash
        pip install -r requirements.txt
        ```
        *Si no tienes un `requirements.txt`, ejecuta:*
        ```bash
        pip install Django djangorestframework djangorestframework-simplejwt Pillow
        # Y si usas CORS:
        pip install django-cors-headers
        ```
        *Luego crea el requirements.txt:*
        ```bash
        pip freeze > requirements.txt
        ```
    * **Aplicar migraciones de la base de datos:**
        ```bash
        python manage.py makemigrations
        python manage.py migrate
        ```
    * **Crear un superusuario (para acceder al panel de administración de Django):**
        ```bash
        python manage.py createsuperuser
        ```
        *(Sigue las instrucciones para crear el usuario y contraseña.)*
    * **Ejecutar el servidor de desarrollo del backend:**
        ```bash
        python manage.py runserver
        ```
        El servidor backend se ejecutará en `http://127.0.0.1:8000/`.

3.  **Configuración del Frontend (React):**
    * carpeta del frontend:
        ```bash
        cd "C:\Users\Usuario\Proyecto Innovacion\frontend"
        ```
    * **Instalar dependencias de Node.js:**
        ```bash
        npm install
        # O si usas Yarn: yarn install
        ```
    * **Ejecutar la aplicación React:**
        ```bash
        npm start
        # O si usas Yarn: yarn start
        ```
        La aplicación se abrirá automáticamente en `http://localhost:3000/`.

---

### **5. Guía de Uso**

Una vez que ambos servidores (Django backend y React frontend) estén funcionando:

1.  **Acceder a la Aplicación:**
    * Abrir `http://localhost:3000/`.

2.  **Registro de Usuarios:**
    * En la pantalla inicial, si no tienes cuenta, usa la sección "Registrarse" para crear un nuevo usuario. Ingresa un nombre de usuario, correo electrónico, nombre, apellido y contraseña.

3.  **Inicio de Sesión:**
    * Después de registrarte o si ya tienes una cuenta, usa la sección "Iniciar Sesión" con tu usuario y contraseña. Una vez que inicies sesión, la página se recargará y verás el panel principal de NutriTrack.

4.  **Panel Principal (Usuario Autenticado):**
    * **Datos del Perfil:** Verás la información básica de tu perfil. En futuras versiones, podrías editarla desde aquí.
    * **Registro de Peso:**
        * Ingresa tu peso actual en kilogramos en el campo provisto.
        * Haz clic en "Añadir Peso". El registro aparecerá en el "Historial de Peso" con la fecha.
        * Para eliminar un registro de peso, haz clic en el botón "Eliminar" al lado del registro.
    * **Añadir Nuevo Alimento:**
        * Rellena los campos "Nombre", "Calorías", "Carbohidratos", "Proteínas" y "Grasas" para un nuevo alimento que desees registrar (por ejemplo, "Arepa", "150", "30", "5", "3").
        * Haz clic en "Añadir Alimento". El alimento se agregará a tu "Lista de Alimentos" personal.
        * Para eliminar un alimento de tu lista, haz clic en el botón "Eliminar" al lado del alimento.
    * **Ingesta Diaria:**
        * En la sección "Añadir Alimento del Día", selecciona un alimento de la lista desplegable (los que hayas añadido previamente).
        * Ingresa la "Cantidad en gramos" de ese alimento que consumiste.
        * Haz clic en "Añadir". La aplicación registrará el consumo y actualizará tus totales de calorías y macronutrientes para el día.
        * Los registros de consumo del día aparecerán en "Comidas del día".
        * Para eliminar un consumo del día, haz clic en el botón "Eliminar" al lado del registro.
    * **Cerrar Sesión:**
        * Haz clic en el botón "Cerrar Sesión" en la parte superior derecha para salir de tu cuenta.

---

### **6. Consideraciones Adicionales**

* **Rutas de la API:** El frontend se comunica con el backend a través de `http://127.0.0.1:8000/api/`. Asegúrate de que el backend esté ejecutándose en este puerto.
* **Base de Datos:** Por defecto, Django usa SQLite para desarrollo, y la base de datos `db.sqlite3` se crea en la carpeta `nutritrack_project`. Puedes borrarla y ejecutar `python manage.py migrate` de nuevo si quieres reiniciar la base de datos.
* **Autenticación:** La aplicación utiliza JWT (JSON Web Tokens) para la autenticación de usuarios.
* **Diseño Responsivo:** Aunque el enfoque principal no fue el diseño 100% responsivo para todos los dispositivos, la estructura se ha mejorado para una mejor visualización en pantallas de escritorio.

---
