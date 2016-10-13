# Despliegues en iaas y heroku. Práctica 3 de SYTW

## Comandos para compilar la app en node
Para arrancar la aplicación de node se puede realizar o bien utilizando el comando
`node index.js`

O utilizar el arranque de la app con nodemon activo
`node run dev`

## Comandos heroku
Comando para iniciar sesión en heroku
`heroku login`

Comando para comprobar las aplicaciones creadas
`heroku apps`

Comando para crear una aplicación en heroku. En caso de que no se introduzca un nombre de app se crea uno aleatorio
`heroku create nombreapp`

Comando para eliminar una aplicación de heroku
`heroku apps:destroy --app --confirm nombreaplicacion`

Comando para visualizar el log de la aplicación en heroku
`heroku logs`

## Despliegue en servidor del IAAS
En esta práctica, además de desplegar el gitbook en heroku, también ofrecemos la posibilidad de hacerlo en nuestro propio servidor del [IAAS](http://www.ull.es/stic/category/iaas/).

Para ello, lo que haremos será ejecutar una servidor express que simplemente escuche cualquier petición en el puerto 8080 y controle únicamente la carpeta gh-pages. En nuestro caso, explicaremos el despliegue para la [rama gh-pages de la práctica 1](https://github.com/ULL-ESIT-SYTW-1617/tareas-iniciales-rafadanipedro/tree/gh-pages) de esta asignatura.

### Configurar claves ssh
Primero, generaremos un par de claves ssh para poder acceder a nuestro servidor sin necesidad de poner contraseña. Lo haremos con:
- `ssh-keygen -t rsa -b 2048`

Presionamos enter hasta que termine, puesto que no nos interesa cambiar los parámetros por defecto. Ahora copiamos nuestra clave en el servidor con:
- `ssh-copy-id usuario@direccion-servidor-iaas`

Nos pedirá la contraseña del usuario por primera y última vez. También crearemos un alias para que el acceso sea simplemente `ssh sytw` y no tener que escribir nada más para entrar. Haremos:
- `cd ~/.ssh`
- `nano config`

En el nuevo archivo pondremos:
```
Host sytw
    HostName direccion-servidor-iaas
    User usuario
```

Una vez escrito, guardamos el archivo y ya podremos conectarnos al servidor haciendo únicamente `ssh sytw`.

### Configurando servidor en IAAS
Con el acceso ssh configurado, nos conectamos al servidor y copiaremos en una carpeta los archivos que encontramos en [iaasserver](https://github.com/ULL-ESIT-SYTW-1617/practica-despliegues-en-iaas-y-heroku-rafadanipedro/tree/master/iaasserver). En los mismos encontramos los paquete necesarios, _express_ y _colors_, el primero de ellos para poder correr un servidor web y el segundo para colorear la salida por consola. Una vez tengamos los archivos ejecutamos:
- `npm install`

Por defecto, el servidor escucha el puerto 8080 y controla la carpeta gh-pages. Para hacerlo correr, solo tenemos que ejecutar el siguiente comando:
- `node server.js`

### Configurando repo de Github
Una vez tengamos lo anterior configurado, solamente tenemos que hacer un pull de los nuevos cambios que surjan en la rama gh-pages de [nuestro repositorio](https://github.com/ULL-ESIT-SYTW-1617/tareas-iniciales-rafadanipedro). Ejecutamos los siguiente comandos:
- `mkdir gh-pages`
- `cd gh-pages`
- `git init`
- `git remote add -t gh-pages -f origin git@github.com:ULL-ESIT-SYTW-1617/tareas-iniciales-rafadanipedro.git`

Todos los comando anteriores se pueden modificar según el caso, ya que aquí, por ejemplo, solo trabajaremos con la rama gh-pages del repositorio alojado en Github, de manera que solo ejecutemos `git pull` y así no tengamos que descargar archivos innecesarios.

### Despliegue desde remoto
Una vez realizado el deploy del libro, se debe ejecutar el siguiente comando:
- `ssh sytw 'cd /home/usuario/directorio/gh-pages; git pull'`

Debemos de tener en cuenta que esto solo se puede realizar desde un ordenador conectado a la red interna de la ULL, por lo que obviamos el uso de Cloud9 en esta práctica.

#NOTA
Utilizar nodejs en la versión 6.7.0 y Gulp en la versión 4 para evitar posibles fallos de ejecución. Para ello, ejecute estos comandos:

- `nvm install v6.7.0`
- `npm install --global gulp-cli`

## Descripción de la práctica
 * [Gitbook de la práctica](https://crguezl.github.io/ull-esit-1617/practicas/practicaiaas.html)

##Enlace al libro de tareas principales
[Tareas Iniciales](https://github.com/ULL-ESIT-SYTW-1617/tareas-iniciales-rafadanipedro)

##Enlace heroku del libro
[Gitbook en heroku](https://p3-sytw-rafadanipedro.herokuapp.com/)

## Páginas personales

Pinchando sobre las imágenes podrás acceder a nuestras páginas personales.

<a href='https://rafaherrero.github.io' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11819652?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://danielramosacosta.github.io/' target='_blank'><img src='https://avatars2.githubusercontent.com/u/11427028?v=3&s=400' border='0' alt='postimage' width='100px'/></a> <a href='https://alu0100505078.github.io/' target='_blank'><img src='https://avatars3.githubusercontent.com/u/14938442?v=3&s=400' border='0' alt='postimage' width='100px'/></a>
