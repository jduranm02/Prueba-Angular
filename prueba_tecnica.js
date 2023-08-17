const matrix={
    obtenerDiagonalDerecha:(m)=>{
        let s,x,y,d,o = [];
        for(s=0;s<m.length;s++){
            d=[];
            for(y=s,x=0;y>=0;y--,x++)
                d.push(m[y][x]);
            o.push(d);
        }
        for(s=1;s<m[0].length;s++){
            d=[];
            for(y=m.length-1,x=s;x<m[0].length;y--,x++)
                d.push(m[y][x]);
            o.push(d);
        }
        return o.map((array)=>{
            return array.join('');
        });
    },

    obtenerDiagonalIzquierda: (m) => {
        let inversa= matrix.invertirMatriz(m);
        return matrix.obtenerDiagonalDerecha(inversa);
    },

    invertirCadena:(cadena)=>{
        return cadena.split("").reverse().join("");
    },
    
    invertirMatriz: (m)=>{
        return mp.map((cadena)=>{
            return matrix.invertirCadena(cadena);
        });
    },
};

class ComprobarMutante{
    constructor(transformer){
        this.transformer=transformer;
        this.encontrarBloquesMutantes=function(matriz){
            let regex=/([ATGC])\1{3,4}/;

            let horizontales=matriz.filter((cadena)=>{
                return regex.test(cadena);
            });

            let diagonalesDerechas=this.transformer.obtenerDiagonalDerecha(matriz).filter((cadena)=>{
                return regex.test(cadena);
            });

            let diagonalesIzquierdas=this.transformer.obtenerDiagonalIzquierda(matriz).filter((cadena)=>{
                return regex.test(cadena);
            });

            return horizontales.concat(diagonalesDerechas).concat(diagonalesIzquierdas);
        };

        this.esMutante=function(matriz){
            let bloquesMutantes = this.encontrarBloquesMutantes(matriz);
            return bloquesMutantes.length>1;
        }

        this.mostrarBloquesMutantes = function(matriz){
            let bloquesMutantes = this.encontrarBloquesMutantes(matriz);
            if(bloquesMutantes.length>1){
                return bloquesMutantes;
            }else{
                return [];
            }
        };
    }
}


//Pruebas

const dna1= ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];

const comprobadordorMutante= new ComprobarMutante(matrix);

console.log(comprobadordorMutante.esMutante(dna1));
console.log(comprobadordorMutante.mostrarBloquesMutantes(dna1));