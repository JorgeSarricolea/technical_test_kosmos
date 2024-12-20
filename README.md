# Motor de Decisión de Crédito

Este proyecto implementa un **motor de decisión de crédito** en JavaScript. El objetivo es calcular el monto mínimo, el monto máximo y una recomendación óptima de la línea de crédito para un cliente, basado en su tipo de nómina, género y fecha de ingreso a su primer empleo.

## **Contexto de la prueba**

El motor de decisión se desarrolla para una empresa financiera que desea identificar los créditos adecuados para sus clientes. La solución debe cumplir con las siguientes especificaciones:

1. **Cálculo de montos**:

   - Monto mínimo y máximo de crédito basado en tablas predefinidas según:
     - Tipo de nómina (A, B, C, D).
     - Género (masculino o femenino).
     - Meses desde el primer empleo.

2. **Cálculo de la línea de crédito óptima**:
   Se calculan dos valores \( p1 \) y \( p2 \):

   - \( p1 = montoMinimo + \sqrt{montoMaximo - montoMinimo} \)
   - \( p2 = montoMinimo + 0.0175 \times (montoMaximo - montoMinimo} \)
     La recomendación óptima es el máximo entre \( p1 \) y \( p2 \).

3. **Datos de entrada**:

   - `tipoNomina` (string): Representa el tipo de nómina del cliente (A, B, C, D).
   - `fechaPrimerEmpleo` (string): Fecha del primer empleo en formato ISO (`YYYY-MM-DD`).
   - `genero` (string): Género del cliente ('m' para masculino, 'f' para femenino).

4. **Datos de salida**:
   Un objeto con los valores calculados:

   - `montoMinimo`
   - `montoMaximo`
   - `recomendacionLinea`

5. **Ejemplos predefinidos**:
   Los cálculos se prueban con un conjunto de datos que se encuentran en el archivo `data/ejemplo.json`.

---

## **Cómo ejecutar el proyecto**

### **1. Requisitos previos**
- Node.js instalado en tu sistema.
- Una terminal para ejecutar comandos.

### **2. Clonar el proyecto**
Clona este repositorio en tu máquina local:
```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto
````

### **3. Ejecución**

Ejecuta el programa con:

```bash
node motor.js
```

### **4. Resultados**

Al ejecutar el programa:

- Los resultados se imprimen como un **array JSON** en la consola.
- Los resultados también se guardan en un archivo `resultados.txt` en formato de tabla:

```plaintext
Tipo Nómina | Fecha Primer Empleo | Género | Mínimo | Máximo | Línea Óptima
--------------------------------------------------------------------------
A           | 2022-06-12          | f      | 200    | 4500   | 275.25
B           | 1993-12-30          | f      | 700    | 4400   | 764.75
C           | 2020-09-19          | m      | 600    | 4600   | 670.00
D           | 2019-01-15          | m      | 1000   | 4300   | 1057.75
```

---

## **Personalización**

### **Modificar los datos de entrada**

Para probar con otros ejemplos, edita el archivo `data/ejemplo.json`. Asegúrate de respetar el formato:

```json
[
  { "tipoNomina": "A", "fechaPrimerEmpleo": "YYYY-MM-DD", "genero": "f" },
  { "tipoNomina": "B", "fechaPrimerEmpleo": "YYYY-MM-DD", "genero": "m" }
]
```

---

## **Notas finales**

- Este proyecto está diseñado para ser modular y escalable.
- Las tablas de montos mínimos y máximos se encuentran en archivos JSON separados (`creditoMasculino.json` y `creditoFemenino.json`) para facilitar su mantenimiento.
