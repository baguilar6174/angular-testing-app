# Simple Angular Testing App

Esta aplicación contiene una pequeña interfaz que muestra un login y una verificación mediante una operación matemática. El objetivo de esta aplicación es aplicar test unitarios en las operaciones realizadas y lograr el más alto porcentage de coverage en el testing.

## Instalación y ejecución

Esta aplicación ha sido creada con [Angular](https://github.com/angular/angular-cli) versión 13.1.3.

Paso 1:

Descargar o clonar este repositorio

Paso 2:

En la raíz del proyecto ejecute el siguiente comando en la consola para obtener las dependencias necesarias:

```
npm i
```

Paso 3

Antes de ejecutar la aplicación de angular es necesario ejecutar la aplicación de fake server creada con json server con el siguiente comando en la raíz del proyecto:

```
npm run api
```

Paso 4

Cuando el fake server este se este ejecutando correctamente, ejecutar la aplicación de Angular:

```
ng s
```

Paso 5

Para ejecutar los test, usa el siguiente comando

```
ng test
```

Una vez ejecutado el comando anterior, podrás ver el `coverage report`, lo puedes encontrar en la siguiente ruta:

`testing-app/coverage/testing-app/index.html`

## Librerías & Paquetes usados

- `json-server: ^0.17.0`: Permite crear un servidor falso a partir de un fichero `.json` que simula una BD.

## Author

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
- Email - [bryan.aguilar6174@gmail.com](mailto:bryan.aguilar6174@gmail.com)
