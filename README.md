# Guía de Uso del Programa "Node.js Excel"

## Descripción General

*¿Qué hacen estos programas?
Estos programas han sido creados para ayudarte a realizar tareas repetitivas con tus documentos.*

### •	Programa 'index.js'*
### ¿Qué hace 'index.js'?
*Imagina que tus documentos son como carpetas llenas de papeles, y algunos de esos papeles no tienen nombres en la parte superior. 'index.js' es como un asistente que coloca cabeceras en esos papeles para que puedas encontrarlos fácilmente y entender de qué se tratan.*
### ¿Cómo funciona?
*Si tienes muchos documentos sin cabecera (archivos .csv), este programa les coloca cabeceras específicas para que puedas identificarlos rápidamente.*
### •	Programa 'compare.js'
###	¿Qué hace 'compare.js'?
*Este programa es como un detective que compara tus documentos para encontrar similitudes o diferencias entre ellos.*
### ¿Cómo funciona?
Si tienes una gran cantidad de documentos (hojas de un archivo Excel), este programa puede compararlos y decirte si encuentran las mismas cosas en diferentes documentos. 

Antes de Usar los Programas
### ¿Qué necesitas?
Antes de usar estos programas, necesitarás instalar algunas herramientas en tu computadora.
### Herramientas Necesarias
* VScode: Es como una mesa de trabajo especial para escribir instrucciones. 
Link: https://code.visualstudio.com/download

* Node: Es como la electricidad que hace funcionar los programas.  
Link: https://nodejs.org/en/download/current


### Pasos para usar 'index.js':

### Preparar las carpetas:
Antes de usar el programa, necesitas crear dos carpetas especiales en la misma ubicación que el programa.

La carpeta(files) es donde estarán los documentos originales, y la otra carpeta(filesWithHeader) es donde se guardarán los documentos con las cabeceras agregadas.

Los nombres de las carpetas pueden ser modificados a elección del usuario para reflejar una denominación más adecuada, pero es importante actualizar los nombres correspondientes en el código para asegurar su correcto funcionamiento.

 <img width="590" alt="imagen1" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/1234f78b-a6aa-4f74-b43d-7e29f3f3a9fe">

En esta parte de código es donde se modificaría el nombre de las carpetas según fueron creadas.

Ejemplo: Si en vez de crear la carpeta(files) y la carpeta(filesWithHeader) creas la carpeta(documentos) y la carpeta(documentosnuevos) se tendría que cambiar el nombre en el codigo: 

<img width="575" alt="imagen2" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/283f3bf8-abe4-4b11-85c7-9fbbf8ca6cdd">
 
En esta parte del código se tendría que cambiar el nombre por la carpeta creada
 
 <img width="446" alt="imagen3" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/1c11939c-3511-40ac-b6e5-c434fe414971">

De igual manera para la carpeta destino seria la misma dinámica:
 
 <img width="444" alt="imagen4" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/f4b1eca3-64c5-4114-936a-4cc2d41cc831">

### Elegir los nombres especiales:

Si quieres cambiar el encabezado del archivo, hay un lugar dentro del programa donde se pueden modificar fácilmente.

Esta lista se encuentra identificada como "columns". Al ajustar esta lista de encabezados según sus requisitos:
 
 <img width="249" alt="imagen5" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/fad915a7-d4c4-4af4-92fa-30d3f9700fac">
 
### Ejecutar el programa:
Al ejecutar el programa, añade estas etiquetas a los documentos en la carpeta original, ¡haciéndolos más fáciles de entender y organizar!




### Pasos para usar 'compare.js':
### Preparar las carpetas:
Al igual que con el otro programa, debes crear dos carpetas especiales.

La carpeta(compareFiles) tiene documentos que quieres comparar, y la carpeta(compareFilesApprove) es donde se guardarán los resultados de la comparación. 

<img width="578" alt="imagen6" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/f4a6a489-b51d-4f70-bf63-cc640b129096">

He de recordar que en la carpeta(compareFiles) tiene que estar el archivo con el cual se trabajara.

### Elegir los documentos a comparar:

Dentro del programa, puedes decirle qué hojas del archivo quieres comparar.
Por ejemplo, podrías pedirle que compare las hojas llamadas 'Aprobados SC1' y 'Aprobados SC2' para ver qué información tienen en común.
 
 <img width="421" alt="imagen7" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/016fd675-211b-4d84-bb96-cc6779b73350">

 
En caso tenga otro nombre las hojas que deseas compara tendrías que cambiar el nombre en la siguiente línea de código, de igual manera habrá una lista donde le puedes cambiar el nombre y también le puedes agregar mas hojas que deseas comparar.

<img width="192" alt="imagen8" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/64b8b0ca-590a-43d0-abb2-2baf7df663ab">
 
Seguidamente, luego de combinar y comparar información de las hojas mencionadas ('Aprobados SC1' y 'Aprobados SC2'), se comparará esa información con la hoja llamada 'Reqs', la cual contiene datos generales. Este proceso final de comparación busca crear un archivo que muestre las similitudes entre las hojas 'Aprobados SC1' y 'Aprobados SC2', y verifica si esos datos coinciden con la información presente en la hoja 'Reqs'.

Si deseas cambiar las hojas que contienen los datos generales, simplemente tendrás que editar la siguiente línea de código: 

<img width="377" alt="imagen9" src="https://github.com/djpieroac/nodejs-excel/assets/151592385/675ab543-bcf4-4814-a044-f48d022c852e">

En este punto, es donde se especifica el nombre de la hoja con la cual se realizará la última comparación. Asegúrate de escribir exactamente el nombre de la hoja tal como aparece en el archivo Excel.

### Ejecutar el programa:
Cuando ejecutas este programa, revisa los documentos que seleccionaste, encuentra similitudes y diferencias, y guarda los resultados en una nueva carpeta.
