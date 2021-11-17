# tesis
Aplicación móvil para proyecto de título

# Recomendacion
Dado a problemas de compatibilidad y versiones de softwares (ionic, capacitor, android studio, entre otras) recomendamos probar la aplicación móvil a través de la apk generada.
Para descargarla acceder al siguiente link ---> https://www.mediafire.com/file/vp2xnj6ktaubp6n/geoen.apk/file

# Instrucciones
Para probar la aplicación de manera local se deberán de seguir los siguientes pasos:

### Aplicación móvil

1.- Se debera contar con ionic 5.5.2, capacitor 3.2.0 y android studio articfox 2020.3.1
2.- Clonar la carpeta tesis y luego acceder a la carpeta app-frontend.
3.- Instalar los paquetes de node a través del comando --> npm install.
4.- Ingresar el comando --> ionic build. 
5.- Abrir carpeta Android dentro de android studio.
6.- Abrir la aplicación con el emulador por defecto de android studio o configurar un emulador en android studio.
7.- Probar.

### Backend

1.- Instalar los paquetes de node a través del comando --> npm install.
2.- Instalar el paquete nodemon a través del comando --> npm install -g nodemon.
3.- Revisar que la carpeta dist este definada, en caso de no estarlo, ingresar el comando --> tsc.
4.- Correr la api a través del comando --> nodemon dist/app.js.

### Página web monitoreo

1.- Instalar los paquetes de node a través del comando --> npm install.
2.- Correr la aplicación web a través del comando --> ng serve -o

