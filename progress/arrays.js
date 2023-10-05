class Vector {
    constructor(capacidadInicial = 64) {
      this.capacidad = capacidadInicial;
      this.tamaño = 0;
      this.datos = new Array(capacidadInicial);
    }
  
    // Devuelve el número de elementos en el vector
    size() {
      return this.tamaño;
    }
  
    // Devuelve la capacidad actual del vector
    capacity() {
      return this.capacidad;
    }
  
    // Verifica si el vector está vacío
    is_empty() {
      return this.tamaño === 0;
    }
  
    // Devuelve el elemento en el índice dado
    at(index) {
      if (index >= 0 && index < this.tamaño) {
        return this.datos[index];
      }
      throw new Error("Índice fuera de rango");
    }
  
    // Agrega un elemento al final del vector
    push(item) {
      if (this.tamaño >= this.capacidad) {
        this._resize(this.capacidad * 2);
      }
      this.datos[this.tamaño] = item;
      this.tamaño++;
    }
  
    // Inserta un elemento en el índice dado
    insert(index, item) {
      if (index < 0 || index > this.tamaño) {
        throw new Error("Índice fuera de rango");
      }
      if (this.tamaño >= this.capacidad) {
        this._resize(this.capacidad * 2);
      }
      for (let i = this.tamaño; i > index; i--) {
        this.datos[i] = this.datos[i - 1];
      }
      this.datos[index] = item;
      this.tamaño++;
    }
  
    // Inserta un elemento en la posición 0
    prepend(item) {
      this.insert(0, item);
    }
  
    // Elimina y devuelve el último elemento
    pop() {
      if (this.tamaño === 0) {
        throw new Error("El vector está vacío");
      }
      const elemento = this.datos[this.tamaño - 1];
      this.tamaño--;
      if (this.tamaño <= this.capacidad / 4 && this.capacidad > 16) {
        this._resize(this.capacidad / 2);
      }
      return elemento;
    }
  
    // Elimina el elemento en el índice dado
    delete(index) {
      if (index < 0 || index >= this.tamaño) {
        throw new Error("Índice fuera de rango");
      }
      for (let i = index; i < this.tamaño - 1; i++) {
        this.datos[i] = this.datos[i + 1];
      }
      this.tamaño--;
      if (this.tamaño <= this.capacidad / 4 && this.capacidad > 16) {
        this._resize(this.capacidad / 2);
      }
    }
  
    // Busca y elimina el primer elemento con el valor dado
    remove(item) {
      for (let i = 0; i < this.tamaño; i++) {
        if (this.datos[i] === item) {
          this.delete(i);
          return;
        }
      }
    }
  
    // Busca el valor y devuelve el primer índice con ese valor, o -1 si no lo encuentra
    find(item) {
      for (let i = 0; i < this.tamaño; i++) {
        if (this.datos[i] === item) {
          return i;
        }
      }
      return -1;
    }
  
    // Función privada para redimensionar el vector
    _resize(nuevaCapacidad) {
      const nuevoArray = new Array(nuevaCapacidad);
      for (let i = 0; i < this.tamaño; i++) {
        nuevoArray[i] = this.datos[i];
      }
      this.datos = nuevoArray;
      this.capacidad = nuevaCapacidad;
    }
  }
  
  // Ejemplo de uso
  const miVector = new Vector(128);
  
  miVector.push(16);
  miVector.push(32);
  miVector.push(64);
  miVector.push(128);
  
  console.log(miVector.size()); // 4
  console.log(miVector.capacity()); // 16
  
  miVector.insert(2, 25);
  console.log(miVector.at(2)); // 25
  
  miVector.pop();
  console.log(miVector.size()); // 4 (no cambió)
  console.log(miVector.capacity()); // 16 (no cambió)
  
  miVector.remove(20);
  console.log(miVector.size()); // 3
  