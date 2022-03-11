# 🟦 TYPESCRIPT

## ⚙️ Configurar TypeScript

Para empezar con la configuración de typescript, tenemos que ejecutar el siguiente comando:
```
tsc --init
```
Esto nos creará el archivo tsconfig.json.

Una configuración inicial recomendada en el archivo tsconfig.json es la siguiente:
```
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "./dist", 
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    }
}
```
Una vez configurado el archivo de tsconfig.json, para crear la carpeta donde se irá añadiendo el js compilado que configuramos en outDir (En este caso se llamará dist), tenemos que escriobir el siguiente comando:
```
tsc
```
Para configurar reglas adicionales tenemos que configurar el tslint, para ello lo instalamos en modo de desarrollo de la siguiente manera:
```
npm i tslint -D
```
Para configurar el archivo tslint.json, tenemos que hacer referencia a la ubicación, para ello escribimos en consola:
```
.node/modules/.bin/tslint --init
```
La única regla que en un primer momento vamos a añadir es para que no de errores al usar la consola, para ello el archivo se tendría que ver así:
```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "no-console": false
    },
    "rulesDirectory": []
}
```
Para ver si la app funciona, usamos el comando (Esto compilará el código):
```
tsc
```
Para que el código se compile automáticamente con cada cambio que hagamos, usaremos el código:
```
tsc --watch
```

## 🤔 Tipos de Datos

Los tipos de datos existentes en Typescript son:

- Boolean: Retorna true o false.
- String
- Array
- Tuple
- Enum
- Any: Visto en el ejemplo arriba.
- Void: No retorna nada.
- Null and Undefined
- Never: Retorna una excepción o un error.
- Object

Tambien se pueden crear nuevos tipos de datos utilizando la palabra reservada type:
```
type cedula = string;
let numeroCedula: cedula = '23039203293';
```

## 📱 Interface

Una interface es un tipo abstracto, es como un contrato que permite determinar la estructura que debería tener un objeto.

Para el siguiente ejemplo crearemos una interface llamada Vehículo que tendrá un tipo custom denominado marca el cual es de tipo string, y algunos atributos propios de la interface Vehículo como lo son Marca, Modelo, Año, Color, y Tipo. Con esta definición Typescript cuando defina un objeto de este "tipo" vehiculo, al no contar con alguno de los atributos de esta interface generará un error que puede ser corregido antes de correr la aplicación, esto gracias a la magia de Typescript.

```
type Marca = string;

interface Vehiculo {
  marca: Marca;
  modelo: string;
  anio: number;
  color: string;
  tipo: string;
}

//!Error al definir me falto el campo color
const TC1V4 : Vehiculo = {
  marca: 'Hyundai',
  modelo: 'Tucson',
  anio: 2016,
  tipo: 'Jeep'
}
```

Algunas de las cosas que debemos tener en consideración son el tipo y el número de atributos; pero hay una flexibilidad la cual permite que si un atributo en una interface tiene el signo ?: se considera un atributo opcional, por lo que Typescript no generaría un error.

```
interface Vehiculo {
  marca: Marca;
  modelo: string;
  anio: number;
  color?: string;
  tipo: string;
}
```

Para el ejemplo he puesto el atributo color con un interrogante, por lo que ahora Typescript considera este campo como "opcional" y no genera un error.

## 🫂 Union Types

Con Typescript es posible definir un tipo que pueda ser de dos tipos; ejemplo un tipo FactorParametro puede ser de tipo string o number; es decir puedo enviar '1' o enviar 1 como argumento y al interior de la función operar esto.

```
//Definimos dos tipos que pueden ser string o numero.
type FactorParametro = string | number;
type Resultado = string | number;

function Multiplicacion( numero1: FactorParametro, numero2: FactorParametro): Resultado{
  return numero1 * numero2; //Error, asi estaría devolviendo Any puesto que no esta definido el tipo en este return.
}
```

## 👨🏻‍🏫 Cast en Typescript

Para el ejemplo sera necesario "Castear" o forzar el tipo de dato de los argumentos para que puedan ser sumados como números, por lo que haremos el siguiente cambio:

```
return Number(numero1) * Number(numero2);
```
Con esto ya no nos da error y lo que retorna seria un Number.

## 🎊 Union Types con Interfaces

Esto que vimos con diferentes tipos de datos para un tipo de dato custom tambien lo podemos efectuar con diferentes interfaces, veamos un ejemplo con dos interfaces donde creamos un objeto abstracto con uno de ellos.

```
//Definimos dos interfaces, y creamos un tipo que puede ser una o la otra.
interface InterfaceUno {
  Propiedad1: string;
}

interface InterfaceDos {
  Propiedad2: number;
}

type CualquieraDeLasDos = InterfaceUno | InterfaceDos;

const LaInterface : CualquieraDeLasDos = {
  Propiedad1: 'HEYY'
}
```

Ante esto no tengo ningún problema, y Typescript valida que cree el objeto con la InterfazUno. La creación de un objeto con la InterfazDos seria de la siguiente manera:

```
const LaInterface : CualquieraDeLasDos = {
  Propiedad2: 3
}
```

No puedo crear con la Propiedad2 un string debido a que la interface lo ha identificado como number en su creación.

## 🚥 Intersection Types

Es un concepto similar al anterior pero en este caso no es "uno o el otro", sino que deben ser los dos. En caso contrario obtendremos un error, siguiendo el mismo caso anterior, lo unico que debemos cambiar seria:

```
type DebenSerLasDos = InterfaceUno & InterfaceDos;
```

Cambiamos el simbolo | (pipe or) por el simbolo & (ampersan, and); al hacer esto debo incluir todas las propiedades de las dos interfaces:

```
const InterObjeto : DebenSerLasDos = {
  Propiedad2: 3,
  Propiedad1: 'A'
}

const ErrorIntersInterface : DebenSerLasDos = {
  Propiedad1: 'A'
}
//!Type '{ Propiedad1: string; }' is not assignable to type 'DebenSerLasDos'.
//!Property 'Propiedad2' is missing in type '{ Propiedad1: string; }' but required in type 'InterfaceDos'.ts(2322)
```

Tambien, si se tiene el mismo nombre de propiedad entre dos interfaces; con solo definirla una vez ya no obtenemos un error:

```
//Definimos dos interfaces, y creamos un tipo que puede ser una o la otra.
interface InterfaceInt1 {
  Propiedad1: string;
}

interface InterfaceInt2 {
  Propiedad1: string;
}

type DebenSerLasDos = InterfaceInt1 & InterfaceInt2;

const InterObjeto : DebenSerLasDos = {
  Propiedad1: '3',
}
```