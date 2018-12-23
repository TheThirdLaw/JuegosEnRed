# **NO-NAME GAME**
 
The Third Law productions

Trello del grupo: https://trello.com/b/gA3ICoHm/juegos-en-red

<br><br>

## **ÍNDICE**
### 1. INFORMACIÓN GENERAL
### 2. HISTORIAL DE VERSIONES
### 3. VISIÓN GENERAL DE JUEGO
### 4. MECÁNICA DEL JUEGO
#### 4.1. Flujo de juego
#### 4.2. Cámara 
#### 4.3. Controles
#### 4.4. Puntuación
### 5. ESTADOS DEL JUEGO
### 6. INTERFACES
### 7. NIVELES
### 8. PERSONAJE
### 9. ÍTEMS
### 10. MIEMBROS DEL EQUIPO
<br><br>
<br><br>

## **VÍDEO DEMO** 

[![Vídeo-image](http://img.youtube.com/vi/pNWUHUNvleM/0.jpg)](http://www.youtube.com/watch?v=pNWUHUNvleM "Demo")

## **INFORMACIÓN GENERAL** 

Título: No-Name Game

Estudio: The Third Law 

Plataforma: PC

Versión: 1.0

Categoría: juego de plataformas, competitivo

Público: todos los públicos


![Start Menu](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/PInicio.PNG)


El juego consiste en un mix entre el pilla-pilla y el escondite para dos jugadores, con una temática geométrica pero abstracta. El objetivo es que el jugador que va en primera posición consiga esconderse para despistar a su rival, y colocarse tras él, donde los papeles se invierten y el perseguidor pasa a ser perseguido. El juego cuenta con un sistema de trampas para distraer al segundo jugador. Cuando acaba la partida, los puntos obtenidos se sumarán al cómputo general de puntuación de cada jugador, con los que irá aumentando de nivel. 

<br>

## **HISTORIAL DE VERSIONES**

Desarrollo del GDD, creación del juego, Fase 1 - INICIO: 19/09/2018; FIN: 26/09/2018

Creación del juego, versión alpha offline, Fase 2 - INICIO: 26/09/2018; FIN: 28/10/2018

Creación del servidor, versión beta online, Fase 3 - INICIO: 28/10/2018; FIN: 02/12/2018

<br>

## **VISIÓN GENERAL DEL JUEGO**

Este proyecto está enfocado hacia un producto sencillo, pero entretenido, en el cual la competitividad entre dos jugadores aleatorios no se basará simplemente en huir, sino que también se necesitará estrategia para esconderse de tal forma que el compañero no consiga percibirle para, por ejemplo, conseguir alcanzarlo en el momento justo en el que lo adelante, y además con la ventaja (o desventaja) de poder utilizar trampas o power-ups.

<br>

## **MECÁNICA DEL JUEGO**
Al inicio del juego, se determina de manera semi-aleatoria, con un matchmaking que tiene en cuenta el número de partidas jugadas y el porcentaje de victorias del jugador, cual será el rival del jugador, y de forma totalmente aleatoria cuál de los dos jugadores iniciará la marcha. 

Al ser un juego de plataformas los controles son sencillos, flechas hacia la derecha e izquierda para avanzar en el escenario, y las de arriba y abajo para conseguir esconderse, como en tercera dimensión, pero de manera plana.

### Flujo de juego:
Tras determinar quién inicia como perseguidor, y quién como perseguido, se inicia el juego. El perseguido tiene X segundos en los que es más rápido que su rival para poner trampas, esconderse, etc. Cuando esos X segundos terminan, el perseguidor puede empezar a usar power-ups y empieza a ser más rápido que el perseguido, por lo que este último debe esconderse o será cazado sin remedio, y el perseguidor ganará. En el momento en el que el perseguidor se pasa de largo, se invierten posiciones (aparece en plantalla un mensaje de "HUYE" o "CAZA"). Si se acaba el escenario, hay un empate y se puede (o no) volver a jugar.

### Cámara: 
Utilizamos una perspectiva 2D lateral, y la cámara avanzará conforme avance el jugador.

### Controles: 
Como ya mencionamos antes, los controles principales se basan en las flechas:<br><br>
-Flecha derecha: avanzar<br><br>
-Flechas arriba y abajo: esconderse<br><br>
-Teclaa "I", "O" y “P”: Trampas y power-ups<br><br>

### Puntuación: 
En el juego existe un sistema de niveles y además uno monetario. Al ganar (o perder) la partida obtienes beneficios que te permiten subir de nivel, conseguir apariencias distintas (siempre buscando que sea más sencillo esconderse, camuflarse) y comprar trampas para despistar y debilitar al rival.

Estas recompensas dependen del nivel del rival (también pueden ser penalizaciones) y de un marcador de la distancia recorrida.

<br>

## **ESTADOS DEL JUEGO**

-Carga: Carga todos los assets.
<br>
![Cargando](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/Loading.png)
<br>
<br>
-Menú principal: con opciones de iniciar partida, acceder a la tienda, a los créditos y a la configuración.
<br>
![Start Menu](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/PInicio.PNG)
<br>
<br>
-Pregame Lobby: Pantalla donde eliges tus power-ups y trampas, y te preparas para el juego.
<br>
![Pregame](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/PElegirCartas.PNG)
<br>
<br>
-Level: El juego en sí.
<br>
![Level](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/PLevel.png)
<br>
<br>
Aparte hay otros estados menores, como la cuenta atrás, configuración, o tienda. Están todas detalladas en este diagrama:
<br>
![Level](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/DiagramaV2.png)

<br>
<br>

## **INTERFACES**

La línea del juego consiste en un estilo sencillo y geométrico-abstracto en tonos oscuros.

Interfaz visualmente sencilla y accesible, porque el videojuego no está enfocado a una sección de usuarios concreta.

<br>

## **NIVELES**

Dentro de lo que es el tiempo de juego, el escenario y la música se mantienen monótonos, conforme avanza el jugador, a una cierta distancia, van cambiando, pero como mera experiencia visual/auditiva, ya que lo realmente importante para la puntuación final se basa en la distancia recorrida y el nivel del rival. El escenario será generado aleatoriamente a partir de fragmentos de escenarios predeterminados.

De manera externa, el nivel individual de cada jugador, y su oro, depende de la puntuación de cada partida. Conforme se avanza de nivel podemos acceder a camuflajes y trampas más avanzados.


![Level Example](https://github.com/TheThirdLaw/JuegosEnRed/blob/master/src/main/resources/static/assets/images/PLevel.png)

<br>

## **PERSONAJE**

Propio de cada jugador, tiene una apariencia inicial básica que cada uno irá personalizando según sus posibilidades y sus preferencias.

<br><br>

## **ÍTEMS**

-Trampas: una especie de señuelos semejantes al personaje para confundir al perseguidor, bajar su puntuación, cegarle, etc. Cada trampa tiene un tiempo de recarga propio.

-Apariencias: intercambiables y accesibles a cambio de monedas, permiten al jugador personalizar su personaje y hacerlo más funcional, sirviéndole de camuflaje.

-Power-ups: Ayudas para el perseguidor que solo podrá usar tras los X segundos donde es más lento que su rival. Sirven como propulsión, saltos, etc.

<br>


## **MIEMBROS DEL EQUIPO**

-Jorge Diego Arteaga: 

Correo corporativo: j.diegoa.2016@alumnos.urjc.es

GitHub: JorgeDiegoA

<br>

-Alberto Hernández González 

Correo corporativo: a.hernandezg.2016@alumnos.urjc.es

GitHub: Alberto-HG

<br>

-Sandra Morcuende Rodríguez

Correo corporativo: s.morcuende.2016@alumnos.urjc.es

GitHub: sanmr

<br>

### THE THIRD LAW productions

GitHub: https://github.com/TheThirdLaw/JuegosEnRed&sa=D&ust=1537784370142000&usg=AFQjCNGokc5cMyLxbI9teY6N8zZDJvBNfQ



